export function decodeCodeBlocks(text: string): string {
  return text
    .replaceAll('<span class="code">', "{{")
    .replaceAll("</span>", "}}")
    .replaceAll("<br><br><hr><br>", "{---}");
}

export function encodeWithCodeblocks(text: string): string {
  return text
    .replaceAll("{{", '<span class="code">')
    .replaceAll("}}", "</span>")
    .replaceAll("{---}", "<br><br><hr><br>");
}

export function getBodyFromHTML(html: string): string {
  let bodyStart: number = html.search("<body>") + 6;
  let bodyEnd: number = html.search("</body>");

  return html.slice(bodyStart, bodyEnd);
}

export function getStyleFromHTML(html: string): string {
  let styleStart: number = html.search("<style>") + 7;
  let styleEnd: number = html.search("</style>");

  return html
    .slice(styleStart, styleEnd)
    .replaceAll("              body {                background-color: white              }", "");
}

// function keyboardShortcuts(e: React.KeyboardEvent<HTMLTextAreaElement>) {
//   const text: string = e.target.value;
//   let selection = window.getSelection();
//   if (e.ctrlKey && e.key === "[") {
//     e.preventDefault();
//     console.log("{{" + selection + "}}");
//     selection?.deleteFromDocument();
//   }
// }
