import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl mb-4">🍱</div>
      <h1 className="font-heading text-6xl font-700 text-ink mb-2">404</h1>
      <h2 className="font-heading text-2xl font-600 text-ink mb-4">Page Not Found!</h2>
      <p className="font-body text-muted max-w-sm mb-8">Looks like this page went missing — like the last piece of gimbap at the table! 😅</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="comic-btn bg-o-500 hover:bg-o-600 text-white font-heading font-600 px-8 py-3.5 rounded-full transition-colors">Back to Home 🏠</Link>
        <Link href="/menu" className="comic-btn bg-y-500 hover:bg-y-400 text-ink font-heading font-600 px-8 py-3.5 rounded-full transition-colors">View Menu 🍽️</Link>
      </div>
    </div>
  );
}
