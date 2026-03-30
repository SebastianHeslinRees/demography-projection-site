#!/usr/bin/env node

import { mkdirSync, readFileSync, writeFileSync, existsSync, globSync } from 'fs';
import yaml from 'js-yaml';
import path from 'node:path';

// import { glob } from 'node:glob';

const componentBase = "$lib/components/charts";
const inDirPath = '../content-raw';
const outDirPath = "./src/content";


const formatBlock = (metadata) => {
    const componentName = metadata.chart ?? metadata.component;

    const attributes = Object.keys(metadata)
    .filter(k => metadata[k])
    .filter(k => k !== 'Chart')
    .map(k => typeof metadata[k] === 'string' ? 
        `${k.toLowerCase()}="${metadata[k].replace(/"/g, '&quot;')}"\n` : 
        `${k.toLowerCase()}={${ JSON.stringify(metadata[k]).replace(/\\"/g, '\\\\"')}}\n`); // we need to map " in the source docs to \\" in .velite/docs.json
    return `<${componentName}\n ${attributes.join(" ") } />`
};


const getImport = (metadata) => {
    const componentName = metadata.chart ?? metadata.component;
    return `import ${componentName} from "${componentBase}/${componentName}.svelte";`
}

const convertFile = (inFilePath, outFilePath) => {
    const fileContent = readFileSync(inFilePath, 'utf-8');

    // any section-dividing lines/rules in the original word doc will be stripped out by Pandoc
    // any instance of "---" gets replaced by "\-\--" by pandoc (to prevent it from being interpreted as a section divider)
    const inLines = fileContent.replaceAll("\\-\\--", "---").split("\n").map(l => l.trimEnd().replace(/\\$/, '')).filter(l => l.trim() !== '=');

    let outLines = [];
    let imports = []
    let initialYAML = [];

    let havePassedInitialMetadata = false;

    let inBlock = false;
    let blockYAML = "";

    for (const line of inLines){

        if (!inBlock){
          if (line.trim() === "---"){
                inBlock = true;

                if (!havePassedInitialMetadata){
                    initialYAML.push(line);
                }

            } else if (!line.match(/<img\s[^>]*src="attachments\//)) {
                outLines.push(line);
            }
        } else {
            if (!line){
                continue;
            } else if (line.trim() === "---"){
                if (havePassedInitialMetadata){

                    let blockData = yaml.load(blockYAML);
                    blockData = Object.fromEntries( Object.entries(blockData).map( ([k, v]) => ([k.toLowerCase(), v]) ) )


                    console.log("blockData:", blockData)

                    outLines = outLines.concat(formatBlock(blockData))
                    imports.push(getImport(blockData))

                    blockYAML = "";
                } else {
                    initialYAML.push(line)
                    havePassedInitialMetadata = true;
                }
                inBlock = false;
            } else {
                if (havePassedInitialMetadata){
                    blockYAML += "\n";
                    blockYAML += line;

                    /*
                    const colonIndex = line.indexOf(":");
                    if (colonIndex === -1) continue;
                    const key = line.slice(0, colonIndex).toLowerCase();
                    const value = line.slice(colonIndex + 1);
                    blockData[key.trim()] = value.trim();
                    */
                } else {
                    initialYAML.push(line)
                }
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