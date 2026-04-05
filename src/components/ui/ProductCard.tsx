'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Check } from 'lucide-react'
import { Product } from '@/lib/data'
import { useCart } from '@/context/CartContext'

/* one accent per category for colour variety */
const categoryColors: Record<string, { border: string; badge: string; btn: string; tag: string }> = {
  fireworks:       { border: 'hover:border-party-red',    badge: 'bg-red-100 text-party-red',       btn: 'bg-party-red hover:bg-red-600',       tag: 'bg-red-50 text-party-red' },
  'helium-balloons':{ border: 'hover:border-party-pink',  badge: 'bg-pink-100 text-party-pink',     btn: 'bg-party-pink hover:bg-pink-600',     tag: 'bg-pink-50 text-party-pink' },
  'ice-fountains': { border: 'hover:border-party-teal',   badge: 'bg-teal-100 text-party-teal',     btn: 'bg-party-teal hover:bg-teal-600',     tag: 'bg-teal-50 text-party-teal' },
  'smoke-flares':  { border: 'hover:border-party-purple', badge: 'bg-purple-100 text-party-purple', btn: 'bg-party-purple hover:bg-purple-700', tag: 'bg-purple-50 text-party-purple' },
  perfumes:        { border: 'hover:border-party-orange', badge: 'bg-orange-100 text-party-orange', btn: 'bg-party-orange hover:bg-orange-600', tag: 'bg-orange-50 text-party-orange' },
  gifts:           { border: 'hover:border-party-green',  badge: 'bg-green-100 text-party-green',   btn: 'bg-party-green hover:bg-green-600',   tag: 'bg-green-50 text-party-green' },
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const theme = categoryColors[product.category] ?? categoryColors.fireworks

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`card border-2 border-gray-100 ${theme.border} overflow-hidden transition-all duration-250 bg-white`}
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Badges row */}
            <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
              {product.badge && (
                <span className={`badge ${theme.badge} shadow-sm`}>
                  {product.badge}
                </span>
              )}
              {product.originalPrice && !product.badge && (
                <span className="badge bg-party-red text-white shadow-party">SALE</span>
              )}
              {product.originalPrice && product.badge && (
                <span className="badge bg-party-red text-white shadow-party ml-auto">SALE</span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-4">
            {/* Category tag */}
            <span className={`inline-block text-[10px] font-display font-800 tracking-widest uppercase px-2 py-0.5 rounded-full mb-2 ${theme.tag}`}>
              {product.category.replace('-', ' ')}
            </span>

            <h3 className="font-display font-800 text-ink leading-snug mb-1 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-ink/50 text-xs leading-relaxed line-clamp-2 mb-3 font-body">
              {product.description}
            </p>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-party-yellow fill-party-yellow' : 'text-gray-200 fill-gray-200'}`} />
                ))}
              </div>
              <span className="text-ink/40 text-[11px] font-medium">({product.reviews})</span>
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="font-display font-900 text-xl text-ink">£{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-ink/30 text-sm line-through">£{product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.88 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-sm ${
                  added ? 'bg-party-green scale-110' : theme.btn
                }`}
              >
                {added
                  ? <Check className="w-4 h-4" />
                  : <ShoppingCart className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
