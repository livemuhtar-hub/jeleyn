import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import AboutPage from './pages/AboutPage'
import SizeGuidePage from './pages/SizeGuidePage'
import FAQPage from './pages/FAQPage'
import ReturnPolicyPage from './pages/ReturnPolicyPage'
import NotFoundPage from './pages/NotFoundPage'
import OrderConfirmPage from './pages/OrderConfirmPage'
import WishlistPage from './pages/WishlistPage'
import AdminPage from './pages/AdminPage'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/order-confirmed" element={<OrderConfirmPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
