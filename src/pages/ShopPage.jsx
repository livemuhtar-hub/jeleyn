import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'

export default function ShopPage() {
  const { products, categories } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'new':
        result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [selectedCategory, sortBy, searchQuery, products])

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-gold-400 text-sm font-body tracking-widest uppercase">Koleksiyon</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-3">
              Tüm Ürünler
            </h1>
          </motion.div>
        </div>

        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-dark-900 border border-white/10 rounded-full text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-body text-sm transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gold-500 text-dark-950 font-semibold shadow-lg shadow-gold-500/20'
                  : 'glass-effect text-dark-300 hover:text-gold-400 hover:border-gold-500/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <p className="text-dark-400 text-sm font-body">
            <span className="text-gold-400 font-semibold">{filteredProducts.length}</span> ürün bulundu
          </p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-dark-500" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-dark-900 border border-white/10 text-white text-sm font-body rounded-lg px-3 py-2 focus:outline-none focus:border-gold-500/50"
            >
              <option value="featured">Öne Çıkanlar</option>
              <option value="new">En Yeniler</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="rating">En Yüksek Puan</option>
            </select>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-dark-500 font-body text-lg">Aramanızla eşleşen ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}
