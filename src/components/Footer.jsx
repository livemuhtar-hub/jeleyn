import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, MapPin, MessageCircle, CreditCard, Banknote, Building2 } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-dark-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-1">
            <img src="/logo.svg" alt="JE'LEYN" className="h-20 w-auto object-contain mb-4 drop-shadow-[0_0_20px_rgba(201,168,76,0.35)]" />
            <p className="text-dark-400 text-sm leading-relaxed font-body">
              {t.footer.desc}
            </p>
          </div>

          <div>
            <h4 className="text-gold-400 font-display text-lg mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: t.nav.home },
                { to: '/shop', label: t.nav.collection },
                { to: '/about', label: t.nav.about },
                { to: '/cart', label: t.footer.myCart },
                { to: '/wishlist', label: t.footer.myFavorites },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-dark-400 hover:text-gold-400 transition-colors text-sm font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-display text-lg mb-4">{t.footer.info}</h4>
            <ul className="space-y-3">
              {[
                { to: '/size-guide', label: t.footer.sizeGuide },
                { to: '/faq', label: t.footer.faq },
                { to: '/return-policy', label: t.footer.returnPolicy },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-dark-400 hover:text-gold-400 transition-colors text-sm font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-display text-lg mb-4">{t.footer.categories}</h4>
            <ul className="space-y-3">
              {t.categories.map(cat => (
                <li key={cat}>
                  <Link to="/shop" className="text-dark-400 hover:text-gold-400 transition-colors text-sm font-body">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-400 font-display text-lg mb-4">{t.footer.contactTitle}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-dark-400 text-sm font-body">
                <Phone className="w-4 h-4 text-gold-500" />
                +90 536 932 14 74
              </li>
              <li className="flex items-center gap-2 text-dark-400 text-sm font-body">
                <Mail className="w-4 h-4 text-gold-500" />
                info@jeleyn.com.tr
              </li>
              <li className="flex items-center gap-2 text-dark-400 text-sm font-body">
                <MapPin className="w-4 h-4 text-gold-500" />
                İstanbul, Türkiye
              </li>
              <li className="flex items-center gap-3 mt-4">
                <a href="https://www.instagram.com/jeleynofficial" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-dark-950 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://wa.me/905369321474" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all">
                  <MessageCircle className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-sm font-body">
              &copy; {new Date().getFullYear()} JE'LEYN. {t.footer.rights}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-dark-600 text-xs font-body mr-1">{t.footer.paymentMethods}</span>
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-dark-400" />
                  <span className="text-dark-400 text-[10px] font-body">Visa</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-dark-400" />
                  <span className="text-dark-400 text-[10px] font-body">Mastercard</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-dark-400" />
                  <span className="text-dark-400 text-[10px] font-body">{t.footer.bankTransfer}</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 flex items-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5 text-dark-400" />
                  <span className="text-dark-400 text-[10px] font-body">{t.footer.cashOnDelivery}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
