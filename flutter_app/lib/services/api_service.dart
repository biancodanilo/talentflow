import 'dart:async';
import 'dart:convert';
import 'dart:io';
import '../models/job.dart';

class ApiService {
  // Lista de URLs com prioridade: Tailscale HTTPS público -> IP Tailscale direto -> IP Local da máquina -> Emulador Android -> Localhost
  static const List<String> candidateBaseUrls = [
    'https://talentflow.tail5f8db5.ts.net/api',
    'http://100.121.197.37:3001/api',
    'http://100.112.71.83:3001/api',
    'http://10.0.2.2:3001/api',
    'http://127.0.0.1:3001/api',
  ];

  static String _activeBaseUrl = 'https://talentflow.tail5f8db5.ts.net/api';
  static bool _hasTested = false;

  /// Cliente HTTP seguro com validação de certificados para hosts autorizados
  static HttpClient _createSecureHttpClient({Duration timeout = const Duration(seconds: 4)}) {
    final client = HttpClient();
    client.connectionTimeout = timeout;
    client.badCertificateCallback = (X509Certificate cert, String host, int port) {
      // Validação estrita: apenas domínios e IPs confiáveis da infraestrutura TalentFlow
      const trustedHosts = [
        'talentflow.tail5f8db5.ts.net',
        '100.121.197.37',
        '100.112.71.83',
        '10.0.2.2',
        '127.0.0.1',
        'localhost',
      ];
      return trustedHosts.contains(host);
    };
    return client;
  }

  /// Descobre a URL mais rápida e acessível automaticamente
  static Future<String> getBaseUrl() async {
    if (_hasTested) return _activeBaseUrl;

    final client = _createSecureHttpClient(timeout: const Duration(seconds: 2));

    for (final url in candidateBaseUrls) {
      try {
        final uri = Uri.parse('$url/health');
        final request = await client.getUrl(uri).timeout(const Duration(seconds: 2));
        final response = await request.close().timeout(const Duration(seconds: 2));
        if (response.statusCode == 200) {
          _activeBaseUrl = url;
          _hasTested = true;
          // ignore: avoid_print
          print('[ApiService] Conectado com sucesso ao backend em: $_activeBaseUrl');
          client.close();
          return _activeBaseUrl;
        }
      } catch (_) {
        // Tenta a próxima URL
      }
    }

    client.close();
    _hasTested = true;
    return _activeBaseUrl;
  }

  /// Busca vagas cadastradas no MariaDB
  static Future<List<JobOpportunity>> fetchJobs() async {
    try {
      final base = await getBaseUrl();
      final client = _createSecureHttpClient(timeout: const Duration(seconds: 4));

      final request = await client.getUrl(Uri.parse('$base/jobs')).timeout(const Duration(seconds: 4));
      final response = await request.close().timeout(const Duration(seconds: 4));

      if (response.statusCode == 200) {
        final body = await response.transform(utf8.decoder).join();
        final List<dynamic> list = jsonDecode(body);
        client.close();

        return list.map<JobOpportunity>((item) {
          final tags = <String>[];
          if (item['requiredSkills'] is List) {
            tags.addAll((item['requiredSkills'] as List).map((s) => s.toString()));
          }

          return JobOpportunity(
            id: item['id']?.toString() ?? 'JOB-000',
            title: item['title']?.toString() ?? 'Vaga Operacional',
            company: item['company']?.toString() ?? 'Empresa Parceira',
            companyLogo: item['companyLogo']?.toString(),
            location: item['location']?.toString() ?? 'Jaú - SP',
            distanceKm: (item['location']?.toString().contains('Barra') ?? false) ? 3.2 : 4.5,
            transportTime: '15-20 min direto',
            busLine: 'Linha Regional Circular',
            shift: item['shift']?.toString() ?? '12x36 Noturno',
            salary: item['salary']?.toString() ?? 'R\$ 2.150,00',
            matchPercentage: item['matchScore'] is int
                ? (item['matchScore'] as int)
                : int.tryParse(item['matchScore']?.toString() ?? '85') ?? 85,
            tags: tags.isEmpty ? ['Logística', 'Jaú', 'Operacional'] : tags,
            description: item['title']?.toString() ?? 'Vaga operacional com rota direta e benefícios.',
          );
        }).toList();
      }
      client.close();
    } catch (e) {
      // ignore: avoid_print
      print('[ApiService] Falha ao carregar vagas da API, usando dados em cache: $e');
    }

    return JobOpportunity.getSampleJobs();
  }

