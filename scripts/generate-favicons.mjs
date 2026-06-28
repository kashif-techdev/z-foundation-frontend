import sharp from "sharp";
import toIco from "to-ico";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const logo = path.join(root, "public/images/logo.jpg");
const appDir = path.join(root, "app");
const publicDir = path.join(root, "public");

async function pngBuffer(size) {
  return sharp(logo).resize(size, size, { fit: "cover", position: "centre" }).png().toBuffer();
}

async function generate() {
  await mkdir(appDir, { recursive: true });
  await mkdir(publicDir, { recursive: true });

  const png32 = await pngBuffer(32);
  const png48 = await pngBuffer(48);
  const png180 = await pngBuffer(180);
  const png192 = await pngBuffer(192);

  await writeFile(path.join(appDir, "icon.png"), png32);
  await writeFile(path.join(appDir, "apple-icon.png"), png180);
  await writeFile(path.join(publicDir, "favicon-48.png"), png48);
  await writeFile(path.join(publicDir, "favicon-192.png"), png192);
  await writeFile(path.join(publicDir, "apple-icon.png"), png180);

  const ico = await toIco([png32, png48]);
  await writeFile(path.join(publicDir, "favicon.ico"), ico);

  console.log("Favicons generated from public/images/logo.jpg");
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
