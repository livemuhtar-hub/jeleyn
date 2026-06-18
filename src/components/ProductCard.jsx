import { Link } from 'react-router-dom'
import { ShoppingBag, Star, Sparkles, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl bg-dark-900 gold-border hover:border-gold-400/50 transition-all duration-500">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
          </div>

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.new && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-500 text-dark-950 text-xs font-bold font-body rounded-full">
                <Sparkles className="w-3 h-3" /> YENİ
              </span>
            )}
            {discount && (
              <span className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs font-bold font-body rounded-full">
                %{discount} İNDİRİM
              </span>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-dark-600'}`}
                />
              ))}
              <span className="text-dark-400 text-xs ml-1 font-body">({product.reviews})</span>
            </div>
            <h3 className="text-white font-display text-lg font-semibold mb-1 group-hover:text-gold-400 transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-gold-400 font-body font-bold text-lg">
                {product.price.toLocaleString('tr-TR')} ₺
              </span>
              {product.originalPrice && (
                <span className="text-dark-500 font-body text-sm line-through">
                  {product.originalPrice.toLocaleString('tr-TR')} ₺
                </span>
              )}
            </div>
          </div>

          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
              className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${wishlisted ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-dark-900/80 backdrop-blur-sm text-white hover:bg-red-500 hover:shadow-red-500/30'}`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-dark-950 shadow-lg shadow-gold-500/30">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
