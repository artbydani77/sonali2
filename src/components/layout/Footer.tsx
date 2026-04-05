import Link from 'next/link'
import { Sparkles, MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#030208] border-t border-amber-500/10">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-gold-gradient">Sonali</div>
                <div className="text-[10px] tracking-[0.2em] text-amber-400/70 uppercase">Occasions</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              West London&apos;s premier destination for fireworks, party supplies, helium balloons, and memorable gifts for every occasion.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/SonaliOccasions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/sonali_occasions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-amber-400 hover:border-amber-400/40 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'Shop All' },
                { href: '/products?cat=fireworks', label: 'Fireworks' },
                { href: '/products?cat=helium-balloons', label: 'Helium Balloons' },
                { href: '/products?cat=ice-fountains', label: 'Ice Fountains' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-amber-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Categories</h3>
            <ul className="space-y-3">
              {[
                { href: '/products?cat=smoke-flares', label: 'Smoke Flares' },
                { href: '/products?cat=perfumes', label: 'Perfumes' },
                { href: '/products?cat=gifts', label: 'Gifts & Cards' },
                { href: '/cart', label: 'My Cart' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-amber-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-6">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>28 Bilton Road, Perivale,<br />London, UB6 7DS</span>
              </li>
              <li className="flex gap-3 text-sm text-white/50">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div>+44 20 8998 6525</div>
                  <div>+44 7931 570672</div>
                </div>
              </li>
              <li className="flex gap-3 text-sm text-white/50">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>sonalioccasions@gmail.com</span>
              </li>
              <li className="flex gap-3 text-sm text-white/50">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div>Mon–Fri: 9am–6pm</div>
                  <div>Saturday: 9am–3pm</div>
                  <div>Sunday: 9:30am–5pm</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Sonali Occasions. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Demo website — product info and prices are illustrative
          </p>
        </div>
      </div>
    </footer>
  )
}
