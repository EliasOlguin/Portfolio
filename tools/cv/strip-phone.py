"""Copy a CV .docx without its phone number: python -I strip-phone.py <in.docx> <out.docx>

Removes the run holding an international phone number (+ and digits) and the "|" separator
run after it. Fails if any phone-like text is left. The input file is never modified.
"""
import re
import sys
import zipfile

PHONE = re.compile(r"\+\d[\d\s()-]{7,}")
RUN = r"<w:r>(?:(?!<w:r>).)*?"
PHONE_RUN = re.compile(RUN + r"\+\d[\d\s()-]{7,}</w:t></w:r>(?:" + RUN + r"\s+\|\s+</w:t></w:r>)?", re.S)

src, dst = sys.argv[1], sys.argv[2]
with zipfile.ZipFile(src) as zin, zipfile.ZipFile(dst, "w", zipfile.ZIP_DEFLATED) as zout:
    for item in zin.infolist():
        data = zin.read(item.filename)
        if item.filename == "word/document.xml":
            xml = PHONE_RUN.sub("", data.decode("utf-8"))
            if PHONE.search(re.sub(r"<[^>]+>", "", xml)):
                sys.exit("phone number still present")
            data = xml.encode("utf-8")
        zout.writestr(item, data)
print("ok")
