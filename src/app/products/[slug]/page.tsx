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

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug)
  if (!product) notFound()

  const { addItem, toggleCart } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  const category = categories.find(c => c.id === product.category)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-white/40 mb-8"
        >
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/products" className="hover:text-amber-400 transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          {category && (
            <>
              <Link href={`/products?cat=${category.slug}`} className="hover:text-amber-400 transition-colors">
                {category.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-white/60 truncate">{product.name}</span>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <Image src={product.image} alt={product.name} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030208]/50 via-transparent to-transparent" />
              {product.badge && (
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-bold rounded-full glow-gold">
                    {product.badge}
                  </span>
                </div>
              )}
              {product.originalPrice && (
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1.5 bg-rose-500 text-white text-sm font-bold rounded-full">
                    SALE — Save £{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {category && (
              <Link
                href={`/products?cat=${category.slug}`}
                className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-medium mb-4 hover:text-amber-300 transition-colors w-fit"
              >
                <span>{category.icon}</span>
                {category.name}
              </Link>
            )}

            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                ))}
              </div>
              <span className="text-amber-400 font-semibold">{product.rating}</span>
              <span className="text-white/40 text-sm">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-display text-4xl font-bold text-amber-400">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-white/30 text-xl line-through">£{product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/60 leading-relaxed mb-8 text-lg">
              {product.longDescription}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {product.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-amber-400" />
                  </div>
                  {f}
                </div>
              ))}
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center glass rounded-full border border-white/10">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white transition-colors text-lg"
                >−</button>
                <span className="w-10 text-center font-semibold text-white">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white transition-colors text-lg"
                >+</button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.96 }}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-bold text-white transition-all duration-300 ${
                  added
                    ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 glow-gold hover:shadow-[0_0_40px_rgba(245,158,11,0.7)]'
                }`}
              >
                {added ? (
                  <><Check className="w-5 h-5" /> Added to Cart!</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                )}
              </motion.button>
            </div>

            {added && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => { setAdded(false); toggleCart() }}
                className="w-full py-3 glass text-white/70 rounded-full text-sm font-medium hover:text-white transition-colors mb-4"
              >
                View Cart →
              </motion.button>
            )}

            {/* Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: 'Safe & Certified' },
                { icon: Truck, label: 'In-store Collection' },
                { icon: RotateCcw, label: 'Easy Returns' },
              ].map(b => (
                <div key={b.label} className="glass rounded-xl p-3 text-center border border-white/5">
                  <b.icon className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="text-white/50 text-xs">{b.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-display text-3xl font-bold text-white">
                More from <span className="text-gold-gradient">{category?.name}</span>
              </h2>
              <Link href={`/products?cat=${category?.slug}`} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
