type Part = { text: string; type: "normal" | "bracket" | "curly" };

const parseTitle = (title: string): Part[] => {
  const parts: Part[] = [];
  let buffer = "";
  let mode: "normal" | "bracket" | "curly" = "normal";

  for (let i = 0; i < title.length; i++) {
    const char = title[i];

    if (char === "{" && mode !== "curly") {
      if (buffer) parts.push({ text: buffer, type: mode });
      buffer = "";
      mode = "curly";
      continue;
    }
    if (char === "}" && mode === "curly") {
      if (buffer) parts.push({ text: buffer, type: "curly" });
      buffer = "";
      mode = "normal";
      continue;
    }
    if (char === "[" && mode !== "curly") {
      if (buffer) parts.push({ text: buffer, type: mode });
      buffer = "";
      mode = "bracket";
      continue;
    }
    if (char === "]" && mode === "bracket") {
      if (buffer) parts.push({ text: buffer, type: "bracket" });
      buffer = "";
      mode = "normal";
      continue;
    }

    buffer += char;
  }

  if (buffer) parts.push({ text: buffer, type: mode });
  return parts;
};

export default parseTitle;

// {
//   parseTitle(item.title).map((part, idx) => {
//     if (part.type === "curly")
//       return (
//         <div
//           key={idx}
//           className="rounded-2xl bg-surface-blue-dimmed border border-border-blue-dimmed01"
//         >
//           {part.text}
//         </div>
//       );
//     if (part.type === "bracket")
//       return (
//         <span key={idx} className="bg-blue-200 px-1">
//           {part.text}
//         </span>
//       );
//     return <span key={idx}>{part.text}</span>;
//   });
// }
