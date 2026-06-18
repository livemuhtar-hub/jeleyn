import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useLang } from '../context/LanguageContext'
import { useProducts } from '../hooks/useProducts'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)
  const { cartCount } = useCart()
  const { t } = useLang()
  const { products } = useProducts()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
    setSearchQuery('')
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      setSearchResults(products.filter(p => p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q)).slice(0, 5))
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/shop', label: t.nav.collection },
    { to: '/about', label: t.nav.about },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-dark-950/95 backdrop-blur-md shadow-lg shadow-black/20 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img
              src="/jk-logo.svg"
              alt="JE'LEYN"
              className="h-20 sm:h-28 w-auto object-contain drop-shadow-[0_0_25px_rgba(201,168,76,0.45)] group-hover:drop-shadow-[0_0_40px_rgba(201,168,76,0.65)] transition-all duration-500"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-body text-sm tracking-wide transition-colors duration-300 hover:text-gold-400 ${
                  location.pathname === link.to ? 'text-gold-400' : 'text-dark-200'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold-400" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-dark-200 hover:text-gold-400 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 bg-dark-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="p-3">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.nav.search}
                      autoFocus
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white font-body text-sm placeholder:text-dark-500 focus:outline-none focus:border-gold-500/40"
                    />
                  </div>
                  {searchResults.length > 0 && (
                    <div className="border-t border-white/5 max-h-64 overflow-y-auto">
                      {searchResults.map(product => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                        >
                          <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-body truncate">{product.name}</p>
                            <p className="text-gold-400 text-xs font-body">{product.price.toLocaleString('tr-TR')} ₺</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="p-4 text-center text-dark-500 font-body text-sm border-t border-white/5">
                      {t.nav.noResults}
                    </div>
                  )}
                </div>
              )}
            </div>

            <LanguageSwitcher />

            <Link to="/wishlist" className="relative group hidden sm:block">
              <Heart className="w-5 h-5 text-dark-200 group-hover:text-gold-400 transition-colors" />
            </Link>

            <Link to="/cart" className="relative group">
              <ShoppingBag className="w-5 h-5 text-dark-200 group-hover:text-gold-400 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold-500 text-dark-950 text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-dark-200 hover:text-gold-400 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark-950/98 backdrop-blur-lg border-t border-white/5 mt-3">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block text-lg font-body tracking-wide transition-colors ${
                  location.pathname === link.to ? 'text-gold-400' : 'text-dark-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
