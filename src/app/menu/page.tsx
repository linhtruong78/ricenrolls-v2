import type { Metadata } from "next";
import { Suspense } from "react";
import MenuClient from "@/components/menu/MenuClient";
export const metadata: Metadata = { title: "Menu", description: "Browse our full menu of fresh gimbap, bibimbap, K-pop chicken and more. Vegan, GF & spicy options available." };
export default function MenuPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-y-500 border-b-2 border-ink pt-8 pb-10 px-4 text-center">
        <span className="sticker bg-white text-ink text-xs font-heading font-600 px-3 py-1 rounded-full inline-block mb-3 rotate-[-1deg]">What We Serve 🍽️</span>
        <h1 className="font-heading text-5xl font-700 text-ink">Our Menu</h1>
        <p className="font-body text-body/70 mt-2 max-w-md mx-auto">Fresh every day · Vegan, GF & spicy options across the board</p>
      </div>
      <div className="pt-4"><Suspense><MenuClient /></Suspense></div>
    </div>
  );
}
