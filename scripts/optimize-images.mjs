import sharp from 'sharp'
import { readdirSync, mkdirSync, existsSync } from 'fs'
import { join, extname, basename } from 'path'

const INPUT_DIR  = './public/images'
const OUTPUT_DIR = './public/images'

const files = readdirSync(INPUT_DIR).filter(f =>
  ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase())
)

console.log(`\n🖼  Optimizando ${files.length} imágenes...\n`)

for (const file of files) {
  const inputPath  = join(INPUT_DIR, file)
  const name       = basename(file, extname(file))
  const outputPath = join(OUTPUT_DIR, `${name}.webp`)

  const meta = await sharp(inputPath).metadata()
  const originalKB = (await import('fs')).statSync(inputPath).size / 1024

  await sharp(inputPath)
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(outputPath)

  const newKB = (await import('fs')).statSync(outputPath).size / 1024
  const saving = Math.round((1 - newKB / originalKB) * 100)

  console.log(`  ✓ ${file.padEnd(30)} ${Math.round(originalKB)} KB → ${Math.round(newKB)} KB  (-${saving}%)`)
}

console.log('\n✅ Listo. Ahora actualiza las referencias en App.jsx de .png a .webp\n')
