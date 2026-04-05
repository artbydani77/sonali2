import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4 bg-gradient-to-b from-red-50 to-cream">
      <div>
        <div className="text-9xl mb-4 animate-float-slow inline-block">🎆</div>
        <h1 className="font-display font-900 text-7xl text-ink mb-3">404</h1>
        <p className="font-display font-700 text-xl text-ink/60 mb-1">Page not found</p>
        <p className="text-ink/40 mb-8">Looks like this page went up in smoke! 💨</p>
        <Link href="/" className="btn btn-red inline-flex text-base px-8 py-4">
          Back to Home 🏠
        </Link>
      </div>
    </div>
  )
}
