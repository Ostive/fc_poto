// Convertit tous les .jpg / .jpeg / .png d'un dossier en .webp (qualité 80).
// Usage : node scripts/convert-to-webp.mjs <chemin/du/dossier>
// Ex.   : node scripts/convert-to-webp.mjs public/gallery/equipes-fsgt
import { readdir, stat, unlink } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const dir = process.argv[2];
if (!dir) {
  console.error("Usage : node scripts/convert-to-webp.mjs <chemin/du/dossier>");
  process.exit(1);
}

const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png"]);
const QUALITY = 80;

const files = (await readdir(dir)).filter((f) =>
  SOURCE_EXTS.has(parse(f).ext.toLowerCase())
);

if (files.length === 0) {
  console.log("Aucun fichier à convertir dans", dir);
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const inPath = join(dir, file);
  const outPath = join(dir, `${parse(file).name}.webp`);

  const before = (await stat(inPath)).size;
  await sharp(inPath).webp({ quality: QUALITY }).toFile(outPath);
  const after = (await stat(outPath)).size;

  totalBefore += before;
  totalAfter += after;

  const ratio = Math.round((1 - after / before) * 100);
  console.log(
    `${file} → ${parse(file).name}.webp   ${kb(before)} → ${kb(after)}   -${ratio}%`
  );

  // Supprime l'original
  await unlink(inPath);
}

console.log("---");
console.log(
  `Total : ${kb(totalBefore)} → ${kb(totalAfter)}   économie : ${kb(
    totalBefore - totalAfter
  )} (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`
);

function kb(n) {
  return `${(n / 1024).toFixed(0).padStart(5)} Ko`;
}