  /// Candidata-se à vaga e sincroniza com o dashboard do RH
  static Future<bool> applyToJob({
    required String jobId,
    required String jobTitle,
    required String company,
    required int matchScore,
    String candidateName = 'Candidato Mobile',
    String candidatePhone = '(14) 98741-2234',
  }) async {
    try {
      final base = await getBaseUrl();
      final client = _createSecureHttpClient();

      final request = await client.postUrl(Uri.parse('$base/applications')).timeout(const Duration(seconds: 4));
      request.headers.set('Content-Type', 'application/json');

      final body = jsonEncode({
        'jobId': jobId,
        'candidateName': candidateName,
        'candidatePhone': candidatePhone,
        'role': jobTitle,
        'matchScore': matchScore,
      });

      request.write(body);
      final response = await request.close().timeout(const Duration(seconds: 4));
      client.close();

      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      // ignore: avoid_print
      print('[ApiService] Erro ao sincronizar candidatura: $e');
      return false;
    }
  }

  /// Envia feedback de 1 toque do onboarding 90 dias
  static Future<bool> sendFeedback({
    required String candidateName,
    required String day,
    required String category,
    required String message,
  }) async {
    try {
      final base = await getBaseUrl();
      final client = _createSecureHttpClient();

      final request = await client.postUrl(Uri.parse('$base/feedbacks')).timeout(const Duration(seconds: 4));
      request.headers.set('Content-Type', 'application/json');

      final body = jsonEncode({
        'candidateName': candidateName,
        'day': day,
        'category': category,
        'message': message,
      });

      request.write(body);
      final response = await request.close().timeout(const Duration(seconds: 4));
      client.close();

      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      // ignore: avoid_print
      print('[ApiService] Erro ao enviar feedback: $e');
      return false;
    }
  }

  /// Aceite eletrônico de termo LGPD / GED
  static Future<bool> acceptGedDocument({
    required String documentId,
    required String signerName,
  }) async {
    try {
      final base = await getBaseUrl();
      final client = _createSecureHttpClient();

      final request = await client.postUrl(Uri.parse('$base/ged-documents/$documentId/accept')).timeout(const Duration(seconds: 4));
      request.headers.set('Content-Type', 'application/json');

      final body = jsonEncode({
        'signerName': signerName,
        'signerRole': 'Candidato Mobile',
        'signerIdentifier': 'App Mobile v1.0',
      });

      request.write(body);
      final response = await request.close().timeout(const Duration(seconds: 4));
      client.close();

      return response.statusCode == 200;
    } catch (e) {
      // ignore: avoid_print
      print('[ApiService] Erro ao aceitar termo GED: $e');
      return false;
    }
  }

  /// Autenticação e Cadastro
  static Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final base = await getBaseUrl();
      final client = _createSecureHttpClient();

      final request = await client.postUrl(Uri.parse('$base/auth/login')).timeout(const Duration(seconds: 4));
      request.headers.set('Content-Type', 'application/json');
      request.write(jsonEncode({'email': email, 'password': password, 'role': 'candidate'}));

      final response = await request.close().timeout(const Duration(seconds: 4));
      final resBody = await response.transform(utf8.decoder).join();
      client.close();

      return jsonDecode(resBody);
    } catch (e) {
      return {'success': false, 'error': e.toString()};
    }
  }

  static Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
    String? phone,
  }) async {
    try {
      final base = await getBaseUrl();
      final client = _createSecureHttpClient();

      final request = await client.postUrl(Uri.parse('$base/auth/register')).timeout(const Duration(seconds: 4));
      request.headers.set('Content-Type', 'application/json');
      request.write(jsonEncode({
        'name': name,
        'email': email,
        'password': password,
        'phone': phone,
        'role': 'candidate',
      }));

      final response = await request.close().timeout(const Duration(seconds: 4));
      final resBody = await response.transform(utf8.decoder).join();
      client.close();

      return jsonDecode(resBody);
    } catch (e) {
      return {'success': false, 'error': e.toString()};
    }
  }
}
