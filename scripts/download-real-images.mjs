/**
 * Downloads real restaurant photos from Uber Eats and ricenrolls.ca (Squarespace CDN)
 * and saves them to the correct public/images/menu/ paths.
 * Run: node scripts/download-real-images.mjs
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', 'public', 'images', 'menu');

function download(url, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    const protocol = url.startsWith('https') ? https : http;
    const options = { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RiceNRolls/1.0)' } };
    protocol.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
        file.close();
        fs.unlink(dest, () => {});
        return download(res.headers.location, dest, redirectCount + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

const SQ = 'https://images.squarespace-cdn.com/content/v1/63de6bf61fbf712bfa89718f/';
const UE = 'https://tb-static.uber.com/prod/image-proc/processed_images/';

const images = [
  // ─── GIMBAP & ROLLS ───────────────────────────────────────────────────────
  { url: SQ + '516f0b5c-de8f-44c5-bafd-832b662de097/Original+Kimbob.png',                                                           dest: 'gimbap/original-gimbap.jpg' },
  { url: SQ + '925c085d-8c15-4ab8-b8ee-a334b9591e26/Vege+Kimbob.jpg',                                                               dest: 'gimbap/vegan-gimbap.jpg' },
  { url: SQ + 'abd96034-3886-4fe2-abe0-e9495d4595ed/%E1%84%87%E1%85%AE%E1%86%AF%E1%84%80%E1%85%A9%E1%84%80%E1%85%B5%E1%84%80%E1%85%B5%E1%86%B7%E1%84%87%E1%85%A1%E1%86%B8.png', dest: 'gimbap/beef-bulgogi-gimbap.jpg' },
  { url: SQ + '0a74cbe0-0826-4e86-8941-a58ecd5c26a2/IMG_7549.jpg',                                                                   dest: 'gimbap/crispy-veggie-roll.jpg' },
  { url: SQ + '1a5bd4a3-41a2-4fcf-bc83-792d7f4e28eb/PHOTO-2024-07-05-08-41-14.jpg',                                                 dest: 'gimbap/kspicy-chicken-gimbap.jpg' },
  { url: SQ + '15657b31-e2c1-4cd0-8a40-7ff05a0d0983/5.+Yam+Avo+roll.png',                                                          dest: 'gimbap/yam-avo-roll.jpg' },
  { url: SQ + 'e38e6b6e-c6ad-4df6-a7a9-0cb9f650ec47/Resized_20240709_164407_1720558125439.png',                                     dest: 'gimbap/yam-roll.jpg' },
  { url: SQ + 'b589f8d2-c040-4c40-b163-25919817f985/Tuna+Kimbob.png',                                                               dest: 'gimbap/tuna-gimbap.jpg' },
  { url: UE + '18856a4d499273735b0bb58e81ee4fff/58f691da9eaef86b0b51f9b2c483fe63.jpeg',                                              dest: 'gimbap/california-roll.jpg' },

  // ─── BIBIMBAP ─────────────────────────────────────────────────────────────
  { url: SQ + '56780a07-c6a7-4df5-9e1d-c8c1073db9e3/Resized_RiceNRolls_veganbibimbap_2880x2304_1730923519573-removebg-preview.jpg', dest: 'bibimbap/vegan-bibimbap.jpg' },

  // ─── FRIED RICE ───────────────────────────────────────────────────────────
  { url: SQ + '1e453327-696b-48db-897f-bc0a2ddcd321/chicken+fried+ricepng.jpeg',                                                    dest: 'fried-rice/chicken-fried-rice.jpg' },
  { url: SQ + '91f742e8-45de-93e4-1418898200e6/87eefcfb566b8b8f7d44db9b4c296847.jpg',                                              dest: 'fried-rice/beef-fried-rice.jpg' },
  { url: SQ + '08be7165-5465-47a9-9d5f-f339ab014cef/kimchifriedrice.png',                                                           dest: 'fried-rice/kimchi-fried-rice.jpg' },

  // ─── DEOPBAP ──────────────────────────────────────────────────────────────
  { url: SQ + '64d29d9b-bb3a-4825-82dd-556277ead4c7/dakgalbi.png',                                                                  dest: 'deopbap/kspicy-chicken-deopbap-main.jpg' },
  { url: SQ + 'de12258d-e33e-4bb0-835f-1df122d4694d/Sweet+Pork+with+rice.png',                                                      dest: 'deopbap/sweet-chilli-pork-deopbap.jpg' },
  { url: SQ + 'd69a30c3-a315-4de2-8ca0-d458eecaf7ac/Resized_temp_1729521098425.322055588_592641609854079_1729521108204-removebg-preview.jpg', dest: 'deopbap/bulgogi-deopbap.jpg' },
  { url: SQ + 'de715750-b4cc-488d-9033-2813bbab4a5b/image-removebg-preview+%281%29.png',                                            dest: 'deopbap/mushroom-tofu-deopbap.jpg' },

  // ─── SIGNATURE MEALS ──────────────────────────────────────────────────────
  { url: SQ + 'a318c9a8-c7ea-4358-8c7b-0b8ab370748b/Resized_RiceNRolls_k-popchicken_2880x2304_1730923520024-removebg-preview.jpg', dest: 'signature/kpop-chicken-full.jpg' },
  { url: SQ + '4ff21ee4-8001-4775-af7f-310b736f44cc/Resized_RiceNRolls_kfc_2880x2304_1730923534270-removebg-preview.jpg',          dest: 'signature/kfc-wings.jpg' },
  { url: SQ + '64d29d9b-bb3a-4825-82dd-556277ead4c7/dakgalbi.png',                                                                  dest: 'signature/kspicy-chicken-set.jpg' },
  { url: SQ + '75edd025-bd9b-4d20-ac44-1ed7fbf4b279/Resized_RiceNRolls_bulgogiset_2880x2304_1730923627255-removebg-preview.jpg',  dest: 'signature/beef-bulgogi-set.jpg' },
  { url: SQ + '5a8e7c0a-f945-419e-b860-7c13467be6d0/jeyukbokgeum.png',                                                             dest: 'signature/kspicy-pork-set.jpg' },
  { url: SQ + 'eeedc42d-e62c-4507-b3aa-ad4097a2cd7c/Resized_RiceNRolls_veganjapchae_2880x2304_1730923534971-removebg-preview.jpg',dest: 'signature/japchae.jpg' },
  { url: SQ + '32f5e6e9-cd0d-4fea-a8a9-8e58205abc21/Resized_RiceNRolls_donkatsu_2880x2304_1730923555479-removebg-preview.jpg',    dest: 'signature/donkatsu.jpg' },
  { url: SQ + '1f150c83-bdac-401a-9f1e-df8f0a88ff01/sijang+tteokbokki.jpg',                                                        dest: 'signature/tteokbokki.jpg' },
  { url: SQ + 'f3253485-8fd4-4cb6-99c5-2a5628cf3a06/Resized_RiceNRolls_k-dinnerbox_2880x2304_1730923556334-removebg-preview.jpg', dest: 'signature/kdinner-box.jpg' },

  // ─── DOSHIRAK ─────────────────────────────────────────────────────────────
  { url: SQ + 'fa7cf6b7-7107-41f2-ba78-889f18d82404/image0000011-removebg-preview+%281%29.png',                                    dest: 'doshirak/kdoshirak-set.jpg' },

  // ─── APPETIZERS ───────────────────────────────────────────────────────────
  { url: SQ + 'df7e62ca-48aa-4f69-8680-4c201b90d01c/green-soy-bean-png.png',                                                       dest: 'appetizers/edamame.jpg' },
  { url: SQ + '2848e610-bf6d-48bf-afc0-261cdb7b36bb/4.+Crispy+Tofu.png',                                                          dest: 'appetizers/crispy-tofu.jpg' },
  { url: SQ + '3a8f93b9-f9e4-44c0-9b2d-6268a1aba08a/Crispy+Dumpling.png',                                                         dest: 'appetizers/chicken-dumplings.jpg' },
  { url: SQ + '3a8f93b9-f9e4-44c0-9b2d-6268a1aba08a/Crispy+Dumpling.png',                                                         dest: 'appetizers/veggie-dumplings.jpg' },

  // ─── LUNCH SPECIAL ────────────────────────────────────────────────────────
  { url: UE + '0ec6a71d0cf9f566675933060044a86b/bc9c318a9c96996e2d990faf2b0c65f6.jpeg',                                             dest: 'lunch-special/klunch-box-combo1.jpg' },
  { url: UE + '5ed5d650386f7a37715b039ddbd3768c/bc9c318a9c96996e2d990faf2b0c65f6.jpeg',                                             dest: 'lunch-special/klunch-box-combo2.jpg' },

  // ─── PLATTERS ─────────────────────────────────────────────────────────────
  { url: SQ + 'f01a42be-719e-4a47-bc26-69c519540671/IMG_7423.jpg',                                                                  dest: 'platters/rnr-platter.jpg' },
  { url: SQ + '02db6ecf-b1c8-451b-bda8-607dfa3b4c59/3rolls+combi.png',                                                             dest: 'platters/large-rolls-platter.jpg' },
  { url: SQ + '99547580-916d-4e90-a59a-a52d4feee5a2/Resized_RiceNRolls_familycombo_2880x2304_1730923584939-removebg-preview.jpg',  dest: 'platters/family-combo-set.jpg' },

  // ─── DINNER SPECIAL ───────────────────────────────────────────────────────
  { url: SQ + 'd03e9c04-9389-407f-ad9f-71525becb48d/IMG_3619-removebg-preview.jpg',                                                 dest: 'dinner-special/dinner-set-a.jpg' },
  { url: SQ + '6e2915e0-266a-4958-b9bc-70bcfe2efbf8/IMG_3622-removebg-preview.jpg',                                                 dest: 'dinner-special/dinner-set-b.jpg' },
  { url: SQ + 'e585aa5c-a6a2-4846-ae19-326ed1249a64/IMG_3624-removebg-preview.jpg',                                                 dest: 'dinner-special/dinner-set-c.jpg' },
];

async function main() {
  console.log(`\n📸 Downloading ${images.length} real restaurant photos...\n`);
  let success = 0, fail = 0;
  for (const { url, dest } of images) {
    const fullDest = path.join(BASE, dest);
    process.stdout.write(`  ⬇️  ${dest}…`);
    try {
      await download(url, fullDest);
      process.stdout.write(' ✅\n');
      success++;
    } catch (err) {
      process.stdout.write(` ❌ ${err.message}\n`);
      fail++;
    }
  }
  console.log(`\n🎉 Done: ${success} downloaded, ${fail} failed\n`);
}

main();
