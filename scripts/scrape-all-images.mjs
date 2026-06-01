/**
 * Scrapes all food images from ricenrolls.ca (all pages) + Uber Eats
 * and saves them into public/images/staging/ organized by source.
 *
 * Run: node scripts/scrape-all-images.mjs
 *
 * After running, browse the staging folder and copy images you want
 * into the appropriate public/images/menu/ subfolders.
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STAGING = path.join(__dirname, '..', 'public', 'images', 'staging');

function download(url, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RiceNRolls/1.0)' } }, (res) => {
      if ([301, 302, 307].includes(res.statusCode)) {
        file.close(); fs.unlink(dest, () => {});
        return download(res.headers.location, dest, redirectCount + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close(); fs.unlink(dest, () => {});
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

/** Extract a clean filename from a Squarespace or Uber CDN URL */
function fname(url) {
  const raw = decodeURIComponent(url.split('/').pop().split('?')[0]);
  // sanitize: replace spaces/+ with -, remove special chars
  return raw.replace(/\+/g, '-').replace(/[^a-zA-Z0-9.\-_]/g, '-').replace(/-+/g, '-').toLowerCase();
}

const SQ = 'https://images.squarespace-cdn.com/content/v1/63de6bf61fbf712bfa89718f/';
const UE = 'https://tb-static.uber.com/prod/image-proc/processed_images/';

