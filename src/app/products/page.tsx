'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { products, categories } from '@/lib/data'
import ProductCard from '@/components/ui/ProductCard'

function ProductsContent() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat')

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    if (catParam) setActiveCategory(catParam)
  }, [catParam])

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p =>
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const activeCat = categories.find(c => c.slug === activeCategory)

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#1a0a30] via-[#0a0515] to-[#030208]" />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%, rgba(245,158,11,0.3) 0%, transparent 60%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-2 text-amber-400 text-sm font-medium mb-6"
          >
            {activeCat ? activeCat.icon : '🛍️'}&nbsp;
            {activeCat ? activeCat.name : 'All Products'}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-bold text-white mb-4"
          >
            {activeCat ? (
              <><span className="text-gold-gradient">{activeCat.name}</span></>
            ) : (
              <>Our <span className="text-gold-gradient">Shop</span></>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl mx-auto"
          >
            {activeCat ? activeCat.description : 'Everything you need to make your celebration unforgettable'}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 py-4 border-b border-white/5"
        style={{ background: 'rgba(3,2,8,0.95)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category pills */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white glow-gold'
                    : 'glass text-white/60 hover:text-white hover:border-amber-400/30'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    activeCategory === cat.slug
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white glow-gold'
                      : 'glass text-white/60 hover:text-white hover:border-amber-400/30'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full glass text-white/80 placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/40 border border-white/10 bg-transparent"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-full glass text-white/60 text-sm focus:outline-none border border-white/10 bg-[#0d0820] cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low–High</option>
                <option value="price-desc">Price: High–Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-white/40 text-sm">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display text-2xl font-semibold text-white/50 mb-2">No products found</h3>
                <p className="text-white/30">Try a different search or category</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center text-white/40">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
