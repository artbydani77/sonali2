import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <div className="text-8xl mb-6">🎆</div>
        <h1 className="font-display text-6xl font-bold text-white mb-4">
          404
        </h1>
        <p className="text-white/50 text-xl mb-2">Page not found</p>
        <p className="text-white/30 mb-8">Looks like this page went up in smoke!</p>
        <Link
          href="/"
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
