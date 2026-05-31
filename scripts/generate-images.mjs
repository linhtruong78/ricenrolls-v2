import OpenAI from "openai";
import fs from "fs";
import path from "path";
import https from "https";
import http from "http";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Load .env.local if OPENAI_API_KEY not already set
if (!process.env.OPENAI_API_KEY) {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf8").split("\n");
    for (const line of lines) {
      const match = line.match(/^([^=]+)=(.+)$/);
      if (match) process.env[match[1].trim()] = match[2].trim();
    }
  }
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Helper: download image from URL ──────────────────────────────────────────
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const proto = url.startsWith("https") ? https : http;
    proto.get(url, (res) => {
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => { fs.unlink(destPath, () => {}); reject(err); });
  });
}

// ── Generate one image ────────────────────────────────────────────────────────
async function generate(prompt, filename, category, { force = false, quality = "high" } = {}) {
  const dir = path.join(ROOT, "public", "images", "menu", category);
  fs.mkdirSync(dir, { recursive: true });
  const destPath = path.join(dir, filename);

  if (fs.existsSync(destPath) && !force) {
    console.log(`  ⏭  Already exists: ${filename}`);
    return;
  }

  console.log(`  🎨 Generating: ${filename}…`);
  try {
    const response = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1024x1024",
      quality,
    });
    const b64 = response.data[0].b64_json;
    if (b64) {
      fs.writeFileSync(destPath, Buffer.from(b64, "base64"));
    } else {
      await downloadImage(response.data[0].url, destPath);
    }
    console.log(`  ✅ Saved: ${filename}`);
  } catch (err) {
    console.error(`  ❌ Failed ${filename}:`, err.message);
  }
}

// ── Prompt helpers ────────────────────────────────────────────────────────────
const STYLE =
  `Pure white background. Soft natural studio lighting from upper-left, gentle shadow. ` +
  `Canon EOS R5, 85mm lens, f/2.8 shallow depth of field. ` +
  `Vivid realistic food colours and textures, appetizing, restaurant menu photo quality. ` +
  `No text, no watermark, no cartoon, no illustration, no 3D render. Photorealistic.`;

const rp = (dish) => `${dish} ${STYLE}`;

// Gimbap: 7-piece row on white plate
function gimbapPrompt(fillings, extra = "") {
  return `Photorealistic food photograph of a Korean gimbap roll sliced into exactly 7 equal round pieces, ` +
    `arranged in a neat straight row on a clean white ceramic plate. ` +
    `Cross-section clearly shows: dark green nori wrapper, white rice layer, and ${fillings} in the centre. ` +
    `${extra} ` + STYLE;
}

