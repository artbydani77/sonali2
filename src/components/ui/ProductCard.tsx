'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Check } from 'lucide-react'
import { Product } from '@/lib/data'
import { useCart } from '@/context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden glass border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)]">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030208] via-transparent to-transparent" />

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Sale badge */}
            {product.originalPrice && (
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 bg-rose-500 text-white text-xs font-bold rounded-full">
                  SALE
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-white/90 group-hover:text-amber-400 transition-colors duration-300 leading-snug mb-1">
              {product.name}
            </h3>
            <p className="text-white/40 text-xs leading-relaxed line-clamp-2 mb-3">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`}
                  />
                ))}
              </div>
              <span className="text-white/40 text-xs">({product.reviews})</span>
            </div>

            {/* Price + Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-amber-400 font-bold text-lg font-display">£{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-white/30 text-sm line-through">£{product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.92 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white'
                }`}
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
