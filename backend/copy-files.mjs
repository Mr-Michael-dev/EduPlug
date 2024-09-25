import { readFile, writeFile, mkdir } from 'fs/promises';
import * as path from 'path';

async function copyFiles() {
  const srcPath = path.join(process.cwd(), 'src');
  const destPath = path.join(process.cwd(), 'dist');

  await mkdir(destPath, { recursive: true });

  const files = await readFile(srcPath, 'utf8')
    .then(contents => JSON.parse(contents))
    .catch(error => []);

  for (const file of files) {
    if (file !== 'index.ts' && file !== 'index.js') {
      const filePath = path.join(srcPath, file);
      const stat = await readFile(filePath, 'utf8')
        .then(contents => JSON.parse(contents))
        .catch(error => ({ name: 'Unknown', size: 0 }));

      await writeFile(
        path.join(destPath, file),
        Buffer.from(JSON.stringify(stat)),
        { flag: 'w' }
      );
    }
  }
}

copyFiles().catch(console.error);
