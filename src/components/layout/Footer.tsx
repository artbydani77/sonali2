import Link from 'next/link'
import { Sparkles, MapPin, Phone, Mail, Clock, Facebook, Instagram, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink text-white relative overflow-hidden">
      {/* Confetti dots */}
      <div className="absolute inset-0 opacity-5 confetti-bg pointer-events-none" />

      {/* Top wave */}
      <div className="relative h-12 overflow-hidden -mt-1">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full" fill="#1A1A2E">
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-party-red to-party-orange flex items-center justify-center shadow-party flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-brand text-2xl text-white">Sonali</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              West London&apos;s most loved party shop. Bringing joy, sparkle, and celebration to every occasion since 2008.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://www.facebook.com/SonaliOccasions/', icon: Facebook, color: 'bg-blue-600 hover:bg-blue-500' },
                { href: 'https://www.instagram.com/sonali_occasions/', icon: Instagram, color: 'bg-pink-600 hover:bg-pink-500' },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center transition-all duration-200 hover:scale-110`}
                >
                  <s.icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-800 text-sm tracking-widest uppercase text-white/60 mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/',                          label: 'Home' },
                { href: '/products',                  label: 'All Products' },
                { href: '/products?cat=fireworks',    label: 'Fireworks 🎆' },
                { href: '/products?cat=helium-balloons', label: 'Balloons 🎈' },
                { href: '/products?cat=ice-fountains', label: 'Ice Fountains ✨' },
                { href: '/about',                     label: 'About Us' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h3 className="font-display font-800 text-sm tracking-widest uppercase text-white/60 mb-5">More</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/products?cat=smoke-flares', label: 'Smoke Flares 💨' },
                { href: '/products?cat=perfumes',     label: 'Perfumes 🌸' },
                { href: '/products?cat=gifts',        label: 'Gifts & Cards 🎁' },
                { href: '/cart',                      label: 'My Cart' },
                { href: '/contact',                   label: 'Contact Us' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-800 text-sm tracking-widest uppercase text-white/60 mb-5">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-party-red flex-shrink-0 mt-0.5" />
                <span>28 Bilton Road, Perivale,<br />London, UB6 7DS</span>
              </li>
              <li className="flex gap-3 text-sm text-white/50">
                <Phone className="w-4 h-4 text-party-green flex-shrink-0 mt-0.5" />
                <div><div>+44 20 8998 6525</div><div>+44 7931 570672</div></div>
              </li>
              <li className="flex gap-3 text-sm text-white/50">
                <Mail className="w-4 h-4 text-party-blue flex-shrink-0 mt-0.5" />
                <span>sonalioccasions@gmail.com</span>
              </li>
              <li className="flex gap-3 text-sm text-white/50">
                <Clock className="w-4 h-4 text-party-orange flex-shrink-0 mt-0.5" />
                <div>
                  <div>Mon–Fri: 9am–6pm</div>
                  <div>Sat: 9am–3pm · Sun: 9:30am–5pm</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Sonali Occasions. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-party-red fill-party-red" /> for West London
          </p>
        </div>
      </div>
    </footer>
  )
}
