export type DietaryTag = "vegan" | "gf" | "spicy";
export interface MenuItem { name: string; description: string; price: string; emoji: string; image?: string; tags: DietaryTag[]; badge?: string; comingSoon?: boolean; hidden?: boolean; }
export interface MenuCategory { id: string; label: string; emoji: string; subtitle?: string; items: MenuItem[]; }

export const menuCategories: MenuCategory[] = [

  // ─── RICE BOWL ───────────────────────────────────────────────────────────────
  { id: "rice-bowl", label: "Rice Bowl", emoji: "🍚", subtitle: "Korean-style rice bowls", items: [
    { name: "Beef Bulgogi Bibimbap",           description: "Rice, carrots, cabbage, ground beef bulgogi — gochujang or sesame soya",          price: "$15.99", emoji: "🍚", image: "/images/menu/rice-bowl/beef-bulgogi-bibimbap.jpg",              tags: [],              badge: "❤️ Fan Fave" },
    { name: "Vegan Bibimbap",                  description: "Rice, carrots, seasonal herbs, cabbage, mushroom — gochujang sauce",              price: "$15.99", emoji: "🍚", image: "/images/menu/rice-bowl/vegan-bibimbap.jpg",                       tags: ["vegan","gf"] },
    { name: "Chicken Fried Rice",              description: "Rice, peas, carrot, green bean, green onion, chicken",                            price: "$13.99", emoji: "🍳", image: "/images/menu/rice-bowl/chicken-fried-rice.jpg",                   tags: [] },
    { name: "Veggie Fried Rice",               description: "Rice, peas, carrot, green bean, green onion, mushroom",                           price: "$13.99", emoji: "🍳", image: "/images/menu/rice-bowl/veggie-fried-rice.jpg",                    tags: ["vegan"] },
    { name: "Beef Fried Rice",                 description: "Rice, peas, carrot, green bean, green onion, beef",                               price: "$13.99", emoji: "🍳", image: "/images/menu/rice-bowl/beef-fried-rice.jpg",                      tags: [] },
    { name: "Kimchi Fried Rice",               description: "Rice, green onion, kimchi — classic Korean comfort",                              price: "$13.99", emoji: "🍳", image: "/images/menu/rice-bowl/kimchi-fried-rice.jpg",                    tags: ["spicy"] },
    { name: "Signature Dakgalbi Deopbap",      description: "K-Spicy chicken over rice — chicken, onion, carrot, cabbage, lettuce, k-spicy sauce, sesame seeds", price: "$14.99", emoji: "🥣", image: "/images/menu/rice-bowl/kspicy-chicken-deopbap-main.jpg", tags: ["spicy"], badge: "🌶️ Signature", hidden: true },
    { name: "Bulgogi Deopbap",                 description: "Thinly sliced sweet soy beef, onion, green onion over steamed rice — sesame oil, sesame seeds", price: "$14.99", emoji: "🥣", image: "/images/menu/rice-bowl/bulgogi-deopbap.jpg",                    tags: [],          hidden: true },
    { name: "Spicy Pork Deopbap",              description: "Pork with spicy sauce, carrot, onion, cabbage, sesame seeds over rice",           price: "$14.99", emoji: "🥣", image: "/images/menu/rice-bowl/sweet-chilli-pork-deopbap.jpg",              tags: ["spicy"],   hidden: true },
    { name: "Mushroom Tofu Deopbap",           description: "Mushroom, tofu, onion, green onion, sesame seeds over steamed rice",              price: "$14.99", emoji: "🥣", image: "/images/menu/rice-bowl/mushroom-tofu-deopbap.jpg",                  tags: ["vegan"],   hidden: true },
    { name: "Crispy Chicken Deopbap",          description: "Crispy chicken over steamed rice",                                                price: "$14.99", emoji: "🥣", tags: [],              hidden: true },
    // ─ Hidden ─
    { name: "Chicken Bibimbap",                description: "Rice, carrots, cabbage, seasoned chicken — gochujang or sesame soya",             price: "$15.99", emoji: "🍚", image: "/images/menu/rice-bowl/chicken-bibimbap.png",                      tags: [],              hidden: true },
  ]},

  // ─── DOSHIRAK ────────────────────────────────────────────────────────────────
  { id: "doshirak", label: "Doshirak", emoji: "🍱", subtitle: "Korean set meals — includes rice & sides", items: [
    { name: "Beef Bulgogi Set",                description: "Thinly sliced beef in sweet soy, garlic & sesame marinade — steamed rice, creamy coleslaw, sesame seeds, green onion", price: "$18.99", emoji: "🥩", image: "/images/menu/doshirak/beef-bulgogi-set.jpg", tags: [],              hidden: true },
    { name: "Spicy Pork Set",                  description: "Sliced pork with K-spicy sauce, onion, green onion, cabbage, rice",               price: "$18.99", emoji: "🐷", image: "/images/menu/doshirak/kspicy-pork-set.jpg",                      tags: ["spicy"],       hidden: true },
    { name: "K-Doshirak Set (1 Protein)",       description: "Choice of 1 protein (beef bulgogi, spicy pork, spicy chicken, or K-pop chicken) — kimchi, chicken dumplings, steamed rice, coleslaw", price: "$18.99", emoji: "🍱", image: "/images/menu/doshirak/beef-bulgogi-set.jpg", tags: [],              badge: "⭐ New" },
    { name: "K-Doshirak Set (2 Proteins)",      description: "Choice of 2 proteins (beef bulgogi, spicy pork, spicy chicken, or K-pop chicken) — kimchi, chicken dumplings, steamed rice, coleslaw", price: "$20.99", emoji: "🍱", image: "/images/menu/doshirak/kdoshirak-set.jpg", tags: [],              badge: "⭐ New" },
    { name: "Donkatsu Set",                    description: "Panko-breaded pork cutlet, steamed rice, house kimchi, creamy coleslaw, tonkatsu sauce", price: "$21.99", emoji: "🍱", image: "/images/menu/doshirak/donkatsu.jpg",                             tags: [] },
    { name: "Tofu-Katsu Set",                  description: "Panko-breaded crispy tofu cutlet, steamed rice, creamy coleslaw, house kimchi, tonkatsu sauce", price: "$20.99", emoji: "🍱", image: "/images/menu/doshirak/tofu-katsu.png",                           tags: ["vegan"] },
    { name: "Veggie Set (Vegan Sausage)",      description: "Vegan sausage set meal",                                                          price: "Soon!",  emoji: "🌿", tags: ["vegan"],        comingSoon: true },
    { name: "Crunch Box",                      description: "Coming soon",                                                                     price: "Soon!",  emoji: "📦", tags: [],              comingSoon: true },
    // ─ Hidden ─
    { name: "K-Spicy Chicken Set",             description: "Rice, chicken, rice cake with Korean spicy sauce, coleslaw",                      price: "$18.99", emoji: "🌶️", image: "/images/menu/signature/kspicy-chicken-set.jpg",                   tags: ["spicy"],       hidden: true },
    { name: "K-Spicy Tofu Set",                description: "Rice, tofu, rice cake with Korean spicy sauce, coleslaw",                         price: "$15.99", emoji: "🌶️", image: "/images/menu/doshirak/kspicy-tofu-set.png",                      tags: ["vegan","spicy"], hidden: true },
    { name: "L.A. Galbi Set",                  description: "Three strips Korean grilled beef short rib, rice, seasonal salad",                price: "$27.99", emoji: "🥩", image: "/images/menu/doshirak/la-galbi-set.png",                         tags: [],              hidden: true, badge: "💎 Premium" },
  ]},

  // ─── GIMBAP & ROLLS ──────────────────────────────────────────────────────────
  { id: "gimbap-rolls", label: "Gimbap & Rolls", emoji: "🌯", subtitle: "8–10 pcs · housemade sauces", items: [
    { name: "Original",                        description: "Carrot, crab meat, spam/ham, egg, cucumber, pickled daikon",                      price: "$9.99",  emoji: "🌯", image: "/images/menu/gimbap-rolls/original-gimbap.jpg",                         tags: [] },
    { name: "Vegan",                           description: "Carrot, cucumber, red cabbage, red sweet pepper, vegan spicy mayo",               price: "$9.99",  emoji: "🌯", image: "/images/menu/gimbap-rolls/vegan-gimbap.jpg",                            tags: ["vegan"] },
    { name: "California Roll",                 description: "Avocado, cucumber, crab meat, carrot, Rice N Rolls spicy mayo",                   price: "$10.99", emoji: "🌯", image: "/images/menu/gimbap-rolls/california-roll.jpg",                         tags: [] },
    { name: "Yam Avo Roll",                    description: "Crispy yam, red sweet pepper, avocado",                                           price: "$10.99", emoji: "🌯", image: "/images/menu/gimbap-rolls/yam-avo-roll.jpg",                            tags: ["vegan"] },
    { name: "Crispy Veggie",                   description: "Crispy onion, carrot, red sweet pepper, yam, cucumber",                           price: "$10.99", emoji: "🌯", image: "/images/menu/gimbap-rolls/crispy-veggie-roll.jpg",                      tags: ["vegan"] },
    { name: "Bulgogi Beef",                    description: "Beef bulgogi, carrot, lettuce",                                                   price: "$11.99", emoji: "🌯", image: "/images/menu/gimbap-rolls/beef-bulgogi-gimbap.jpg",                     tags: [],              badge: "⭐ Best Seller" },
    { name: "K-Spicy Chicken",                 description: "K-spicy chicken, carrot, lettuce, cabbage",                                      price: "$11.99", emoji: "🌯", image: "/images/menu/gimbap-rolls/kspicy-chicken-gimbap.jpg",                   tags: ["spicy"],       badge: "🌶️ Spicy" },
    { name: "Crispy Chicken",                  description: "Crispy chicken tender, sweet red pepper, cucumber, teriyaki mayo",                price: "$11.99", emoji: "🌯", image: "/images/menu/gimbap-rolls/crispy-chicken-gimbap.jpg",                   tags: [] },
    { name: "Avo Roll (6 pcs)",                description: "Creamy ripe avocado, seasoned sushi rice, toasted nori, sesame seeds",           price: "$6.99",  emoji: "🥑", image: "/images/menu/gimbap-rolls/avocado-roll.jpg",                            tags: ["vegan"] },
    { name: "Yam Roll (6 pcs)",                description: "Golden crispy deep-fried sweet yam, seasoned sushi rice, toasted nori",          price: "$6.99",  emoji: "🌯", image: "/images/menu/gimbap-rolls/yam-roll.jpg",                                tags: ["vegan"] },
    { name: "Cucumber Roll",                   description: "Cool crisp cucumber, seasoned sushi rice, toasted nori, sesame seeds",           price: "$6.99",  emoji: "🥒", image: "/images/menu/gimbap-rolls/cucumber-roll.png",                           tags: ["vegan"] },
    { name: "Shrimp Tempura Roll",             description: "Crispy shrimp tempura roll",                                                      price: "Soon!",  emoji: "🦐", tags: [],              comingSoon: true },
    // ─ Hidden ─
    { name: "Tuna",                            description: "Canned tuna, carrot, cucumber, lettuce, egg, chilli pepper, crab meat",           price: "$11.99", emoji: "🌯", image: "/images/menu/gimbap-rolls/tuna-gimbap.jpg",                             tags: [],              hidden: true },
    { name: "Fried Tofu Stuffed Rice (3 pcs)", description: "Rice, carrots, fried tofu (yubuchobap)",                                         price: "$6.99",  emoji: "🍱", image: "/images/menu/gimbap-rolls/fried-tofu-rice.png",                         tags: ["vegan"],       hidden: true },
  ]},

  // ─── MEALS ───────────────────────────────────────────────────────────────────
  { id: "meals", label: "Meals", emoji: "🍽️", subtitle: "House favourites", items: [
    { name: "K-Pop Chicken",                   description: "Crispy boneless chicken thigh — sweet & spicy K-pop or honey soya sauce, with pickles", price: "$25.99 / Half $13.99", emoji: "🍗", image: "/images/menu/signature/kpop-chicken-full.jpg", tags: ["spicy"], badge: "🔥 House Special" },
    { name: "KFC Wings (6 pcs)",               description: "Crispy Korean fried chicken wings — K-pop sauce or mild soya honey",              price: "$10.99", emoji: "🍗", image: "/images/menu/signature/kfc-wings.jpg",                            tags: [] },
    { name: "K-Spicy Chicken",                 description: "Rice, chicken, rice cake with Korean spicy sauce, coleslaw",                      price: "$18.99", emoji: "🌶️", image: "/images/menu/signature/kspicy-chicken-set.jpg",                   tags: ["spicy"],   hidden: true },
    { name: "Japchae",                         description: "Glass noodles, carrot, peppers, mushroom — add chicken or bulgogi +$2",           price: "$14.99", emoji: "🍜", image: "/images/menu/signature/japchae.jpg",                              tags: ["vegan","gf"],  badge: "🌿 Vegan · GF" },
    { name: "Tteokbokki",                      description: "Rice cake, fish cake with spicy & sweet gochujang sauce",                         price: "$13.99", emoji: "🍢", image: "/images/menu/signature/tteokbokki.jpg",                           tags: ["spicy"] },
    { name: "Egg Rolls",                       description: "Crispy Korean egg rolls",                                                         price: "Soon!",  emoji: "🥚", tags: [],              comingSoon: true },
    // ─ Hidden ─
    { name: "Veggie Tteokbokki",               description: "Vegetarian tteokbokki",                                                           price: "$12.99", emoji: "🍢", image: "/images/menu/signature/veggie-tteokbokki.png",                    tags: ["vegan","spicy"], hidden: true },
  ]},

  // ─── APPETIZERS ──────────────────────────────────────────────────────────────
  { id: "appetizers", label: "Appetizers", emoji: "🥗", items: [
    { name: "Edamame",                         description: "Steamed salted edamame",                                                          price: "$7.99",  emoji: "🫛", image: "/images/menu/appetizers/edamame.jpg",                             tags: ["vegan","gf"] },
    { name: "Crispy Tofu",                     description: "Golden crispy fried tofu cubes, served with soy-vinegar dipping sauce & green onion", price: "$8.99",  emoji: "🟨", image: "/images/menu/appetizers/crispy-tofu.jpg",                         tags: ["vegan"] },
    { name: "Chicken Dumplings",               description: "Handmade dumplings — ground chicken, cabbage, garlic, ginger, green onion & sesame oil, pan-fried golden", price: "$8.99",  emoji: "🥟", image: "/images/menu/appetizers/chicken-dumplings.jpg",                   tags: [] },
    { name: "Veggie Dumplings",                description: "Handmade dumplings — cabbage, glass noodles, tofu, garlic, sesame oil & ginger, pan-fried golden", price: "$8.99",  emoji: "🥟", image: "/images/menu/appetizers/veggie-dumplings.jpg",                    tags: ["vegan"] },
    { name: "Kimchi Pancake",                  description: "Crispy savoury jeon — fermented kimchi, green onion & savoury batter, served with soy-vinegar dipping sauce", price: "$12.99", emoji: "🥞", image: "/images/menu/appetizers/kimchi-pancake.png",                     tags: ["spicy"],        badge: "⭐ New" },
    { name: "Crispy Veggie Tempura",           description: "3 yam, 1 broccoli, 2 zucchini & 2 onion rings — lightly battered & fried, served with dipping sauce", price: "$9.99",  emoji: "🍤", image: "/images/menu/appetizers/crispy-veggie-tempura.png",              tags: ["vegan"],        badge: "⭐ New", hidden: true },
    { name: "Fries",                           description: "Crispy golden fries",                                                            price: "Soon!",  emoji: "🍟", tags: ["vegan"],        comingSoon: true },
    { name: "Assorted Fries",                  description: "Mixed seasoned fries",                                                           price: "Soon!",  emoji: "🍟", tags: ["vegan"],        comingSoon: true },
    { name: "Onion Rings",                     description: "Crispy battered onion rings",                                                    price: "Soon!",  emoji: "🧅", tags: ["vegan"],        comingSoon: true },
    { name: "Shrimp Tempura",                  description: "Crispy shrimp tempura",                                                          price: "Soon!",  emoji: "🦐", tags: [],              comingSoon: true },
  ]},

  // ─── LUNCH SPECIAL ───────────────────────────────────────────────────────────
  { id: "lunch-special", label: "Lunch Special", emoji: "🌞", subtitle: "Mon – Sat · 11 AM – 3 PM · Pickup only", items: [
    { name: "K-Lunch Box (Doshirak) — Combo 1", description: "K-pop Chicken & Gimbap with Yam & Salad",                                      price: "$9.99",  emoji: "🍱", image: "/images/menu/lunch-special/klunch-box-combo1.jpg",                tags: [],              badge: "🌞 Lunch Deal" },
    { name: "K-Lunch Box (Doshirak) — Combo 2", description: "K-pop Chicken & Fried Rice with Chicken Dumplings & Salad",                    price: "$9.99",  emoji: "🍱", image: "/images/menu/lunch-special/klunch-box-combo2.jpg",                tags: [],              badge: "🌞 Lunch Deal" },
    { name: "K-Lunch Box (Doshirak) — Combo 3", description: "K-pop Chicken & Japchae Noodle with Yam & Salad",                              price: "$9.99",  emoji: "🍱", image: "/images/menu/lunch-special/klunch-box-combo3.jpg",                tags: [],              badge: "🌞 Lunch Deal" },
    { name: "Bibim Cupbap",                    description: "Beef bulgogi, carrot, cucumber & steamed rice tossed in sweet gochujang sauce — sesame seeds", price: "$9.99",  emoji: "🥣", image: "/images/menu/lunch-special/bibim-cupbap.jpg",                      tags: [],              badge: "🌞 Lunch Deal" },
    { name: "Dakgalbi Cupbap",                 description: "Spicy stir-fried chicken with rice cake, cabbage & green onion in gochujang sauce, over steamed rice", price: "$10.99", emoji: "🥣", image: "/images/menu/lunch-special/dakgalbi-cupbap.jpg",            tags: ["spicy"],       badge: "🌞 Lunch Deal" },
    { name: "K-Pop Chicken",                   description: "10–12 boneless pieces with sweet chilli sauce",                                   price: "$10.99", emoji: "🍗", image: "/images/menu/lunch-special/kpop-chicken-lunch.jpg",                tags: [],              badge: "🌞 Lunch Deal" },
    { name: "K.F.C Wings",                     description: "Crispy wings with sweet chilli sauce",                                            price: "$10.99", emoji: "🍗", image: "/images/menu/lunch-special/kfc-wings-lunch.jpg",                   tags: [],              badge: "🌞 Lunch Deal" },
    { name: "Spam Mayo Cupbap",                description: "Spam & mayo rice cup",                                                            price: "Soon!",  emoji: "🥣", tags: [],              comingSoon: true },
    { name: "Chicken Cupbap",                  description: "Chicken rice cup",                                                               price: "$9.99",  emoji: "🥣", tags: [],              badge: "🌞 Lunch Deal" },
    { name: "Veggie Lover Cupbap",             description: "Veggie rice cup",                                                                price: "Soon!",  emoji: "🥣", tags: ["vegan"],        comingSoon: true },
    { name: "Bulgogi Cupbap",                  description: "Bulgogi beef rice cup",                                                           price: "$9.99",  emoji: "🥣", tags: [],              badge: "🌞 Lunch Deal" },
    { name: "Crispy Chicken Cupbap",           description: "Crispy chicken rice cup",                                                        price: "Soon!",  emoji: "🥣", tags: [],              comingSoon: true },
    { name: "Tuna Mayo Cupbap",                description: "Tuna & mayo rice cup",                                                           price: "Soon!",  emoji: "🥣", tags: [],              comingSoon: true },
    { name: "Japchae Cupbap",                  description: "Japchae noodle rice cup",                                                        price: "Soon!",  emoji: "🥣", tags: ["vegan"],        comingSoon: true },
    // ─ Hidden ─
    { name: "K-Lunch Box — Combo 4",           description: "Bulgogi Bibimbap with sweet K-spicy gochujang sauce",                            price: "$9.99",  emoji: "🍱", image: "/images/menu/lunch-special/klunch-box-combo4.png",                tags: [],              badge: "🌞 Lunch Deal", hidden: true },
    { name: "K-Lunch Box — Combo 5 (Vegan)",   description: "Vegan Bibimbap with K-spicy gochujang sauce",                                    price: "$9.99",  emoji: "🍱", image: "/images/menu/lunch-special/klunch-box-combo5.png",                tags: ["vegan"],       badge: "🌞 Lunch Deal", hidden: true },
    { name: "K-Lunch Rice Bowl — Bulgogi",     description: "Bulgogi Bibimbap rice bowl",                                                     price: "$9.99",  emoji: "🥣", image: "/images/menu/lunch-special/klunch-bowl-bulgogi.png",               tags: [],              badge: "🌞 Lunch Deal", hidden: true },
    { name: "K-Lunch Rice Bowl — Vegan",       description: "Vegan Bibimbap rice bowl",                                                       price: "$9.99",  emoji: "🥣", image: "/images/menu/lunch-special/klunch-bowl-vegan.png",                 tags: ["vegan"],       badge: "🌞 Lunch Deal", hidden: true },
    { name: "K-Sweet Chilli Pork Deopbap",     description: "Jeyuk Bokkeum — sweet chilli pork over rice",                                   price: "$10.99", emoji: "🥣", image: "/images/menu/lunch-special/ksweet-pork-deopbap.png",               tags: [],              badge: "🌞 Lunch Deal", hidden: true },
  ]},

  // ─── PLATTERS ────────────────────────────────────────────────────────────────
  { id: "platters", label: "Platters", emoji: "🎊", subtitle: "Great for groups! Order 24 hrs in advance.", items: [
    // ─ Kimbap Platters ─
    { name: "Kimbap Platter — Small",          description: "5 rolls, your choice — freshly made. Serves 3–4. Extra cost on selected rolls.",    price: "$42.99",  emoji: "🌯", image: "/images/menu/platters/rnr-platter.jpg",         tags: [],             badge: "🍽️ Catering" },
    { name: "Kimbap Platter — Medium",         description: "10 rolls, your choice — freshly made. Serves 6–8. Extra cost on selected rolls.",   price: "$82.99",  emoji: "🌯", image: "/images/menu/platters/32pcs-platter.png",       tags: [],             badge: "🍽️ Catering" },
    { name: "Kimbap Platter — Large",          description: "15 rolls, your choice — freshly made. Serves 10–15. Extra cost on selected rolls.", price: "$121.99", emoji: "🌯", image: "/images/menu/platters/large-rolls-platter.jpg", tags: [],             badge: "🍽️ Catering" },
    // ─ Dumpling Platters ─
    { name: "Dumpling Platter — Small",        description: "25 pcs mixed dumplings (chicken & veggie). Serves 3–4.",  price: "$31.99",  emoji: "🥟", image: "/images/menu/appetizers/chicken-dumplings.jpg", tags: [],             badge: "🍽️ Catering" },
    { name: "Dumpling Platter — Medium",       description: "50 pcs mixed dumplings (chicken & veggie). Serves 6–8.",  price: "$62.99",  emoji: "🥟", image: "/images/menu/appetizers/chicken-dumplings.jpg", tags: [],             badge: "🍽️ Catering" },
    { name: "Dumpling Platter — Large",        description: "100 pcs mixed dumplings (chicken & veggie). Serves 10–15.", price: "$121.99", emoji: "🥟", image: "/images/menu/appetizers/chicken-dumplings.jpg", tags: [],            badge: "🍽️ Catering" },
    // ─ Chicken Platters ─
    { name: "Chicken Platter — Small",         description: "30 pcs K-Pop Chicken. Serves 3–4.",                       price: "$32.99",  emoji: "🍗", image: "/images/menu/signature/kpop-chicken-full.jpg",  tags: [],             badge: "🍽️ Catering" },
    { name: "Chicken Platter — Medium",        description: "60 pcs K-Pop Chicken. Serves 6–8.",                       price: "$63.99",  emoji: "🍗", image: "/images/menu/signature/kpop-chicken-full.jpg",  tags: [],             badge: "🍽️ Catering" },
    { name: "Chicken Platter — Large",         description: "100 pcs K-Pop Chicken. Serves 10–15.",                    price: "$102.99", emoji: "🍗", image: "/images/menu/signature/kpop-chicken-full.jpg",  tags: [],             badge: "🍽️ Catering" },
    // ─ Japchae Platters ─
    { name: "Japchae Platter — Half Tray",     description: "Glass noodles, carrot, peppers, mushroom. Serves ~2–3.",  price: "$31.99",  emoji: "🍜", image: "/images/menu/platters/mushroom-japchae.jpg",   tags: ["vegan","gf"], badge: "🍽️ Catering" },
    { name: "Japchae Platter — Full Tray",     description: "Glass noodles, carrot, peppers, mushroom. Serves ~5–6.",  price: "$62.99",  emoji: "🍜", image: "/images/menu/platters/mushroom-japchae.jpg",   tags: ["vegan","gf"], badge: "🍽️ Catering" },
    // ─ Party Packages ─
    { name: "Party Package — Small",           description: "For 10–15 people: Kimbap Platter S (5 rolls) + Dumpling Platter S (25 pcs) + Chicken Platter S (30 pcs)", price: "$107.97", emoji: "🎉", image: "/images/menu/platters/catering-pizza-box.png", tags: [], badge: "🎊 Party Deal" },
    { name: "Party Package — Medium",          description: "For 20–30 people: Kimbap Platter M (10 rolls) + Chicken Platter M (60 pcs) + Dumpling Platter M (50 pcs) + Japchae Half Tray", price: "$241.96", emoji: "🎉", image: "/images/menu/platters/catering-pizza-box.png", tags: [], badge: "🎊 Party Deal" },
    { name: "Party Package — Large",           description: "For 40–60 people: Kimbap Platter L (15 rolls) + Chicken Platter L (100 pcs) + Dumpling Platter L (100 pcs) + Japchae Full Tray", price: "$409.96", emoji: "🎉", image: "/images/menu/platters/catering-pizza-box.png", tags: [], badge: "🎊 Party Deal" },
    // ─ Hidden ─
    { name: "Rolls Platter",                   description: "Choice of 5 kinds of rolls — serves 3–4. Extra cost on selected rolls.", price: "$38.99", emoji: "🎊", image: "/images/menu/platters/rnr-platter.jpg",         tags: [], badge: "🍽️ Catering",    hidden: true },
    { name: "Large Rolls Platter",             description: "Choice of 7 kinds of rolls — serves 5–6. Extra cost on selected rolls.", price: "$53.99", emoji: "🎊", image: "/images/menu/platters/large-rolls-platter.jpg", tags: [], badge: "🍽️ Catering",    hidden: true },
    { name: "Vegan Platter",                   description: "38 pcs dairy & egg-free — serves 3–4",                                  price: "$42.99", emoji: "🌿", image: "/images/menu/platters/vegan-platter-med.jpg",   tags: ["vegan"],       hidden: true },
    { name: "Family Combo Set",                description: "K-pop chicken, KFC honey garlic (8 pcs), original gimbap, California roll, coleslaw, Crispy Tempura Mix", price: "$54.99", emoji: "🎉", image: "/images/menu/platters/family-combo-set.jpg", tags: [], badge: "👨‍👩‍👧 Family Deal", hidden: true },
    { name: "K-Chicken Party Box",             description: "Coming soon",                                                            price: "Soon!",  emoji: "🎉", tags: [], hidden: true },
    { name: "Roll Lovers Platter",             description: "Coming soon",                                                            price: "Soon!",  emoji: "🌯", tags: [], hidden: true },
    { name: "K-Family Combo A",                description: "KFC wings, K-pop chicken, gimbap (10 pcs), corn cheese, coleslaw, chips", price: "$45.99", emoji: "🎉", image: "/images/menu/platters/kfamily-combo-a.png",   tags: [], badge: "👨‍👩‍👧 Family Deal", hidden: true },
    { name: "K-Family Combo B (Veggie)",       description: "Japchae, vegan crispy tofu set, veggie dumplings (10 pcs), avo + yam rolls", price: "$48.99", emoji: "🎉", image: "/images/menu/platters/kfamily-combo-b.png", tags: ["vegan"], badge: "👨‍👩‍👧 Family Deal", hidden: true },
  ]},

  // ─── DINNER SPECIAL ──────────────────────────────────────────────────────────
  { id: "dinner-special", label: "Dinner Special", emoji: "🌙", subtitle: "3 set choices · $14.99 each", items: [
    { name: "Dinner Set A — Pork",             description: "Donkatsu, sweet chilli pork, chicken dumplings & rice",                          price: "$14.99", emoji: "🍱", image: "/images/menu/dinner-special/dinner-set-a.jpg",                    tags: [],              badge: "🌙 Dinner Deal" },
    { name: "Dinner Set B — Chicken",          description: "K-pop chicken, K-spicy chicken, chicken dumplings & rice",                       price: "$14.99", emoji: "🍱", image: "/images/menu/dinner-special/dinner-set-b.jpg",                    tags: [],              badge: "🌙 Dinner Deal" },
    { name: "Dinner Set C — Veggie",           description: "Crispy tofu, veggie dumplings, yam & sweet pumpkin tempura, rice",               price: "$14.99", emoji: "🍱", image: "/images/menu/dinner-special/dinner-set-c.jpg",                    tags: ["vegan"],       badge: "🌙 Dinner Deal" },
    { name: "K-BBQ Box Set",                   description: "Bulgogi, K-spicy Chicken, Rice, Fresh Veggies, K-Samjang Sauce",                price: "$29.99", emoji: "🥡", image: "/images/menu/dinner-special/kdinner-box.jpg",                         tags: [] },
  ]},

  // ─── BANCHAN ─────────────────────────────────────────────────────────────────
  { id: "banchan", label: "Banchan", emoji: "🥢", subtitle: "Korean side dishes — coming soon!", items: [
    { name: "Bulgogi",                         description: "Korean marinated beef banchan",                                                   price: "Soon!",  emoji: "🥩", tags: [],              comingSoon: true },
    { name: "Spicy Pork",                      description: "Korean spicy pork banchan",                                                      price: "Soon!",  emoji: "🐷", tags: ["spicy"],        comingSoon: true },
    { name: "Donkatsu",                        description: "Crispy pork cutlet banchan",                                                     price: "Soon!",  emoji: "🍱", tags: [],              comingSoon: true },
    { name: "Mackerel",                        description: "Grilled mackerel banchan",                                                       price: "Soon!",  emoji: "🐟", tags: ["gf"],           comingSoon: true },
    { name: "Dakgalbi",                        description: "K-spicy chicken banchan",                                                        price: "Soon!",  emoji: "🌶️", tags: ["spicy"],        comingSoon: true },
  ]},

];
