import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ChevronLeft, Building2, Copy, CheckCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'

const WHATSAPP_NUMBER = '905369321474'

const bankInfo = {
  bankName: 'Ziraat Bankası',
  accountHolder: "JE'LEYN TEKSTİL",
  iban: 'TR00 0000 0000 0000 0000 0000 00',
}

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [ibanCopied, setIbanCopied] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', district: '', zipCode: '',
    note: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const buildWhatsAppMessage = (orderNo) => {
    const itemsList = items.map(item =>
      `• ${item.name} (Beden: ${item.size}) x${item.quantity} — ${(item.price * item.quantity).toLocaleString('tr-TR')} ₺`
    ).join('\n')

    return encodeURIComponent(
`🛍️ *YENİ SİPARİŞ — JE'LEYN*
━━━━━━━━━━━━━━━━━━
📋 *Sipariş No:* #${orderNo}

👤 *Müşteri Bilgileri:*
Ad Soyad: ${form.firstName} ${form.lastName}
Telefon: ${form.phone}
E-posta: ${form.email}

📍 *Teslimat Adresi:*
${form.address}
${form.district}, ${form.city} ${form.zipCode}

📦 *Ürünler:*
${itemsList}

💰 *Toplam:* ${cartTotal.toLocaleString('tr-TR')} ₺
💳 *Ödeme:* 🏦 Havale/EFT
${form.note ? `\n📝 *Not:* ${form.note}` : ''}
━━━━━━━━━━━━━━━━━━`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      const orderNo = `JLN-${Date.now().toString().slice(-6)}`
      const msg = buildWhatsAppMessage(orderNo)
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
      window.open(whatsappUrl, '_blank')
      clearCart()
      navigate('/order-confirmed')
    }
  }

  const copyIban = () => {
    navigator.clipboard.writeText(bankInfo.iban.replace(/\s/g, ''))
    setIbanCopied(true)
    setTimeout(() => setIbanCopied(false), 2000)
  }

  if (items.length === 0) {
    navigate('/shop')
    return null
  }

  const inputClass = "w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-dark-600"

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-400 transition-colors font-body text-sm mb-8">
          <ChevronLeft className="w-4 h-4" />
          Sepete Dön
        </Link>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-10">Ödeme</h1>

        <div className="flex items-center gap-4 mb-10">
          {['Teslimat Bilgileri', 'Ödeme Yöntemi'].map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-bold ${
                step > i + 1 ? 'bg-green-600 text-white' :
                step === i + 1 ? 'bg-gold-500 text-dark-950' : 'bg-dark-800 text-dark-500'
              }`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm font-body ${step === i + 1 ? 'text-gold-400' : 'text-dark-500'}`}>
                {label}
              </span>
              {i === 0 && <div className="w-12 h-[1px] bg-dark-700" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="p-6 rounded-xl glass-effect">
                    <h3 className="text-white font-display text-lg mb-6">Kişisel Bilgiler</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-dark-400 text-xs font-body mb-1 block">Ad</label>
                        <input name="firstName" value={form.firstName} onChange={handleChange} required className={inputClass} placeholder="Adınız" />
                      </div>
                      <div>
                        <label className="text-dark-400 text-xs font-body mb-1 block">Soyad</label>
                        <input name="lastName" value={form.lastName} onChange={handleChange} required className={inputClass} placeholder="Soyadınız" />
                      </div>
                      <div>
                        <label className="text-dark-400 text-xs font-body mb-1 block">E-posta</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="ornek@email.com" />
                      </div>
                      <div>
                        <label className="text-dark-400 text-xs font-body mb-1 block">Telefon</label>
                        <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} placeholder="05XX XXX XX XX" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl glass-effect">
                    <h3 className="text-white font-display text-lg mb-6">Teslimat Adresi</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-dark-400 text-xs font-body mb-1 block">Adres</label>
                        <textarea name="address" value={form.address} onChange={handleChange} required rows={3} className={`${inputClass} resize-none`} placeholder="Açık adresiniz" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-dark-400 text-xs font-body mb-1 block">İl</label>
                          <input name="city" value={form.city} onChange={handleChange} required className={inputClass} placeholder="İstanbul" />
                        </div>
                        <div>
                          <label className="text-dark-400 text-xs font-body mb-1 block">İlçe</label>
                          <input name="district" value={form.district} onChange={handleChange} required className={inputClass} placeholder="Kadıköy" />
                        </div>
                        <div>
                          <label className="text-dark-400 text-xs font-body mb-1 block">Posta Kodu</label>
                          <input name="zipCode" value={form.zipCode} onChange={handleChange} required className={inputClass} placeholder="34000" />
                        </div>
                      </div>
                      <div>
                        <label className="text-dark-400 text-xs font-body mb-1 block">Sipariş Notu (Opsiyonel)</label>
                        <textarea name="note" value={form.note} onChange={handleChange} rows={2} className={`${inputClass} resize-none`} placeholder="Varsa eklemek istediğiniz not..." />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/30 text-lg">
                    Ödeme Yöntemine Geç
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="p-6 rounded-xl glass-effect">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-display text-lg">Havale / EFT ile Ödeme</h3>
                        <p className="text-dark-500 text-xs font-body">Aşağıdaki hesaba havale yaparak ödemenizi tamamlayın</p>
                      </div>
                    </div>

                    <div className="space-y-3 p-5 rounded-xl border border-gold-500/20 bg-gold-500/5">
                      <div className="flex justify-between items-center">
                        <span className="text-dark-400 text-sm font-body">Banka</span>
                        <span className="text-white text-sm font-body font-semibold">{bankInfo.bankName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-dark-400 text-sm font-body">Hesap Sahibi</span>
                        <span className="text-white text-sm font-body font-semibold">{bankInfo.accountHolder}</span>
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <span className="text-dark-400 text-sm font-body">IBAN</span>
                        <div className="flex items-center gap-2">
                          <span className="text-gold-400 text-sm font-mono font-semibold">{bankInfo.iban}</span>
                          <button type="button" onClick={copyIban} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                            {ibanCopied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-dark-400" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 glass-effect hover:bg-white/10 text-white font-body font-medium rounded-full transition-all">
                      Geri
                    </button>
                    <button type="submit" className="flex-[2] py-4 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all text-lg hover:shadow-lg hover:shadow-gold-500/30">
                      Siparişi Onayla
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-xl glass-effect">
              <h3 className="text-white font-display text-lg mb-4">Sipariş Özeti</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-body truncate">{item.name}</p>
                      <p className="text-dark-500 text-xs font-body">{item.size} &middot; x{item.quantity}</p>
                      <p className="text-gold-400 text-sm font-body font-semibold">
                        {(item.price * item.quantity).toLocaleString('tr-TR')} ₺
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-dark-400">Ara Toplam</span>
                  <span className="text-white">{cartTotal.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-dark-400">Kargo</span>
                  <span className="text-green-400">Ücretsiz</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between">
                  <span className="text-white font-body font-semibold">Toplam</span>
                  <span className="text-gold-400 font-body font-bold text-xl">
                    {cartTotal.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
