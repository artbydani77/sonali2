'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Check, Star, ArrowLeft, Shield, Truck, RotateCcw, ChevronRight } from 'lucide-react'
import { products, categories } from '@/lib/data'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ui/ProductCard'

const catAccents: Record<string, { sectionBg: string; btn: string; badgeBg: string; badgeText: string }> = {
  fireworks:         { sectionBg: 'bg-red-50',    btn: 'bg-party-red hover:bg-red-600',       badgeBg: 'bg-red-100',    badgeText: 'text-party-red' },
  'helium-balloons': { sectionBg: 'bg-pink-50',   btn: 'bg-party-pink hover:bg-pink-600',     badgeBg: 'bg-pink-100',   badgeText: 'text-party-pink' },
  'ice-fountains':   { sectionBg: 'bg-teal-50',   btn: 'bg-party-teal hover:bg-teal-600',     badgeBg: 'bg-teal-100',   badgeText: 'text-party-teal' },
  'smoke-flares':    { sectionBg: 'bg-purple-50', btn: 'bg-party-purple hover:bg-purple-700', badgeBg: 'bg-purple-100', badgeText: 'text-party-purple' },
  perfumes:          { sectionBg: 'bg-orange-50', btn: 'bg-party-orange hover:bg-orange-600', badgeBg: 'bg-orange-100', badgeText: 'text-party-orange' },
  gifts:             { sectionBg: 'bg-green-50',  btn: 'bg-party-green hover:bg-green-600',   badgeBg: 'bg-green-100',  badgeText: 'text-party-green' },
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const { addItem, toggleCart } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  const category = categories.find(c => c.id === product.category)
  const related  = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const theme    = catAccents[product.category] ?? catAccents.fireworks

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={`min-h-screen pt-24 pb-20 ${theme.sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-ink/40 mb-8 font-medium"
        >
          <Link href="/" className="hover:text-party-red transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-party-red transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          {category && (
            <>
              <Link href={`/products?cat=${category.slug}`} className="hover:text-party-red transition-colors">
                {category.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-ink/60 truncate">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-card-hover border-2 border-gray-100">
              <Image src={product.image} alt={product.name} fill className="object-cover" priority />
              {product.badge && (
                <div className="absolute top-5 left-5">
                  <span className={`badge ${theme.badgeBg} ${theme.badgeText} shadow-sm`}>{product.badge}</span>
                </div>
              )}
              {product.originalPrice && (
                <div className="absolute top-5 right-5">
                  <span className="badge bg-party-red text-white">SAVE £{(product.originalPrice - product.price).toFixed(2)}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex flex-col">
            {category && (
              <Link href={`/products?cat=${category.slug}`}
                className={`inline-flex items-center gap-1.5 ${theme.badgeText} text-sm font-display font-800 mb-4 w-fit hover:underline`}
              >
                {category.icon} {category.name}
              </Link>
            )}

            <h1 className="font-display font-900 text-4xl sm:text-5xl text-ink leading-tight mb-4">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-party-yellow fill-party-yellow' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="font-display font-800 text-sm text-ink">{product.rating}</span>
              <span className="text-ink/40 text-sm">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display font-900 text-4xl text-ink">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-ink/30 text-xl line-through">£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-ink/65 leading-relaxed mb-7 text-[1.05rem]">{product.longDescription}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2.5 mb-7">
              {product.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-ink/65">
                  <div className={`w-5 h-5 rounded-full ${theme.badgeBg} flex items-center justify-center flex-shrink-0`}>
                    <Check className={`w-3 h-3 ${theme.badgeText}`} />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            {/* Qty + CTA */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center bg-white rounded-full border-2 border-gray-200 overflow-hidden shadow-sm">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-ink/50 hover:text-ink hover:bg-gray-50 transition-colors text-lg font-bold"
                >−</button>
                <span className="w-10 text-center font-display font-800 text-ink">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-ink/50 hover:text-ink hover:bg-gray-50 transition-colors text-lg font-bold"
                >+</button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 btn text-white text-base py-3.5 transition-colors ${
                  added ? 'bg-party-green' : theme.btn
                }`}
              >
                {added
                  ? <><Check className="w-5 h-5" /> Added!</>
                  : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
              </motion.button>
            </div>

            {added && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => { setAdded(false); toggleCart() }}
                className="w-full py-3 rounded-full bg-white border-2 border-gray-200 text-ink/60 text-sm font-display font-700 hover:bg-gray-50 transition-colors mb-4"
              >
                View Cart →
              </motion.button>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: 'Safe & Certified' },
                { icon: Truck,  label: 'In-store Collection' },
                { icon: RotateCcw, label: 'Easy Returns' },
              ].map(b => (
                <div key={b.label} className="bg-white rounded-2xl p-3 text-center border-2 border-gray-100 shadow-sm">
                  <b.icon className={`w-5 h-5 ${theme.badgeText} mx-auto mb-1`} />
                  <span className="text-ink/50 text-xs font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-900 text-3xl text-ink">
                More <span className={theme.badgeText}>{category?.name}</span>
              </h2>
              <Link href={`/products?cat=${category?.slug}`}
                className={`flex items-center gap-1.5 ${theme.badgeText} font-display font-800 text-sm hover:underline`}
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
