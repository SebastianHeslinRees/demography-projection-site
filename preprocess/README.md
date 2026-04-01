# Preprocessing

Converts `.docx` report files into Markdown for use in the State of London web application.

## Prerequisites

- [Pandoc](https://pandoc.org/installing.html) must be installed (v2.11.2 or later)

## Folder structure

```
preprocess/
├── input-files/       # Place .docx files here (subdirectories supported)
├── attachments/       # Extracted images and media (auto-generated)
├── convert-docx.sh    # Conversion script
└── README.md
```

## Usage

```bash
chmod +x convert-docx.sh
./convert-docx.sh
```

The script will:

1. Find all `.docx` files recursively under `input-files/`
2. Convert each to GitHub Flavoured Markdown using pandoc
3. Extract embedded images into `attachments/<sanitised-name>/`
4. Output `.md` files alongside the original `.docx` files

Filenames are sanitised to lowercase with hyphens replacing spaces and special characters.

## Output format

The conversion supports *some* GFM (GitHub Flavoured Markdown) features, including pipe tables, and footnotes (but currently not strikethrough or task lists).
Complex tables with merged cells fall back to HTML `<table>` elements. This matches the `remark-gfm` plugin used in the web application's Markdown pipeline.
