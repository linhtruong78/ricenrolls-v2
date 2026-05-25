export type DietaryTag = "vegan" | "gf" | "spicy";
export interface MenuItem { name: string; description: string; price: string; emoji: string; tags: DietaryTag[]; badge?: string; comingSoon?: boolean; }
export interface MenuCategory { id: string; label: string; emoji: string; subtitle?: string; items: MenuItem[]; }

export const menuCategories: MenuCategory[] = [
  { id: "appetizers", label: "Appetizers", emoji: "🥗", items: [
    { name: "Edamame", description: "Steamed salted edamame", price: "$7.99", emoji: "🫛", tags: ["vegan","gf"] },
    { name: "Crispy Tofu", description: "Lightly fried tofu with dipping sauce", price: "$8.99", emoji: "🟨", tags: ["vegan"] },
    { name: "Chicken Dumplings", description: "Pan-fried chicken dumplings", price: "$8.99", emoji: "🥟", tags: [] },
    { name: "Vegetable Dumplings", description: "Pan-fried vegetable dumplings", price: "$8.99", emoji: "🥟", tags: ["vegan"] },
  ]},
  { id: "gimbap", label: "Gimbap", emoji: "🌯", subtitle: "8–10 pcs · housemade sauces", items: [
    { name: "Original", description: "Carrot, crab meat, spam/ham, egg, cucumber, pickled daikon", price: "$9.99", emoji: "🌯", tags: [] },
    { name: "Vegan", description: "Carrot, cucumber, red cabbage, red sweet pepper, vegan spicy mayo", price: "$9.99", emoji: "🌯", tags: ["vegan"] },
    { name: "California Roll", description: "Avocado, cucumber, crab meat, carrot, Rice N Rolls spicy mayo", price: "$10.99", emoji: "🌯", tags: [] },
    { name: "Crispy Veggie Roll", description: "Crispy onion, carrot, red sweet pepper, yam, cucumber", price: "$10.99", emoji: "🌯", tags: ["vegan"] },
    { name: "Yam Avo Roll", description: "Crispy yam, red sweet pepper, avocado", price: "$10.99", emoji: "🌯", tags: ["vegan"] },
    { name: "K-Spicy Chicken", description: "K-spicy chicken, carrot, lettuce, cabbage", price: "$11.99", emoji: "🌯", tags: ["spicy"], badge: "🌶️ Spicy" },
    { name: "Beef Bulgogi", description: "Beef bulgogi, carrot, lettuce", price: "$11.99", emoji: "🌯", tags: [], badge: "⭐ Best Seller" },
    { name: "Crispy Chicken", description: "Crispy chicken tender, sweet red pepper, cucumber, teriyaki mayo", price: "$11.99", emoji: "🌯", tags: [] },
    { name: "Tuna", description: "Canned tuna, carrot, cucumber, lettuce, egg, chilli pepper, crab meat", price: "$11.99", emoji: "🌯", tags: [] },
    { name: "Yam (6 pcs)", description: "Crispy yam rolls", price: "$6.99", emoji: "🌯", tags: ["vegan"] },
    { name: "Avocado (6 pcs)", description: "Fresh avocado rolls", price: "$6.99", emoji: "🥑", tags: ["vegan"] },
    { name: "Fried Tofu Stuffed Rice (3 pcs)", description: "Rice, carrots, fried tofu (yubuchobap)", price: "$6.99", emoji: "🍱", tags: ["vegan"] },
  ]},
  { id: "bibimbap", label: "Bibimbap", emoji: "🍚", subtitle: "Korean rice bowl", items: [
    { name: "Beef Bulgogi Bibimbap", description: "Rice, carrots, cabbage, ground beef bulgogi — gochujang or sesame soya", price: "$15.99", emoji: "🍚", tags: [], badge: "❤️ Fan Fave" },
    { name: "Vegan Bibimbap", description: "Rice, carrots, seasonal herbs, cabbage, mushroom", price: "$15.99", emoji: "🍚", tags: ["vegan","gf"] },
  ]},
  { id: "fried-rice", label: "Fried Rice", emoji: "🍳", items: [
    { name: "Chicken Fried Rice", description: "Rice, peas, carrot, green bean, green onion, chicken", price: "$13.99", emoji: "🍳", tags: [] },
    { name: "Veggie Fried Rice", description: "Rice, peas, carrot, green bean, green onion, mushroom", price: "$13.99", emoji: "🍳", tags: ["vegan"] },
    { name: "Beef Fried Rice", description: "Rice, peas, carrot, green bean, green onion, beef", price: "$13.99", emoji: "🍳", tags: [] },
    { name: "Kimchi Fried Rice", description: "Rice, green onion, kimchi", price: "$13.99", emoji: "🍳", tags: ["spicy"] },
  ]},
  { id: "signature", label: "Signature", emoji: "⭐", subtitle: "House specialties", items: [
    { name: "K-Pop Chicken", description: "Crispy boneless chicken thigh — sweet & spicy K-pop or honey soya sauce, with pickles", price: "$25.99 / Half $13.99", emoji: "🍗", tags: ["spicy"], badge: "🔥 House Special" },
    { name: "K.F.C. Wings (6 pcs)", description: "Sweet & spicy K-pop sauce or mild soya honey", price: "$10.99", emoji: "🍗", tags: [] },
    { name: "K-Spicy Chicken Set", description: "Rice, chicken, rice cake with Korean spicy sauce, coleslaw", price: "$18.99", emoji: "🌶️", tags: ["spicy"] },
    { name: "K-Spicy Tofu Set", description: "Rice, tofu, rice cake with Korean spicy sauce, coleslaw", price: "$15.99", emoji: "🌶️", tags: ["vegan","spicy"] },
    { name: "L.A. Galbi Set", description: "Three strips Korean grilled beef short rib, rice, seasonal salad", price: "$27.99", emoji: "🥩", tags: [], badge: "💎 Premium" },
    { name: "Beef Bulgogi Set", description: "Thin sliced sweet soy beef, rice, coleslaw", price: "$18.99", emoji: "🥩", tags: [] },
    { name: "K-Spicy Pork Set", description: "Sliced pork with K-spicy sauce, onion, green onion, cabbage, rice", price: "$18.99", emoji: "🐷", tags: ["spicy"] },
    { name: "Japchae", description: "Glass noodles, carrot, peppers, mushroom — add chicken or bulgogi +$2", price: "$14.99", emoji: "🍜", tags: ["vegan","gf"], badge: "🌿 Vegan · GF" },
    { name: "Donkatsu", description: "Rice, crispy pork cutlet, coleslaw with house dressing", price: "$16.99", emoji: "🍱", tags: [] },
    { name: "Tofu-Katsu", description: "Rice, crispy tofu cutlet, coleslaw with house dressing", price: "$15.99", emoji: "🍱", tags: ["vegan"] },
    { name: "Tteokbokki", description: "Rice cake, fish cake with spicy & sweet gochujang sauce", price: "$13.99", emoji: "🍢", tags: ["spicy"] },
    { name: "Veggie Tteokbokki", description: "Vegetarian tteokbokki", price: "$12.99", emoji: "🍢", tags: ["vegan","spicy"] },
    { name: "K-Dinner Box Set", description: "Bulgogi or K-spicy chicken, rice, fresh veggies, K-samjang sauce", price: "$24.99", emoji: "🥡", tags: [] },
  ]},
  { id: "deopbap", label: "Deopbap", emoji: "🥣", subtitle: "Topped rice · $14.99 · includes miso soup", items: [
    { name: "K-Spicy Chicken Deopbap", description: "Chicken, onion, carrot, cabbage, lettuce, k-spicy sauce, sesame seeds", price: "$14.99", emoji: "🥣", tags: ["spicy"] },
    { name: "Mushroom with Tofu Deopbap", description: "Mushroom, tofu, onion, green onion, sesame seeds", price: "$14.99", emoji: "🥣", tags: ["vegan"] },
    { name: "Sweet Chilli Pork Deopbap", description: "Pork, carrot, onion, cabbage, sweet chilli sauce, sesame seeds", price: "$14.99", emoji: "🥣", tags: [] },
  ]},
  { id: "platters", label: "Platters", emoji: "🎊", subtitle: "Great for groups!", items: [
    { name: "Rice N Rolls Platter", description: "38 pcs — original, tuna, bulgogi gimbap + California roll — serves 3–4", price: "$42.99", emoji: "🎊", tags: [] },
    { name: "Vegan Platter (Medium)", description: "38 pcs dairy & egg-free — serves 3–4", price: "$42.99", emoji: "🌿", tags: ["vegan"] },
    { name: "Vegan Platter (Large)", description: "56 pcs dairy & egg-free — serves 5–6", price: "$69.99", emoji: "🌿", tags: ["vegan"] },
    { name: "K-Family Combo A", description: "KFC wings, K-pop chicken, gimbap (10 pcs), corn cheese, coleslaw, chips", price: "$45.99", emoji: "🎉", tags: [], badge: "👨‍👩‍👧 Family Deal" },
    { name: "K-Family Combo B (Veggie)", description: "Japchae, vegan crispy tofu set, veggie dumplings (10 pcs), avo + yam rolls", price: "$48.99", emoji: "🎉", tags: ["vegan"], badge: "👨‍👩‍👧 Family Deal" },
  ]},
  { id: "coming-soon", label: "Coming Soon", emoji: "🔜", items: [
    { name: "Kimchi Stew", description: "Traditional Korean kimchi jigae", price: "Soon!", emoji: "🍲", tags: [], comingSoon: true },
    { name: "Gamjatang", description: "Korean pork bone stew", price: "Soon!", emoji: "🍲", tags: [], comingSoon: true },
    { name: "Sundubu", description: "Korean soft tofu stew", price: "Soon!", emoji: "🍲", tags: ["vegan"], comingSoon: true },
  ]},
];
