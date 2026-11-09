import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_app/main.dart';

void main() {
  testWidgets('TalentFlowApp smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const TalentFlowApp());

    // Verify that the login screen appears.
    expect(find.text('Acesse sua Conta'), findsOneWidget);
    expect(find.text('TalentFlow'), findsOneWidget);

    // Tap on guest demo button to enter the main app
    final guestButton = find.text('Explorar Vagas sem Cadastro (Modo Demo)');
    expect(guestButton, findsOneWidget);
    await tester.ensureVisible(guestButton);
    await tester.tap(guestButton);
    await tester.pumpAndSettle();

    // Verify that the Radar de Oportunidades appears.
    expect(find.text('Radar de Oportunidades'), findsOneWidget);
  });
}
