import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useLang } from '../context/LanguageContext'
import ProductCard from '../components/ProductCard'

export default function WishlistPage() {
  const { t } = useLang()
  const { wishlistItems } = useWishlist()

  if (wishlistItems.length === 0) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-900 flex items-center justify-center">
            <Heart className="w-10 h-10 text-dark-600" />
          </div>
          <h2 className="text-2xl font-display text-white mb-3">{t.wishlist.empty}</h2>
          <p className="text-dark-400 font-body mb-8">{t.wishlist.emptyDesc}</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all">
            {t.wishlist.explore}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{t.wishlist.title}</h1>
          <p className="text-dark-400 font-body mb-10">{wishlistItems.length} {t.wishlist.items}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
