import { handleAiChatPost, json } from "@/lib/ai/chat-handler";

export function GET() {
  return json(
    { status: "invalid", message: "Методът не е позволен." },
    405,
    { Allow: "POST" },
  );
}

export async function POST(request: Request) {
  return handleAiChatPost(request);
}
