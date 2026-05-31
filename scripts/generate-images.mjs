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
async function generate(prompt, filename, category, { force = false, quality = "medium" } = {}) {
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
    // gpt-image-1 returns b64_json
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

// ── Food photo prompt builders ────────────────────────────────────────────────
function foodPrompt(dish, ingredients) {
  return `Professional restaurant food photography of ${dish}. Ingredients: ${ingredients}. ` +
    `Shot on a clean white background, soft natural studio lighting, ` +
    `slight top-down angle, plated beautifully, vibrant colours, crispy textures visible, ` +
    `ultra-realistic, appetizing, high resolution, no text, no watermark.`;
}

// Highly realistic gimbap prompt — 7 pieces on white plate
function gimbapPrompt(fillings, extraStyle = "") {
  return `Photorealistic food photograph of Korean gimbap. ` +
    `One gimbap roll sliced into exactly 7 equal round pieces arranged in a straight neat row on a clean white ceramic plate. ` +
    `Each piece clearly shows the cross-section: outer dark green nori seaweed wrapper, thin white sushi rice layer, ` +
    `and ${fillings} packed tightly in the centre. ` +
    `Shot on a pure white background. Soft studio lighting from the upper-left casting a gentle shadow. ` +
    `Canon EOS R5, 85mm lens, f/2.8, shallow depth of field, sharp focus on the front pieces. ` +
    `Realistic rice grain texture, glossy nori surface, vibrant natural colours. ` +
    `${extraStyle} ` +
    `Restaurant menu quality. No text, no watermark, no watercolour, no cartoon, no illustration, no 3D render.`;
}

// ── MENU ITEMS by category ────────────────────────────────────────────────────
const ITEMS = {
  "lunch-special": [
    { file: "klunch-box-combo1.png",   prompt: foodPrompt("Korean lunch bento box with crispy fried chicken pieces and gimbap rice rolls", "crispy fried chicken, gimbap rolls, crispy yam, fresh green salad, dipping sauce") },
    { file: "klunch-box-combo2.png",   prompt: foodPrompt("Korean lunch bento box with crispy fried chicken and fried rice", "crispy fried chicken, chicken fried rice, steamed dumplings, fresh salad") },
    { file: "klunch-box-combo3.png",   prompt: foodPrompt("Korean lunch bento box with fried chicken and japchae glass noodles", "crispy fried chicken, japchae sweet potato glass noodles with vegetables, crispy yam, salad") },
    { file: "klunch-box-combo4.png",   prompt: foodPrompt("Korean bulgogi bibimbap lunch box", "seasoned ground beef bulgogi, steamed white rice, shredded carrots, cabbage, gochujang sauce on the side") },
    { file: "klunch-box-combo5.png",   prompt: foodPrompt("Vegan Korean bibimbap lunch box", "steamed rice, fresh mushrooms, carrots, cabbage, lettuce, spicy gochujang sauce, sesame seeds") },
    { file: "klunch-bowl-bulgogi.png", prompt: foodPrompt("Korean bulgogi bibimbap rice bowl", "thinly sliced marinated beef bulgogi over steamed rice, shredded vegetables, gochujang sauce drizzle, sesame seeds") },
    { file: "klunch-bowl-vegan.png",   prompt: foodPrompt("Vegan Korean bibimbap rice bowl", "colourful vegetables over steamed rice, mushrooms, carrots, spinach, gochujang sauce, sesame seeds") },
    { file: "kpop-chicken-lunch.png",  prompt: foodPrompt("Korean fried chicken with sweet chilli sauce", "10-12 crispy boneless fried chicken pieces, golden brown, tossed in glossy sweet chilli sauce, garnished with sesame seeds and green onion") },
    { file: "kfc-wings-lunch.png",     prompt: foodPrompt("Korean fried chicken wings with sweet chilli sauce", "6 crispy golden chicken wings, glazed with sweet chilli sauce, sesame seeds, served on a plate") },
    { file: "kspicy-chicken-deopbap.png", prompt: foodPrompt("Korean spicy chicken dakgalbi topped rice bowl", "stir-fried spicy chicken, rice cake, onion, cabbage over steamed rice, gochujang sauce, sesame seeds, green onion") },
    { file: "ksweet-pork-deopbap.png", prompt: foodPrompt("Korean sweet chilli pork topped rice bowl", "sliced pork in sweet chilli sauce over steamed rice, carrot, onion, cabbage, sesame seeds") },
  ],

  "appetizers": [
    { file: "edamame.png",            prompt: foodPrompt("steamed edamame in a bowl", "bright green edamame pods, lightly salted, steam rising, served in a white bowl") },
    { file: "crispy-tofu.png",        prompt: foodPrompt("crispy fried tofu with dipping sauce", "golden crispy fried tofu cubes, light brown crust, served with soy dipping sauce, garnished with green onion") },
    { file: "chicken-dumplings.png",  prompt: foodPrompt("pan-fried Korean chicken dumplings", "golden brown pan-fried dumplings, crispy bottom, juicy, served on a plate with dipping sauce") },
    { file: "veggie-dumplings.png",   prompt: foodPrompt("pan-fried Korean vegetable dumplings", "golden crispy pan-fried vegetable dumplings, served with soy dipping sauce, sesame seeds") },
  ],

  "gimbap": [
    { file: "original-gimbap.png",       quality: "high", prompt: gimbapPrompt("orange carrot strips, pink crab stick, sliced yellow egg omelette, green cucumber, yellow pickled daikon (danmuji), and pink ham in the centre") },
    { file: "vegan-gimbap.png",          quality: "high", prompt: gimbapPrompt("purple red cabbage, orange carrot strips, dark green cucumber, bright red sweet pepper strips, and a drizzle of white vegan mayo", "Vegan, no meat, no egg.") },
    { file: "california-roll.png",       quality: "high", prompt: gimbapPrompt("creamy green avocado slices, green cucumber, pink crab stick, orange carrot, and a drizzle of orange-red spicy mayo on top of each piece", "Slightly moist glistening surface.") },
    { file: "crispy-veggie-roll.png",    quality: "high", prompt: gimbapPrompt("crispy golden-fried onion, orange carrot, red sweet pepper strips, golden crispy yam, and green cucumber", "Crunchy golden textures visible.") },
    { file: "yam-avo-roll.png",          quality: "high", prompt: gimbapPrompt("golden crispy yam strip, bright red sweet pepper, and creamy dark-green avocado slices", "Rich green and golden contrast.") },
    { file: "kspicy-chicken-gimbap.png", quality: "high", prompt: gimbapPrompt("shredded spicy red-sauced chicken, orange carrot strips, green lettuce, and purple cabbage with red gochujang sauce visible", "Red spicy gloss on the chicken.") },
    { file: "beef-bulgogi-gimbap.png",   quality: "high", prompt: gimbapPrompt("thin dark-brown marinated beef bulgogi slices, orange carrot strips, and fresh green lettuce", "A few white sesame seeds sprinkled on top. Slightly caramelised beef texture.") },
    { file: "crispy-chicken-gimbap.png", quality: "high", prompt: gimbapPrompt("golden crispy breaded chicken tender strip, red sweet pepper, green cucumber, and a drizzle of creamy teriyaki mayo", "Crunchy golden-brown chicken texture visible.") },
    { file: "tuna-gimbap.png",           quality: "high", prompt: gimbapPrompt("seasoned tuna filling, orange carrot, green cucumber, yellow egg strip, green lettuce, and pink crab meat with a touch of spicy mayo", "Classic look.") },
    { file: "yam-roll.png",              quality: "high", prompt: gimbapPrompt("golden crispy deep-fried yam strip filling only, minimal and clean", "Small compact roll. Crispy golden-yellow yam clearly visible.") },
    { file: "avocado-roll.png",          quality: "high", prompt: gimbapPrompt("thick creamy ripe avocado slices only, bright green interior, minimal and clean", "Small compact roll. Rich green avocado filling clearly visible.") },
    { file: "cucumber-roll.png",         quality: "high", prompt: gimbapPrompt("fresh cool cucumber strips only, bright green and crisp interior, minimal and clean", "Small compact roll. Fresh green cucumber visible.") },
    { file: "fried-tofu-rice.png",       quality: "high", prompt: foodPrompt("Korean yubuchobap fried tofu stuffed rice balls", "3 golden-brown fried tofu pockets (inari-style) stuffed with seasoned white rice and orange carrot, arranged on a white plate, glossy golden tofu skin, appetizing, photorealistic") },
  ],

  "bibimbap": [
    { file: "beef-bulgogi-bibimbap.png", prompt: foodPrompt("Korean beef bulgogi bibimbap rice bowl", "colourful bibimbap bowl with seasoned ground beef, steamed rice, shredded carrots, cabbage, dark leafy greens, cucumber, gochujang sauce in centre, sesame seeds") },
    { file: "chicken-bibimbap.png",      prompt: foodPrompt("Korean chicken bibimbap rice bowl", "bibimbap bowl with seasoned chicken, steamed rice, colourful vegetables, carrots, cabbage, gochujang sauce, sesame seeds") },
    { file: "vegan-bibimbap.png",        prompt: foodPrompt("Korean vegan bibimbap rice bowl", "colourful vegan bibimbap with mushrooms, steamed rice, carrots, spinach, cucumber, zucchini, gochujang sauce, sesame seeds, no meat") },
  ],

  "fried-rice": [
    { file: "chicken-fried-rice.png", prompt: foodPrompt("Korean chicken fried rice in a bowl", "golden fried rice with tender chicken pieces, green peas, diced carrots, green beans, green onion, sesame oil, wok-charred") },
    { file: "veggie-fried-rice.png",  prompt: foodPrompt("Korean vegetable fried rice", "golden fried rice with mushrooms, green peas, carrots, green beans, green onion, sesame seeds, no meat") },
    { file: "beef-fried-rice.png",    prompt: foodPrompt("Korean beef fried rice", "golden fried rice with tender beef pieces, peas, carrots, green beans, green onion, savory wok flavour") },
    { file: "kimchi-fried-rice.png",  prompt: foodPrompt("Korean kimchi fried rice", "reddish-orange kimchi fried rice with fermented kimchi pieces, green onion, sesame seeds, gochujang, fried egg on top") },
  ],

  "signature": [
    { file: "kpop-chicken-full.png",   prompt: foodPrompt("Korean crispy boneless fried chicken with sweet spicy sauce full portion", "large plate of 10-12 crispy boneless chicken thigh pieces, glossy sweet spicy K-pop sauce, sesame seeds, green onion, pickled daikon on side") },
    { file: "kfc-wings.png",           prompt: foodPrompt("Korean fried chicken wings 6 pieces", "6 crispy golden Korean fried chicken wings, glazed with sweet honey soya sauce, sesame seeds, green onion") },
    { file: "kspicy-chicken-set.png",  prompt: foodPrompt("Korean dakgalbi spicy chicken set with rice and coleslaw", "spicy stir-fried chicken with rice cake, steamed white rice, Korean coleslaw on the side, gochujang sauce, green onion") },
    { file: "kspicy-tofu-set.png",     prompt: foodPrompt("Korean spicy tofu set with rice cake and coleslaw", "spicy stir-fried firm tofu with chewy rice cake, steamed rice, Korean coleslaw, red gochujang sauce") },
    { file: "la-galbi-set.png",        prompt: foodPrompt("Korean LA galbi grilled beef short ribs set", "three strips of grilled Korean beef short ribs, charred grill marks, steamed rice, fresh seasonal salad, premium presentation") },
    { file: "beef-bulgogi-set.png",    prompt: foodPrompt("Korean beef bulgogi set with rice and coleslaw", "thin sliced marinated sweet soy beef bulgogi, steamed white rice, Korean coleslaw, sesame seeds, green onion") },
    { file: "kspicy-pork-set.png",     prompt: foodPrompt("Korean spicy pork jeyuk bokkeum set with rice", "stir-fried spicy sliced pork shoulder with onion, green onion, cabbage, steamed rice, red gochujang sauce") },
    { file: "japchae.png",             prompt: foodPrompt("Korean japchae glass noodles with vegetables", "shiny sweet potato glass noodles stir-fried with julienned carrot, green pepper, red pepper, mushroom, sesame oil, sesame seeds, vegan") },
    { file: "donkatsu.png",            prompt: foodPrompt("Korean donkatsu pork cutlet set with rice and coleslaw", "golden crispy breaded pork cutlet, steamed white rice, Korean coleslaw, tonkatsu sauce drizzle") },
    { file: "tofu-katsu.png",          prompt: foodPrompt("Korean crispy tofu katsu set with rice and coleslaw", "golden crispy breaded tofu cutlet, steamed white rice, Korean coleslaw, sauce drizzle, vegan") },
    { file: "tteokbokki.png",          prompt: foodPrompt("Korean tteokbokki spicy rice cakes with fish cake", "chewy cylindrical rice cakes and fish cake strips in glossy red sweet spicy gochujang sauce, sesame seeds, green onion, steam rising") },
    { file: "veggie-tteokbokki.png",   prompt: foodPrompt("Korean vegetarian tteokbokki spicy rice cakes", "chewy rice cakes in glossy red gochujang sauce, no fish cake, vegetables, sesame seeds, green onion") },
    { file: "kdinner-box.png",         prompt: foodPrompt("Korean dinner box ssambap with beef bulgogi and fresh vegetables", "beef bulgogi, rice, fresh lettuce wraps, perilla leaves, sliced vegetables, Korean samjang dipping sauce, elegant presentation") },
  ],

  "deopbap": [
    { file: "kspicy-chicken-deopbap-main.png", prompt: foodPrompt("Korean spicy chicken deopbap topped rice bowl", "dakgalbi spicy chicken over steamed rice, carrot, onion, cabbage, lettuce, red K-spicy sauce, sesame seeds") },
    { file: "mushroom-tofu-deopbap.png",        prompt: foodPrompt("Korean mushroom and tofu deopbap topped rice bowl", "stir-fried mushroom and soft tofu over steamed rice, onion, green onion, sesame seeds, savoury sauce, vegan") },
    { file: "sweet-chilli-pork-deopbap.png",    prompt: foodPrompt("Korean sweet chilli pork deopbap topped rice bowl", "glazed sweet chilli sliced pork over steamed rice, carrot, onion, cabbage, sesame seeds, glossy sauce") },
  ],

  "dinner-special": [
    { file: "dinner-set-a.png", prompt: foodPrompt("Korean dinner set with donkatsu pork cutlet and dumplings", "golden crispy donkatsu pork cutlet, sweet chilli pork, steamed chicken dumplings, steamed white rice, elegant dinner plate") },
    { file: "dinner-set-b.png", prompt: foodPrompt("Korean dinner set with fried chicken and spicy chicken", "crispy Korean fried chicken pieces, spicy chicken, steamed dumplings, steamed white rice, dinner presentation") },
    { file: "dinner-set-c.png", prompt: foodPrompt("Korean vegan dinner set with crispy tofu and dumplings", "crispy tofu cutlet, vegetable dumplings, crispy yam, sweet pumpkin tempura, steamed rice, vegan dinner plate") },
  ],

  "platters": [
    { file: "rnr-platter.png",        prompt: foodPrompt("Korean gimbap party platter 38 pieces assorted", "large platter with rows of sliced gimbap varieties — original, tuna, bulgogi, California roll — colourful and festive, serves 3-4 people") },
    { file: "vegan-platter-med.png",  prompt: foodPrompt("Korean vegan gimbap platter medium 38 pieces", "large platter of assorted vegan gimbap rolls sliced, colourful vegetables visible, dairy-free egg-free, serves 3-4") },
    { file: "vegan-platter-lg.png",   prompt: foodPrompt("Korean vegan gimbap platter large 56 pieces", "extra large festive platter of assorted vegan gimbap rolls, beautifully arranged, colourful, serves 5-6 people") },
    { file: "kfamily-combo-a.png",    prompt: foodPrompt("Korean family combo platter with fried chicken wings, K-pop chicken, gimbap, and sides", "family feast spread: crispy chicken wings, K-pop chicken, gimbap rolls, corn cheese, coleslaw, chips with sauce, party style") },
    { file: "kfamily-combo-b.png",    prompt: foodPrompt("Korean vegan family combo platter with japchae noodles and dumplings", "vegan family feast: japchae glass noodles, crispy tofu set, vegetable dumplings, avocado rolls, yam rolls, party spread") },
  ],

  "coming-soon": [
    { file: "kimchi-stew.png",   prompt: foodPrompt("Korean kimchi jjigae stew in a stone pot", "bubbling hot kimchi stew in a traditional Korean stone pot, red broth, kimchi pieces, tofu, pork, steam rising, rustic") },
    { file: "gamjatang.png",     prompt: foodPrompt("Korean gamjatang pork bone potato stew", "rich spicy Korean pork bone stew with large potato chunks, perilla leaves, green onion, red broth, clay pot") },
    { file: "sundubu.png",       prompt: foodPrompt("Korean sundubu jjigae soft tofu stew", "bubbling spicy soft tofu stew in stone pot, silky white tofu pieces, red broth, egg cracked in, mushrooms, green onion") },
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
    await generate(item.prompt, item.file, cat, { force, quality: item.quality || "medium" });
    // Small delay to avoid rate-limiting
    await new Promise(r => setTimeout(r, 1500));
  }
}

console.log("\n🎉 Done!");
