'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { products, categories } from '@/lib/data'
import ProductCard from '@/components/ui/ProductCard'

const catBtnActive: Record<string, string> = {
  all:              'bg-ink text-white',
  fireworks:        'bg-party-red text-white',
  'helium-balloons':'bg-party-pink text-white',
  'ice-fountains':  'bg-party-teal text-white',
  'smoke-flares':   'bg-party-purple text-white',
  perfumes:         'bg-party-orange text-white',
  gifts:            'bg-party-green text-white',
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const catParam = searchParams.get('cat')

  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery,    setSearchQuery]    = useState('')
  const [sortBy,         setSortBy]         = useState('featured')

  useEffect(() => { if (catParam) setActiveCategory(catParam) }, [catParam])

  const filtered = products
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .filter(p =>
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating')     return b.rating - a.rating
      return 0
    })

  const activeCat = categories.find(c => c.slug === activeCategory)

  return (
    <div className="min-h-screen pt-20 bg-cream">
      {/* Header */}
      <section className="relative py-16 overflow-hidden bg-gradient-to-b from-blue-50 to-cream">
        <div className="absolute top-4 right-8 text-6xl opacity-20 animate-float-slow select-none">🛍️</div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label bg-blue-100 text-party-blue inline-flex mb-5"
          >
            {activeCat ? activeCat.icon : '🛍️'} {activeCat ? activeCat.name : 'All Products'}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-900 text-5xl sm:text-6xl text-ink mb-3"
          >
            {activeCat
              ? <><span className="text-gradient-blue">{activeCat.name}</span></>
              : <>Our <span className="text-gradient-blue">Shop</span></>}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-ink/50 text-lg max-w-lg mx-auto"
          >
            {activeCat ? activeCat.description : 'Everything you need to make your celebration unforgettable'}
          </motion.p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b-2 border-gray-100 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Category pills */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full font-display font-700 text-sm transition-all duration-200 border-2 ${
                  activeCategory === 'all' ? catBtnActive.all + ' border-ink' : 'bg-white text-ink/60 border-gray-200 hover:border-gray-300'
                }`}
              >
                All 🎊
              </button>
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3 sm:px-4 py-2 rounded-full font-display font-700 text-sm transition-all duration-200 border-2 flex items-center gap-1.5 ${
                    activeCategory === cat.slug
                      ? (catBtnActive[cat.slug] || 'bg-ink text-white') + ' border-transparent'
                      : 'bg-white text-ink/60 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.name}</span>
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-52">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="input-field pl-9 py-2.5 text-sm rounded-full"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="input-field rounded-full py-2.5 text-sm w-auto px-4 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-ink/40 text-sm mb-6 font-medium">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div className="text-6xl mb-4 animate-float-slow">🔍</div>
                <h3 className="font-display font-800 text-2xl text-ink/50 mb-2">No products found</h3>
                <p className="text-ink/30">Try a different search or category</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
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
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-4xl animate-float-slow">🎉</div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
