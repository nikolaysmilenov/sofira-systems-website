import assert from "node:assert/strict";
import { test } from "node:test";
import { isIncompleteReply, sanitizeConsultantReply } from "@/lib/ai/reply";

test("incomplete replies are detected without flagging complete Bulgarian answers", () => {
  assert.equal(isIncompleteReply("Възможен подход"), true);
  assert.equal(isIncompleteReply("и присъствия:** заявления", "MAX_TOKENS"), true);
  assert.equal(isIncompleteReply("В какъв формат получавате"), true);
  assert.equal(
    isIncompleteReply(
      "HR HUB 360 е собствен продукт на SOFIRA SYSTEMS за управление на човешки ресурси.",
    ),
    false,
  );
  assert.equal(
    isIncompleteReply("Кой HR процес ви създава най-много затруднения в момента?"),
    false,
  );
});

test("unsafe model links are stripped and mapped to controlled CTAs", () => {
  const vscode = sanitizeConsultantReply(
    "Пишете ни тук: vscode-file://vscode-app/kontakt и [Заявете проект](/kontakt)",
  );
  assert.equal(vscode.cta, "contact");
  assert.doesNotMatch(vscode.reply, /vscode-file|localhost|https?:\/\//i);
  assert.doesNotMatch(vscode.reply, /\[Заявете проект\]/);

  const token = sanitizeConsultantReply("Готови сме да продължим.\nCTA_HR_HUB");
  assert.equal(token.cta, "hr-hub");
  assert.doesNotMatch(token.reply, /CTA_HR_HUB/);

  const blocked = sanitizeConsultantReply("Вижте https://evil.example/phish и file://secret");
  assert.equal(blocked.cta, undefined);
  assert.doesNotMatch(blocked.reply, /evil\.example|file:\/\//i);
});
