import { type ReactNode } from "react";

type Token = { type: "text"; value: string } | { type: "bold"; value: string };

export function AiMessageContent({ text }: { text: string }) {
  const blocks = text.trim().split(/\n{2,}/);

  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground">
      {blocks.map((block, index) => {
        const lines = block.split("\n");
        const isList = lines.every((line) => /^[-*]\s+/.test(line.trim()) || line.trim() === "");
        const items = lines.filter((line) => line.trim());

        if (isList && items.length > 0) {
          return (
            <ul key={index} className="list-disc space-y-1 pl-5">
              {items.map((line, itemIndex) => (
                <li key={itemIndex}>{renderInline(line.replace(/^[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{renderInline(block.replaceAll("\n", " "))}</p>;
      })}
    </div>
  );
}

function renderInline(value: string): ReactNode {
  const tokens = tokenize(value);

  return tokens.map((token, index) => {
    if (token.type === "bold") {
      return (
        <strong key={index} className="font-medium text-ink">
          {token.value}
        </strong>
      );
    }

    return token.value;
  });
}

function tokenize(value: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match = pattern.exec(value);

  while (match) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: value.slice(lastIndex, match.index) });
    }

    tokens.push({ type: "bold", value: match[1] ?? "" });
    lastIndex = match.index + match[0].length;
    match = pattern.exec(value);
  }

  if (lastIndex < value.length) {
    tokens.push({ type: "text", value: value.slice(lastIndex) });
  }

  return tokens;
}
