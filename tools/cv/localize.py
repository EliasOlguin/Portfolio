"""Write a localized copy of the CV: python -I localize.py <in.docx> <texts.json> <out.docx>

texts.json maps a paragraph index (as in word/document.xml) to the new text of each of its runs,
so bold and colour stay exactly where they were. Paragraphs not listed keep their text.
A newline inside a text becomes a line break within that run.
Fails if a listed paragraph's run count does not match, so a changed source CV is noticed.
"""
import json
import re
import sys
import zipfile
from xml.sax.saxutils import escape

PARAGRAPH = re.compile(r"<w:p[ >].*?</w:p>", re.S)
RUN_TEXT = re.compile(r"(<w:t(?: [^>]*)?>)(.*?)(</w:t>)", re.S)


def run_text(text: str) -> str:
    # Close the text element, break the line, and reopen it inside the same run (same formatting).
    return '</w:t><w:br/><w:t xml:space="preserve">'.join(escape(line) for line in text.split("\n"))


def localize(xml: str, texts: dict[str, list[str]]) -> str:
    paragraphs = PARAGRAPH.findall(xml)
    out, pos = [], 0
    for index, para in enumerate(paragraphs):
        start = xml.index(para, pos)
        out.append(xml[pos:start])
        pos = start + len(para)
        new = texts.get(str(index))
        if new is not None:
            runs = RUN_TEXT.findall(para)
            if len(runs) != len(new):
                sys.exit(f"paragraph {index}: {len(runs)} runs in the CV, {len(new)} in the texts")
            it = iter(new)
            para = RUN_TEXT.sub(lambda m: m.group(1) + run_text(next(it)) + m.group(3), para)
        out.append(para)
    out.append(xml[pos:])
    return "".join(out)


def main() -> None:
    src, texts_path, dst = sys.argv[1:4]
    with open(texts_path, encoding="utf-8") as f:
        texts = json.load(f)
    with zipfile.ZipFile(src) as zin, zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "word/document.xml":
                data = localize(data.decode("utf-8"), texts).encode("utf-8")
            zout.writestr(item, data)
    print("ok")


if __name__ == "__main__":
    main()
