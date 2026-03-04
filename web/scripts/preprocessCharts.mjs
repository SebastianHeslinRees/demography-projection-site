#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync, existsSync, globSync } from 'fs';
import path from 'node:path';

// import { glob } from 'node:glob';

const componentBase = "$lib/components/charts";
const inDirPath = './src/content-raw';
const outDirPath = "./src/content";


const formatBlock = (metadata) => {
    const attributes = Object.keys(metadata).filter(k => k !== 'Chart').map(k => `${k.toLowerCase()}="${metadata[k].replace(/"/g, '&quot;')}"\n`);
    return `<${metadata.Chart}\n ${attributes.join(" ") } />`
};

const getImport = (metadata) => {
    return `import ${metadata.Chart} from "${componentBase}/${metadata.Chart}.svelte";`
}

const convertFile = (inFilePath, outFilePath) => {
    const fileContent = readFileSync(inFilePath, 'utf-8');

    // any section-dividing lines/rules in the original word doc will be stripped out by Pandoc
    // any instance of "---" gets replaced by "\-\--" by pandoc (to prevent it from being interpreted as a section divider)
    const inLines = fileContent.replaceAll("\\-\\--", "---").split("\n").map(l => l.trimEnd().replace(/\\$/, ''));

    let outLines = [];
    let imports = []
    let initialYAML = [];

    let havePassedInitialMetadata = false;

    let inBlock = false;
    let blockData = {};
    for (const line of inLines){
        if (inBlock){
            if (!line){
                continue;
            } else if (line.trim() === "---"){
                if (havePassedInitialMetadata){
                    outLines = outLines.concat(formatBlock(blockData))
                    imports.push(getImport(blockData))
                    blockData = {};
                } else {
                    initialYAML.push(line)
                    havePassedInitialMetadata = true;
                }
                inBlock = false;
            } else {
                if (havePassedInitialMetadata){
                    const colonIndex = line.indexOf(":");
                    if (colonIndex === -1) continue;
                    const key = line.slice(0, colonIndex);
                    const value = line.slice(colonIndex + 1);
                    blockData[key.trim()] = value.trim();
                } else {
                    initialYAML.push(line)
                }
            }
        } else {
            if (line.trim() === "---"){
                inBlock = true;

                if (!havePassedInitialMetadata){
                    initialYAML.push(line);
                }

            } else if (!line.match(/<img\s[^>]*src="attachments\//)) {
                outLines.push(line);
            }
        }
    }

    const outDir = path.dirname(outFilePath);
    if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
    }

    const uniqueImports = [...new Set(imports)];

    writeFileSync(outFilePath, [
        ...initialYAML,
            ...( uniqueImports.length  > 0 ? ["\n<script>", ...uniqueImports, "</script>\n"] : []),
        ...outLines
    ].join("\n"));
};



const componentFiles =  globSync('./**/*.md', {
  cwd: inDirPath,
  absolute: true
});


for (const componentPath of componentFiles) {
    const inFilePath = path.join(inDirPath, componentPath);

    const outFilePath = path.join(outDirPath, path.relative(inDirPath, inFilePath)) // remove 'raw/' from path and add 'processed/'


    console.log("Converting", inFilePath, " -> ", outFilePath)
    convertFile(inFilePath, outFilePath);
}