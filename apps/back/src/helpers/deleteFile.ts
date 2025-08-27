import fs from 'node:fs';
import path from 'node:path';

export function deleteFile(filename?: string) {
  fs.unlinkSync(path.resolve(`./public/upload/${filename}`));
}