const images = [

  // ═══════════════════════════════════════════════════════════
  // ricenrolls.ca — HOME PAGE
  // ═══════════════════════════════════════════════════════════
  { url: SQ + '38d72e3c-db49-40de-9ef9-94c15badf86f/RiceNRolls_familycombo_2880x2304.jpg',                                           folder: 'home', name: 'family-combo-highres.jpg' },
  { url: SQ + '8ea7c63b-6c64-45e9-9f2f-99880572c109/IMG_73421.jpg',                                                                  folder: 'home', name: 'IMG_73421.jpg' },
  { url: SQ + 'cca773e8-fb06-4a5d-8eed-6a9956a43d1f/veggie+platter.png',                                                             folder: 'home', name: 'veggie-platter.png' },
  { url: SQ + 'ecd17738-9efc-4cab-8751-e65a459df06c/Resized_RiceNRolls_veganbibimbap_2880x2304_1730923519573-removebg-preview.png',   folder: 'home', name: 'vegan-bibimbap-2.png' },

  // ═══════════════════════════════════════════════════════════
  // ricenrolls.ca — MENU PAGE (/menu1)
  // ═══════════════════════════════════════════════════════════
  // Appetizers
  { url: SQ + 'df7e62ca-48aa-4f69-8680-4c201b90d01c/green-soy-bean-png.png',                                                         folder: 'menu', name: 'edamame.png' },
  { url: SQ + '2848e610-bf6d-48bf-afc0-261cdb7b36bb/4.+Crispy+Tofu.png',                                                             folder: 'menu', name: 'crispy-tofu.png' },
  { url: SQ + '3a8f93b9-f9e4-44c0-9b2d-6268a1aba08a/Crispy+Dumpling.png',                                                            folder: 'menu', name: 'dumplings.png' },
  // Gimbap
  { url: SQ + '516f0b5c-de8f-44c5-bafd-832b662de097/Original+Kimbob.png',                                                            folder: 'menu', name: 'original-gimbap.png' },
  { url: SQ + '925c085d-8c15-4ab8-b8ee-a334b9591e26/Vege+Kimbob.jpg',                                                                folder: 'menu', name: 'vegan-gimbap.jpg' },
  { url: SQ + 'abd96034-3886-4fe2-abe0-e9495d4595ed/%E1%84%87%E1%85%AE%E1%86%AF%E1%84%80%E1%85%A9%E1%84%80%E1%85%B5%E1%84%80%E1%85%B5%E1%86%B7%E1%84%87%E1%85%A1%E1%86%B8.png', folder: 'menu', name: 'bulgogi-gimbap.png' },
  { url: SQ + '0a74cbe0-0826-4e86-8941-a58ecd5c26a2/IMG_7549.jpg',                                                                   folder: 'menu', name: 'crispy-veggie-roll.jpg' },
  { url: SQ + '47d54d39-39c7-49c6-9e67-574099963339/PHOTO-2024-07-05-08-41-15+2.jpg',                                                folder: 'menu', name: 'bulgogi-or-crispy-chicken-gimbap.jpg' },
  { url: SQ + '1a5bd4a3-41a2-4fcf-bc83-792d7f4e28eb/PHOTO-2024-07-05-08-41-14.jpg',                                                  folder: 'menu', name: 'kspicy-chicken-gimbap.jpg' },
  { url: SQ + '15657b31-e2c1-4cd0-8a40-7ff05a0d0983/5.+Yam+Avo+roll.png',                                                           folder: 'menu', name: 'yam-avo-roll.png' },
  { url: SQ + '37d2805b-0fa0-49ef-9ae4-bc1ff888ff82/a7262baa-d706-4f49-b5b1-192df54a2254.JPG',                                       folder: 'menu', name: 'gimbap-unknown-1.jpg' },
  { url: SQ + 'b589f8d2-c040-4c40-b163-25919817f985/Tuna+Kimbob.png',                                                                folder: 'menu', name: 'tuna-gimbap.png' },
  { url: SQ + 'e38e6b6e-c6ad-4df6-a7a9-0cb9f650ec47/Resized_20240709_164407_1720558125439.png',                                      folder: 'menu', name: 'yam-roll.png' },
  { url: SQ + '3c38fd99-e25f-45e0-92ed-9235fd75c684/IMG_7535.jpg',                                                                   folder: 'menu', name: 'gimbap-unknown-2.jpg' },
  { url: SQ + 'd092f094-d1b6-4a77-9861-da43b393e199/yam.jpg',                                                                        folder: 'menu', name: 'yam-roll-2.jpg' },
  // Platters
  { url: SQ + 'f01a42be-719e-4a47-bc26-69c519540671/IMG_7423.jpg',                                                                   folder: 'menu', name: 'rnr-platter.jpg' },
  { url: SQ + '02db6ecf-b1c8-451b-bda8-607dfa3b4c59/3rolls+combi.png',                                                               folder: 'menu', name: '3-rolls-combo.png' },
  { url: SQ + '2a9f1853-4e2e-4c35-abe4-e5007dd65def/32+pcs.png',                                                                     folder: 'menu', name: '32pcs-platter.png' },
  // Rice Bowls
  { url: SQ + '56780a07-c6a7-4df5-9e1d-c8c1073db9e3/Resized_RiceNRolls_veganbibimbap_2880x2304_1730923519573-removebg-preview.jpg',  folder: 'menu', name: 'vegan-bibimbap.jpg' },
  { url: SQ + '08be7165-5465-47a9-9d5f-f339ab014cef/kimchifriedrice.png',                                                             folder: 'menu', name: 'kimchi-fried-rice.png' },
  { url: SQ + '91f742e9-fce8-45de-93e4-1418898200e6/87eefcfb566b8b8f7d44db9b4c296847.jpg',                                           folder: 'menu', name: 'beef-fried-rice.jpg' },
  { url: SQ + '1e453327-696b-48db-897f-bc0a2ddcd321/chicken+fried+ricepng.jpeg',                                                      folder: 'menu', name: 'chicken-fried-rice.jpg' },
  // Main dishes
  { url: SQ + 'a318c9a8-c7ea-4358-8c7b-0b8ab370748b/Resized_RiceNRolls_k-popchicken_2880x2304_1730923520024-removebg-preview.jpg',   folder: 'menu', name: 'kpop-chicken.jpg' },
  { url: SQ + '4ff21ee4-8001-4775-af7f-310b736f44cc/Resized_RiceNRolls_kfc_2880x2304_1730923534270-removebg-preview.jpg',            folder: 'menu', name: 'kfc-wings.jpg' },
  { url: SQ + '64d29d9b-bb3a-4825-82dd-556277ead4c7/dakgalbi.png',                                                                   folder: 'menu', name: 'dakgalbi.png' },
  { url: SQ + '75edd025-bd9b-4d20-ac44-1ed7fbf4b279/Resized_RiceNRolls_bulgogiset_2880x2304_1730923627255-removebg-preview.jpg',     folder: 'menu', name: 'beef-bulgogi-set.jpg' },
  { url: SQ + '5a8e7c0a-f945-419e-b860-7c13467be6d0/jeyukbokgeum.png',                                                               folder: 'menu', name: 'spicy-pork-set.png' },
  { url: SQ + 'fa7cf6b7-7107-41f2-ba78-889f18d82404/image0000011-removebg-preview+%281%29.png',                                      folder: 'menu', name: 'kdoshirak-set.png' },
  { url: SQ + 'eeedc42d-e62c-4507-b3aa-ad4097a2cd7c/Resized_RiceNRolls_veganjapchae_2880x2304_1730923534971-removebg-preview.jpg',   folder: 'menu', name: 'japchae.jpg' },
  { url: SQ + '32f5e6e9-cd0d-4fea-a8a9-8e58205abc21/Resized_RiceNRolls_donkatsu_2880x2304_1730923555479-removebg-preview.jpg',       folder: 'menu', name: 'donkatsu.jpg' },
  { url: SQ + '1f150c83-bdac-401a-9f1e-df8f0a88ff01/sijang+tteokbokki.jpg',                                                          folder: 'menu', name: 'tteokbokki.jpg' },
  { url: SQ + 'f3253485-8fd4-4cb6-99c5-2a5628cf3a06/Resized_RiceNRolls_k-dinnerbox_2880x2304_1730923556334-removebg-preview.jpg',    folder: 'menu', name: 'kdinner-box.jpg' },
  { url: SQ + '99547580-916d-4e90-a59a-a52d4feee5a2/Resized_RiceNRolls_familycombo_2880x2304_1730923584939-removebg-preview.jpg',    folder: 'menu', name: 'family-combo-set.jpg' },
  { url: SQ + 'de12258d-e33e-4bb0-835f-1df122d4694d/Sweet+Pork+with+rice.png',                                                       folder: 'menu', name: 'sweet-pork-deopbap.png' },
  { url: SQ + 'd69a30c3-a315-4de2-8ca0-d458eecaf7ac/Resized_temp_1729521098425.322055588_592641609854079_1729521108204-removebg-preview.jpg', folder: 'menu', name: 'deopbap-unknown-1.jpg' },
  { url: SQ + 'de715750-b4cc-488d-9033-2813bbab4a5b/image-removebg-preview+%281%29.png',                                             folder: 'menu', name: 'deopbap-unknown-2.png' },
  { url: SQ + 'd03e9c04-9389-407f-ad9f-71525becb48d/IMG_3619-removebg-preview.jpg',                                                  folder: 'menu', name: 'dinner-set-a-pork.jpg' },
  { url: SQ + '6e2915e0-266a-4958-b9bc-70bcfe2efbf8/IMG_3622-removebg-preview.jpg',                                                  folder: 'menu', name: 'dinner-set-b-chicken.jpg' },
  { url: SQ + 'e585aa5c-a6a2-4846-ae19-326ed1249a64/IMG_3624-removebg-preview.jpg',                                                  folder: 'menu', name: 'dinner-set-c-veggie.jpg' },

  // ═══════════════════════════════════════════════════════════
  // ricenrolls.ca — CATERING PAGE
  // ═══════════════════════════════════════════════════════════
  { url: SQ + '1714701035757-Q8VOY6B5W2O3PDKAM1IQ/image-asset.jpeg',                                                                 folder: 'catering', name: 'catering-hero.jpg' },
  { url: SQ + 'b91bffe4-a9bd-4ace-808a-744ce98d9b06/catering+in+pizza+box.png',                                                      folder: 'catering', name: 'catering-pizza-box.png' },
  { url: SQ + '1714790279809-GQYLJDC05RQECOM09ORG/image-asset.jpeg',                                                                 folder: 'catering', name: 'catering-food-1.jpg' },
  { url: SQ + '640e7ec9-345d-487f-a9e3-ec31a391f367/c9dacf53cd32a59c588dd5ca36703640.jpg',                                           folder: 'catering', name: 'catering-food-2.jpg' },
  { url: SQ + '1714791900130-UHL4AI9WSO8RKHCO2MDT/image-asset.jpeg',                                                                 folder: 'catering', name: 'catering-food-3.jpg' },
  { url: SQ + '04a0a993-ff2c-4571-b512-6548f8390f9a/mushroom+japchae.jpg',                                                           folder: 'catering', name: 'mushroom-japchae.jpg' },
  { url: SQ + 'b7e350ce-8f71-4720-aac1-cf59654ffaa5/5bb989e88fee8be7136255448701aa4a.png',                                           folder: 'catering', name: 'catering-food-4.png' },
  { url: SQ + '729cb634-923f-40fc-8782-f5d6a7e9c651/ttekbokki.jpg',                                                                  folder: 'catering', name: 'tteokbokki-2.jpg' },
  { url: SQ + '897703dc-8035-4900-a90f-38eafb3caec7/49a1a1cf672ea92f712dcb3ef4ab4737.jpg',                                           folder: 'catering', name: 'catering-food-5.jpg' },
  { url: SQ + '755cac65-a351-41b8-ace2-9bff61dfa291/2dbf7ad7ae531bb0e122e0f90d6a7e69.png',                                           folder: 'catering', name: 'catering-food-6.png' },
  { url: SQ + '1f23c69d-7eb2-41b7-a0c0-82d015764687/galbi+set.png',                                                                  folder: 'catering', name: 'galbi-set.png' },
  { url: SQ + '9a868edf-8c75-4b54-8e27-66ee6e568ea2/4c3edfa1bdbd02462847bfddf9645644.jpg',                                           folder: 'catering', name: 'catering-food-7.jpg' },

  // ═══════════════════════════════════════════════════════════
  // ricenrolls.ca — LUNCH SPECIAL PAGE
  // ═══════════════════════════════════════════════════════════
  { url: SQ + '764921ca-6de6-4252-9d45-bd83f3166204/K-pop+Chicken+with+Gimbob.png',                                                  folder: 'lunch', name: 'combo1-kpop-chicken-gimbap.png' },
  { url: SQ + '615df056-c5ec-41b2-bebd-0bff2351c123/K-pop+chicken+with+Fried+rice.png',                                              folder: 'lunch', name: 'combo2-kpop-chicken-fried-rice.png' },
  { url: SQ + '3950fdc7-ea28-43bb-8529-0d2a05c7ad11/%E1%84%83%E1%85%A1%E1%86%B0%E1%84%80%E1%85%A1%E1%86%B4%E1%84%89%E1%85%A5%E1%84%8A.png', folder: 'lunch', name: 'combo3-dakgalbi.png' },
  { url: SQ + '08daaefa-0c06-4395-91e0-4c44bcfd332e/L-pop+Chicken+with+Noodle.png',                                                  folder: 'lunch', name: 'combo4-kpop-chicken-noodle.png' },
  { url: SQ + 'de12258d-e33e-4bb0-835f-1df122d4694d/Sweet+Pork+with+rice.png',                                                       folder: 'lunch', name: 'combo5-sweet-pork-rice.png' },
  { url: SQ + '217ee63b-d271-43fa-abc5-44bcfd87d91a/vegan.png',                                                                      folder: 'lunch', name: 'bowl-vegan-bibimbap.png' },
  { url: SQ + '3197c0a0-eedb-4dcf-bb7b-c01b81c4f7af/Bulgigi+Bibimbop.png',                                                           folder: 'lunch', name: 'bowl-bulgogi-bibimbap.png' },
  { url: SQ + '5080a68e-b6ef-4c6e-b68a-1386969fa335/K-pop+Chicken.png',                                                              folder: 'lunch', name: 'kpop-chicken-lunch.png' },
  { url: SQ + '2f703c0c-d936-4fbe-bf4c-0e8aae616324/item-800000001610370615_1686948033.png',                                         folder: 'lunch', name: 'lunch-item-unknown.png' },

  // ═══════════════════════════════════════════════════════════
  // UBER EATS
  // ═══════════════════════════════════════════════════════════
  { url: UE + '39f0b3e90c965edce1947b703e6591ef/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'original-gimbap.jpg' },
  { url: UE + '4dfde3bdb36e7c9ec42250d4302dedb3/bc9c318a9c96996e2d990faf2b0c65f6.jpeg',  folder: 'ubereats', name: 'triangle-gimbap.jpg' },
  { url: UE + '41f73a3d3c4aa286e9b8bd847fca5bca/bc9c318a9c96996e2d990faf2b0c65f6.jpeg',  folder: 'ubereats', name: 'kimchi-fried-rice.jpg' },
  { url: UE + '5ed5d650386f7a37715b039ddbd3768c/bc9c318a9c96996e2d990faf2b0c65f6.jpeg',  folder: 'ubereats', name: 'lunch-special-b.jpg' },
  { url: UE + '566afc659b0f6a23eb502fc7b8f7296a/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'veggie-dinner-set.jpg' },
  { url: UE + '4894efc5a886a21d0486b68801b0ff53/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'dumplings.jpg' },
  { url: UE + '15c91555d3374981e5462338fc74252e/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'kpop-chicken.jpg' },
  { url: UE + '00a2a0a1330ec02d30cd3aa84a4f32ff/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'tteokbokki.jpg' },
  { url: UE + 'bbbd3cf85a68d6f9a6e5a2008c745dee/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'japchae.jpg' },
  { url: UE + '69854908c8ed788d1a765d21f225fcc0/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'chicken-dinner-set.jpg' },
  { url: UE + 'b2ad9a88c25264d35925589964633674/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'beef-bulgogi-set.jpg' },
  { url: UE + 'cd96f1dd51c2ec8c37eb06438c592f85/bc9c318a9c96996e2d990faf2b0c65f6.jpeg',  folder: 'ubereats', name: 'veggie-tteokbokki.jpg' },
  { url: UE + '02aa0c36d34242b4fc327532a2cbeaf8/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'beef-bulgogi.jpg' },
  { url: UE + '0ec6a71d0cf9f566675933060044a86b/bc9c318a9c96996e2d990faf2b0c65f6.jpeg',  folder: 'ubereats', name: 'lunch-special-a.jpg' },
  { url: UE + '88e4d3143dd3591072f9760a0af23d3c/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'pork-dinner-set.jpg' },
  { url: UE + 'e330d745b5428f1f9f5918c2ba5725a5/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'kfc-wings.jpg' },
  { url: UE + '29c6231bb338170ebfeaaa4f333e0bc7/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'fried-rice.jpg' },
  { url: UE + '675cdd007ed246956e130aacb672be69/bc9c318a9c96996e2d990faf2b0c65f6.jpeg',  folder: 'ubereats', name: 'edamame.jpg' },
  { url: UE + '14eac9c6ec65f2faeee707a76cababc3/70aa2a4db7f990373ca9c376323e3dea.jpeg',  folder: 'ubereats', name: 'edamame-half.jpg' },
  { url: UE + '936f3267c2facb6c45235de932f07c22/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'vegan-gimbap.jpg' },
  { url: UE + '18856a4d499273735b0bb58e81ee4fff/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'california-roll.jpg' },
  { url: UE + '1efedb004272254e79240a9770648d29/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'crispy-veggie-roll.jpg' },
  { url: UE + '915536ca6ffec5436d3dc2340d1b2fbe/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'yam-avo-roll.jpg' },
  { url: UE + '6a4ee2344c868282923661e2a94fd5c6/58f691da9eaef86b0b51f9b2c483fe63.jpeg',  folder: 'ubereats', name: 'kspicy-chicken.jpg' },
  { url: UE + '348ac3ad6bbd3335734f792c02b8b381/70aa2a4db7f990373ca9c376323e3dea.jpeg',  folder: 'ubereats', name: 'kdoshirak-set.jpg' },
];

async function main() {
  console.log(`\n📸 Scraping ${images.length} images from ricenrolls.ca + Uber Eats...\n`);
  const counts = {};
  let ok = 0, fail = 0;

  for (const { url, folder, name } of images) {
    const dest = path.join(STAGING, folder, name);
    counts[folder] = (counts[folder] || 0) + 1;
    process.stdout.write(`  [${folder}] ${name}…`);
    try {
      await download(url, dest);
      process.stdout.write(' ✅\n');
      ok++;
    } catch (err) {
      process.stdout.write(` ❌ ${err.message}\n`);
      fail++;
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅ ${ok} downloaded, ❌ ${fail} failed`);
  console.log(`\n📁 Saved to: public/images/staging/`);
  console.log(`   ├── home/       (${counts.home || 0} images)`);
  console.log(`   ├── menu/       (${counts.menu || 0} images)`);
  console.log(`   ├── catering/   (${counts.catering || 0} images)`);
  console.log(`   ├── lunch/      (${counts.lunch || 0} images)`);
  console.log(`   └── ubereats/   (${counts.ubereats || 0} images)`);
  console.log(`\nReview the staging folder and copy images into public/images/menu/\n`);
}

main();
