import fs from 'fs';
import path from 'path';

export function deleteFile(filename?: string) {
  fs.unlinkSync(path.resolve(`./public/upload/${filename}`));
}
