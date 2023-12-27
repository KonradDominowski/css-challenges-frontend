const horizontalRow = "<span><br><br><hr><br></span>";

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