// ── MENU ITEMS by category ────────────────────────────────────────────────────
const ITEMS = {

  // ── Gimbap & Rolls (already generated — skip unless --force) ─────────────────
  "gimbap": [
    { file: "original-gimbap.png",       prompt: gimbapPrompt("orange carrot strips, pink crab stick, yellow egg omelette, green cucumber, yellow pickled daikon, pink ham") },
    { file: "vegan-gimbap.png",          prompt: gimbapPrompt("purple red cabbage, orange carrot, dark green cucumber, red sweet pepper, white vegan mayo drizzle", "No meat, no egg.") },
    { file: "california-roll.png",       prompt: gimbapPrompt("creamy green avocado, green cucumber, pink crab stick, orange carrot, orange-red spicy mayo drizzle on top") },
    { file: "crispy-veggie-roll.png",    prompt: gimbapPrompt("golden crispy onion, orange carrot, red sweet pepper, golden yam, green cucumber", "Crunchy golden textures.") },
    { file: "yam-avo-roll.png",          prompt: gimbapPrompt("golden crispy yam strip, red sweet pepper, creamy dark-green avocado") },
    { file: "kspicy-chicken-gimbap.png", prompt: gimbapPrompt("shredded spicy red-sauced chicken, orange carrot, green lettuce, purple cabbage", "Red gochujang gloss.") },
    { file: "beef-bulgogi-gimbap.png",   prompt: gimbapPrompt("dark-brown marinated beef bulgogi, orange carrot, fresh green lettuce", "Sesame seeds on top, caramelised beef.") },
    { file: "crispy-chicken-gimbap.png", prompt: gimbapPrompt("golden crispy breaded chicken, red sweet pepper, green cucumber, teriyaki mayo drizzle") },
    { file: "tuna-gimbap.png",           prompt: gimbapPrompt("seasoned tuna, orange carrot, green cucumber, yellow egg, green lettuce, crab meat") },
    { file: "yam-roll.png",              prompt: gimbapPrompt("golden crispy deep-fried yam strip, minimal clean filling", "Small compact roll.") },
    { file: "avocado-roll.png",          prompt: gimbapPrompt("thick creamy ripe avocado, bright green", "Small compact roll.") },
    { file: "cucumber-roll.png",         prompt: gimbapPrompt("fresh cool cucumber strips, bright green, crisp", "Small compact roll.") },
    { file: "fried-tofu-rice.png",       prompt: rp(`3 Korean yubuchobap (inari-style fried tofu stuffed rice) pieces on a white ceramic plate. Golden-brown tofu skin pockets stuffed with seasoned white rice and orange carrot. Glossy golden tofu surface. Arranged neatly. Slight top-down angle.`) },
  ],

  // ── Rice Bowl — Bibimbap ─────────────────────────────────────────────────────
  "bibimbap": [
    { file: "beef-bulgogi-bibimbap.png", prompt: rp(`Korean beef bulgogi bibimbap in a round white ceramic bowl. Steamed white rice at base, topped with neatly arranged colourful sections: julienned orange carrots, sliced green cucumber, wilted dark-green spinach, shredded purple cabbage, and seasoned ground beef bulgogi. A red gochujang sauce dollop in the centre. White sesame seeds and chopped green onion on top. 45-degree angle view.`) },
    { file: "chicken-bibimbap.png",      prompt: rp(`Korean chicken bibimbap in a round white ceramic bowl. Steamed rice topped with colourful sections: julienned carrots, sliced cucumber, spinach, cabbage, and tender seasoned chicken pieces. Red gochujang in the centre, sesame seeds on top. 45-degree angle.`) },
    { file: "vegan-bibimbap.png",        prompt: rp(`Korean vegan bibimbap in a round white ceramic bowl. Steamed rice topped with colourful arranged sections of sautéed shiitake mushrooms, julienned orange carrots, fresh cucumber slices, wilted spinach, shredded purple cabbage. Red gochujang sauce in the centre. Sesame seeds. No meat. 45-degree angle.`) },
  ],

  // ── Rice Bowl — Fried Rice ───────────────────────────────────────────────────
  "fried-rice": [
    { file: "chicken-fried-rice.png",    prompt: rp(`Korean chicken fried rice in a round white ceramic bowl. Golden wok-fried rice with visible chunks of tender chicken, bright green peas, diced orange carrots, green beans, chopped green onion. Slightly glossy with soy and sesame oil. Light steam. Slight top-down angle.`) },
    { file: "veggie-fried-rice.png",     prompt: rp(`Korean vegetable fried rice in a round white ceramic bowl. Golden fried rice with sautéed mushrooms, bright green peas, diced orange carrots, green beans, chopped green onion. No meat. Sesame seeds, slight sheen from sesame oil. Top-down angle.`) },
    { file: "beef-fried-rice.png",       prompt: rp(`Korean beef fried rice in a round white ceramic bowl. Golden fried rice with tender bite-sized beef pieces, green peas, diced carrots, green beans, green onion. Rich savoury colour from soy sauce, slight glossy sheen. Top-down angle.`) },
    { file: "kimchi-fried-rice.png",     prompt: rp(`Korean kimchi fried rice in a round white ceramic bowl. Reddish-orange fried rice with visible kimchi pieces, sliced green onion, sesame seeds, topped with a sunny-side-up fried egg. Glistening with sesame oil. Steam rising. Top-down angle.`) },
  ],

  // ── Rice Bowl — Deopbap ──────────────────────────────────────────────────────
  "deopbap": [
    { file: "kspicy-chicken-deopbap-main.png", prompt: rp(`Korean spicy chicken deopbap (dakgalbi) in a white ceramic bowl. Stir-fried spicy chicken in glossy deep-red gochujang sauce with chewy rice cake (tteok) slices, onion, shredded cabbage, and carrot, over a bed of steamed white rice. Sesame seeds and sliced green onion garnish. Steam rising. Slight top-down angle.`) },
    { file: "mushroom-tofu-deopbap.png",       prompt: rp(`Korean mushroom and soft tofu deopbap in a white ceramic bowl. Stir-fried shiitake and oyster mushrooms with silken tofu cubes, sliced onion, green onion, in a light savoury soy-sesame sauce, over steamed white rice. Sesame seeds garnish. Soft textures visible. Top-down angle.`) },
    { file: "sweet-chilli-pork-deopbap.png",   prompt: rp(`Korean spicy pork deopbap in a white ceramic bowl. Stir-fried thinly sliced pork in a glossy spicy red sauce with shredded cabbage, julienned carrot, onion, over a bed of steamed white rice. Sesame seeds and green onion on top. Slight top-down angle.`) },
    { file: "bulgogi-deopbap.png",             prompt: rp(`Korean beef bulgogi deopbap in a white ceramic bowl. Thinly sliced sweet soy marinated beef over steamed white rice, topped with sautéed onion, sliced green onion, sesame seeds, drizzle of sesame oil. Caramelised beef gloss. Slight top-down angle.`) },
  ],

  // ── Doshirak & Meals (signature folder) ─────────────────────────────────────
  "signature": [
    // Doshirak sets
    { file: "beef-bulgogi-set.png",      prompt: rp(`Korean beef bulgogi set meal plated on a white ceramic plate. Thinly sliced sweet soy marinated beef bulgogi, slightly caramelised, beside a mound of steamed white rice and a serving of creamy coleslaw. Sesame seeds and chopped green onion garnish. Clean restaurant presentation.`) },
    { file: "kspicy-pork-set.png",       prompt: rp(`Korean spicy pork set meal plated on a white ceramic plate. Stir-fried thinly sliced pork with onion, green onion, cabbage in glossy red gochujang sauce, alongside steamed white rice. Sesame seeds and chilli garnish. Rich red colour.`) },
    { file: "donkatsu.png",              prompt: rp(`Korean donkatsu set on a white ceramic plate. Golden panko-breaded pork cutlet, perfectly crispy, sliced diagonally, beside a mound of steamed white rice, a portion of creamy coleslaw, and a small ramekin of tonkatsu sauce. Clean restaurant presentation, crunchy texture visible.`) },
    { file: "tofu-katsu.png",            prompt: rp(`Korean tofu katsu set on a white ceramic plate. Golden panko-breaded crispy tofu cutlet sliced diagonally, beside steamed white rice, creamy coleslaw, house kimchi, and tonkatsu sauce drizzle. Vegan. Crunchy golden crust clearly visible.`) },
    { file: "kdinner-box.png",           prompt: rp(`Korean K-BBQ box set on a white rectangular plate. Sliced beef bulgogi, steamed white rice in a small bowl, fresh lettuce leaves, sliced cucumber, perilla leaves, cherry tomato, and a small ramekin of Korean samjang dipping sauce. Elegant ssam-style presentation.`) },
    { file: "kspicy-tofu-set.png",       prompt: rp(`Korean spicy tofu set. Stir-fried firm tofu with chewy rice cake (tteok) in red gochujang sauce, steamed rice, Korean coleslaw on the side. Vegan. Glossy red sauce, visible tofu and rice cake texture.`) },
    { file: "la-galbi-set.png",          prompt: rp(`Korean LA galbi set — three strips of grilled beef short ribs (flanken-cut) with char grill marks, alongside steamed rice and fresh seasonal salad on a white plate. Premium presentation, caramelised crust visible.`) },
    // Meals
    { file: "kpop-chicken-full.png",     prompt: rp(`Korean K-pop fried chicken on a white ceramic plate. 10-12 pieces of golden crispy boneless chicken thighs, generously coated in glossy sweet-spicy red K-pop sauce. Sesame seeds and thinly sliced green onion on top. Pickled radish slices on side. Appetizing sticky gloss.`) },
    { file: "kfc-wings.png",             prompt: rp(`Korean fried chicken wings — 6 pieces on a white ceramic plate. Golden crispy chicken wings glazed with sweet honey-soy sauce, sesame seeds, chopped green onion. Perfectly crispy skin visible. Side of pickled radish. Clean plating.`) },
    { file: "kspicy-chicken-set.png",    prompt: rp(`Korean spicy chicken dakgalbi set on a white plate. Stir-fried spicy chicken with chewy rice cake (tteok), onion, cabbage in deep-red gochujang sauce, beside steamed white rice and creamy coleslaw. Green onion and sesame garnish.`) },
    { file: "japchae.png",               prompt: rp(`Korean japchae on a white ceramic plate. Shiny translucent sweet potato glass noodles stir-fried with julienned orange carrots, green spinach, red bell pepper, shiitake mushrooms. Tossed in sesame oil and soy. Sesame seeds on top. Beautiful colour contrast.`) },
    { file: "tteokbokki.png",            prompt: rp(`Korean tteokbokki in a white ceramic bowl. Plump cylindrical white rice cakes and fish cake strips simmered in a thick glossy deep-red gochujang sauce. Green onion slices and sesame seeds on top. Steam rising, sauce bubbling slightly. Served on white plate.`) },
    { file: "veggie-tteokbokki.png",     prompt: rp(`Korean vegetarian tteokbokki in a white ceramic bowl. Plump cylindrical rice cakes in thick red gochujang sauce, no fish cake, with mushroom and vegetables. Green onion and sesame seeds. Steam visible. Vegan.`) },
  ],

  // ── Appetizers ───────────────────────────────────────────────────────────────
  "appetizers": [
    { file: "edamame.png",               prompt: rp(`Steamed edamame in a white ceramic bowl. Bright vivid-green edamame pods, lightly salted, light steam rising. Clean top-down angle. Simple, fresh, appetizing.`) },
    { file: "crispy-tofu.png",           prompt: rp(`Crispy fried tofu on a white ceramic plate. Golden-brown crispy tofu cubes with a crunchy exterior. A small ramekin of soy-vinegar dipping sauce on the side. Chopped green onion and sesame seeds garnish. Vegan.`) },
    { file: "chicken-dumplings.png",     prompt: rp(`Korean pan-fried chicken dumplings (mandu) on a white ceramic plate. 6 golden-brown dumplings with crispy pan-fried flat bottoms and soft pleated tops. A small ramekin of soy dipping sauce on the side. Sesame seeds and green onion garnish. Steam visible.`) },
    { file: "veggie-dumplings.png",      prompt: rp(`Korean pan-fried vegetable dumplings (mandu) on a white ceramic plate. 6 golden crispy-bottomed dumplings. A small ramekin of soy dipping sauce. Sesame seeds, green onion garnish. Vegan. Steam visible from tops.`) },
    { file: "kimchi-pancake.png",        prompt: rp(`Korean kimchi jeon (kimchi pancake) on a white ceramic plate. A round golden-brown crispy pancake with visible red kimchi pieces and green onion throughout, cut into wedges. A small ramekin of soy-vinegar dipping sauce. Crispy texture clearly visible. Slight top-down angle.`) },
    { file: "crispy-veggie-tempura.png", prompt: rp(`Korean crispy vegetable tempura on a white ceramic plate. 3 golden crispy yam rings, 1 broccoli floret, 2 zucchini rounds, and 2 onion rings — all lightly battered and deep-fried golden. Arranged neatly with a small dipping sauce ramekin. Crispy light batter texture visible.`) },
  ],

  // ── Lunch Special ────────────────────────────────────────────────────────────
  "lunch-special": [
    { file: "klunch-box-combo1.png",        prompt: rp(`Korean lunch bento box (doshirak) top-down view on white background. Divided compartments containing: golden crispy K-pop chicken pieces, sliced Korean gimbap roll (8 pcs showing colourful cross-section), crispy golden yam, fresh green salad with dressing. Neat tidy compartments, vibrant colours.`) },
    { file: "klunch-box-combo2.png",        prompt: rp(`Korean lunch bento box (doshirak) top-down view on white background. Compartments: golden crispy K-pop chicken, golden fried rice with peas and carrot, steamed chicken dumplings, fresh green salad. Neat compartments, vibrant colours.`) },
    { file: "klunch-box-combo3.png",        prompt: rp(`Korean lunch bento box (doshirak) top-down view on white background. Compartments: golden crispy K-pop chicken, shiny japchae glass noodles with vegetables, crispy golden yam, fresh salad. Neat presentation, vibrant colours.`) },
    { file: "klunch-box-combo4.png",        prompt: rp(`Korean lunch bento box top-down on white background. Compartments: bulgogi beef bibimbap rice bowl with gochujang sauce, fresh salad, pickled vegetables, sesame seeds. Neat compartments.`) },
    { file: "klunch-box-combo5.png",        prompt: rp(`Korean vegan lunch bento box top-down on white background. Compartments: vegan bibimbap with colourful vegetables and gochujang sauce, fresh green salad, crispy yam. Vegan, no meat. Neat presentation.`) },
    { file: "klunch-bowl-bulgogi.png",      prompt: rp(`Korean bulgogi bibimbap lunch rice bowl in a round white bowl. Steamed rice topped with sweet soy beef bulgogi, shredded carrots, cucumber, cabbage, gochujang sauce. Sesame seeds. Lunch portion size. Top-down angle.`) },
    { file: "klunch-bowl-vegan.png",        prompt: rp(`Korean vegan bibimbap lunch rice bowl. Steamed rice topped with colourful vegetables — mushroom, carrot, spinach, cucumber, cabbage — gochujang sauce in centre. Sesame seeds. No meat. Top-down angle.`) },
    { file: "kpop-chicken-lunch.png",       prompt: rp(`Korean K-pop fried chicken lunch portion on a white plate. 10-12 golden crispy boneless chicken pieces coated in glossy sweet chilli sauce. Sesame seeds and green onion garnish. Lunch-size serving. Side of pickled radish.`) },
    { file: "kfc-wings-lunch.png",          prompt: rp(`Korean fried chicken wings lunch — 6 golden crispy wings on a white plate, glazed in sweet chilli sauce. Sesame seeds, green onion. Crispy skin visible. Pickled radish side.`) },
    { file: "kspicy-chicken-deopbap.png",   prompt: rp(`Korean spicy chicken dakgalbi cupbap in a white ceramic bowl. Spicy stir-fried chicken with rice cake (tteok), cabbage, green onion in glossy red gochujang sauce, over steamed white rice. Sesame seeds. Lunch portion. Steam rising.`) },
    { file: "ksweet-pork-deopbap.png",      prompt: rp(`Korean sweet chilli pork over rice in a white bowl. Glazed pork slices with cabbage, carrot, onion in sweet chilli sauce over steamed white rice. Sesame seeds, green onion garnish. Glossy sauce.`) },
  ],

  // ── Platters ─────────────────────────────────────────────────────────────────
  "platters": [
    { file: "rnr-platter.png",           prompt: rp(`Korean gimbap party platter on a large white ceramic serving board. Rows of 5 different sliced gimbap varieties neatly arranged side by side: original, bulgogi, California roll, crispy veggie, and yam avocado — 38 pieces total. Cross-sections showing colourful fillings. Top-down view. Festive, serves 3-4.`) },
    { file: "large-rolls-platter.png",   prompt: rp(`Korean large gimbap rolls platter on a large white ceramic serving board. 7 varieties of sliced gimbap neatly arranged: original, vegan, California, bulgogi, spicy chicken, crispy chicken, crispy veggie — 53 pieces total. Beautiful array of colourful cross-sections. Top-down view. Serves 5-6.`) },
    { file: "vegan-platter-med.png",     prompt: rp(`Korean vegan gimbap platter on a white ceramic serving board. 38 pieces of assorted vegan rolls neatly arranged: avocado rolls, yam rolls, cucumber rolls, vegan gimbap, crispy veggie rolls — colourful green, yellow, purple cross-sections. Top-down view. Dairy-free and egg-free. Serves 3-4.`) },
    { file: "vegan-platter-lg.png",      prompt: rp(`Korean large vegan gimbap platter on a white ceramic serving board. 56 pieces assorted vegan rolls neatly arranged in rows: avocado, yam, cucumber, vegan gimbap, crispy veggie, yam-avo — vibrant colourful cross-sections. Top-down view. Serves 5-6.`) },
    { file: "kfamily-combo-a.png",       prompt: rp(`Korean family combo party spread on a large white serving tray. Centre: golden crispy K-pop chicken pieces with red sauce. Left: crispy KFC wings. Right: sliced gimbap assortment. Sides: creamy coleslaw bowl, corn cheese, chips. Festive family-style serving.`) },
    { file: "kfamily-combo-b.png",       prompt: rp(`Korean vegan family combo spread on a large white serving tray. Shiny japchae glass noodles, crispy tofu pieces, pan-fried vegetable dumplings, sliced avocado rolls, sliced yam rolls. Colourful vegan feast. Festive presentation.`) },
    { file: "family-combo-set.png",      prompt: rp(`Korean family combo set on a large white serving board. Golden crispy K-pop chicken pieces, 8 honey-garlic KFC wings, sliced original gimbap, sliced California roll, creamy coleslaw in a small bowl, crispy mixed tempura (yam, broccoli, onion rings). Abundant family feast spread. Top-down view.`) },
  ],

  // ── Dinner Special ───────────────────────────────────────────────────────────
  "dinner-special": [
    { file: "dinner-set-a.png",          prompt: rp(`Korean dinner set A on a white ceramic plate. Golden panko-breaded pork cutlet (donkatsu), sweet chilli glazed pork slices, steamed chicken dumplings, steamed white rice, side of kimchi. Restaurant dinner portion. Clean elegant plating.`) },
    { file: "dinner-set-b.png",          prompt: rp(`Korean dinner set B on a white ceramic plate. Golden crispy K-pop chicken pieces in sweet-spicy sauce, spicy chicken (dakgalbi) portion, steamed chicken dumplings, steamed white rice. Rich golden and red colours. Dinner portion.`) },
    { file: "dinner-set-c.png",          prompt: rp(`Korean vegan dinner set C on a white ceramic plate. Golden crispy tofu cutlet (tofu katsu), pan-fried vegetable dumplings, golden crispy yam tempura, sweet pumpkin tempura, steamed white rice. All vegan. Colourful vibrant presentation.`) },
  ],

};

// ── Run ───────────────────────────────────────────────────────────────────────
// Usage: node scripts/generate-images.mjs [category] [--force]
const args = process.argv.slice(2);
const force = args.includes("--force");
const categoryArg = args.find(a => !a.startsWith("--"));
const categories = categoryArg ? [categoryArg] : Object.keys(ITEMS);

if (force) console.log("⚡ Force mode ON — will overwrite existing files.");

for (const cat of categories) {
  if (!ITEMS[cat]) { console.log(`Unknown category: ${cat}`); continue; }
  console.log(`\n📂 Category: ${cat} (${ITEMS[cat].length} images)`);
  for (const item of ITEMS[cat]) {
    await generate(item.prompt, item.file, cat, { force, quality: item.quality || "high" });
    await new Promise(r => setTimeout(r, 1500));
  }
}

console.log("\n🎉 Done!");
