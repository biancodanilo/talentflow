class ChatMessage {
  final String text;
  final bool isUser;
  final String time;
  final List<String>? quickReplies;

  const ChatMessage({
    required this.text,
    required this.isUser,
    required this.time,
    this.quickReplies,
  });
}
