import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Upload, Save, Package, Image as ImageIcon, Loader2, ChevronLeft } from 'lucide-react'
import { useProducts, addProduct, updateProduct, deleteProduct, uploadImage } from '../hooks/useProducts'

const emptyProduct = {
  name: '',
  category: 'günlük',
  price: 0,
  originalPrice: null,
  description: '',
  details: [],
  sizes: [],
  colors: [],
  images: [],
  featured: false,
  new: false,
  rating: 5.0,
  reviews: 0,
}

const categoryOptions = ['günlük', 'özel gün', 'modern']
const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

export default function AdminPage() {
  const { products, loading, refetch } = useProducts()
  const [view, setView] = useState('list')
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({ ...emptyProduct })
  const [detailInput, setDetailInput] = useState('')
  const [colorInput, setColorInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const ADMIN_PASSWORD = 'jeleyn2024'

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
    } else {
      alert('Yanlış şifre!')
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true)
    }
  }, [])

  const openNew = () => {
    setEditingProduct(null)
    setForm({ ...emptyProduct })
    setView('form')
    window.scrollTo(0, 0)
  }

  const openEdit = (product) => {
    setEditingProduct(product)
    setForm({
      name: product.name || '',
      category: product.category || 'günlük',
      price: product.price || 0,
      originalPrice: product.originalPrice || null,
      description: product.description || '',
      details: product.details || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
      images: product.images || [],
      featured: product.featured || false,
      new: product.new || false,
      rating: product.rating || 5.0,
      reviews: product.reviews || 0,
    })
    setView('form')
    window.scrollTo(0, 0)
  }

  const goBack = () => {
    setView('list')
    setEditingProduct(null)
    setForm({ ...emptyProduct })
    setDetailInput('')
    setColorInput('')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const toggleSize = (size) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }))
  }

  const addDetail = () => {
    if (detailInput.trim()) {
      setForm(prev => ({ ...prev, details: [...prev.details, detailInput.trim()] }))
      setDetailInput('')
    }
  }

  const removeDetail = (i) => {
    setForm(prev => ({ ...prev, details: prev.details.filter((_, idx) => idx !== i) }))
  }

  const addColor = () => {
    if (colorInput.trim()) {
      setForm(prev => ({ ...prev, colors: [...prev.colors, colorInput.trim()] }))
      setColorInput('')
    }
  }

  const removeColor = (i) => {
    setForm(prev => ({ ...prev, colors: prev.colors.filter((_, idx) => idx !== i) }))
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploading(true)
    try {
      const urls = []
      for (const file of files) {
        const url = await uploadImage(file)
        urls.push(url)
      }
      setForm(prev => ({ ...prev, images: [...prev.images, ...urls] }))
    } catch (err) {
      alert('Görsel yükleme hatası: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  const addImageUrl = () => {
    const url = prompt('Görsel URL girin:')
    if (url && url.trim()) {
      setForm(prev => ({ ...prev, images: [...prev.images, url.trim()] }))
    }
  }

  const removeImage = (i) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))
  }

  const handleSave = async () => {
    if (!form.name || !form.price || form.sizes.length === 0) {
      alert('Lütfen ürün adı, fiyat ve en az bir beden seçin.')
      return
    }

    setSaving(true)
    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        rating: parseFloat(form.rating),
        reviews: parseInt(form.reviews),
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
      } else {
        await addProduct(productData)
      }

      await refetch()
      alert('Ürün başarıyla kaydedildi!')
      goBack()
    } catch (err) {
      alert('Kaydetme hatası: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) return

    setDeleting(id)
    try {
      await deleteProduct(id)
      await refetch()
    } catch (err) {
      alert('Silme hatası: ' + err.message)
    } finally {
      setDeleting(null)
    }
  }

  if (!authenticated) {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-sm mx-auto px-4">
          <div className="p-8 rounded-2xl glass-effect text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-500/10 flex items-center justify-center">
              <Package className="w-8 h-8 text-gold-400" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">Admin Paneli</h1>
            <p className="text-dark-400 font-body text-sm mb-6">Devam etmek için şifre girin</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Şifre"
                className="w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors text-center"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all"
              >
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const inputClass = "w-full px-4 py-3 bg-dark-900 border border-white/10 rounded-xl text-white font-body text-sm focus:outline-none focus:border-gold-500/50 transition-colors placeholder:text-dark-600"

  if (view === 'form') {
    return (
      <div className="pt-44 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 text-dark-400 hover:text-gold-400 transition-colors font-body text-sm mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Ürün Listesine Dön
          </button>

          <h1 className="text-3xl font-display font-bold text-white mb-8">
            {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
          </h1>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="p-6 rounded-xl glass-effect space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-dark-400 text-xs font-body mb-1 block">Ürün Adı *</label>
                  <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Ürün adını girin" />
                </div>
                <div>
                  <label className="text-dark-400 text-xs font-body mb-1 block">Kategori</label>
                  <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                    {categoryOptions.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-dark-400 text-xs font-body mb-1 block">Fiyat (₺) *</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} className={inputClass} placeholder="0" />
                </div>
                <div>
                  <label className="text-dark-400 text-xs font-body mb-1 block">Eski Fiyat (₺) - İndirim varsa</label>
                  <input name="originalPrice" type="number" value={form.originalPrice || ''} onChange={handleChange} className={inputClass} placeholder="Boş bırakılabilir" />
                </div>
              </div>

              <div>
                <label className="text-dark-400 text-xs font-body mb-1 block">Açıklama</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} placeholder="Ürün açıklaması..." />
              </div>
            </div>

            {/* Sizes, Colors, Details */}
            <div className="p-6 rounded-xl glass-effect space-y-6">
              <div>
                <label className="text-dark-400 text-xs font-body mb-2 block">Bedenler *</label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-body transition-all ${
                        form.sizes.includes(size)
                          ? 'bg-gold-500 text-dark-950 font-semibold'
                          : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-dark-400 text-xs font-body mb-2 block">Renkler</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.colors.map((color, i) => (
                    <span key={i} className="flex items-center gap-1 px-3 py-1.5 bg-dark-800 rounded-full text-sm font-body text-white">
                      {color}
                      <button type="button" onClick={() => removeColor(i)} className="text-dark-500 hover:text-red-400 ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={colorInput}
                    onChange={e => setColorInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addColor())}
                    className={inputClass}
                    placeholder="Renk adı girin"
                  />
                  <button type="button" onClick={addColor} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-xl text-sm font-body transition-colors shrink-0">
                    Ekle
                  </button>
                </div>
              </div>

              <div>
                <label className="text-dark-400 text-xs font-body mb-2 block">Ürün Detayları</label>
                <div className="space-y-2 mb-2">
                  {form.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-dark-800 rounded-lg">
                      <span className="flex-1 text-white text-sm font-body">{detail}</span>
                      <button type="button" onClick={() => removeDetail(i)} className="text-dark-500 hover:text-red-400">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={detailInput}
                    onChange={e => setDetailInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addDetail())}
                    className={inputClass}
                    placeholder="Detay ekleyin"
                  />
                  <button type="button" onClick={addDetail} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded-xl text-sm font-body transition-colors shrink-0">
                    Ekle
                  </button>
                </div>
              </div>
            </div>

            {/* Images & Options */}
            <div className="p-6 rounded-xl glass-effect space-y-6">
              <div>
                <label className="text-dark-400 text-xs font-body mb-2 block">Görseller</label>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {form.images.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <label className={`flex-1 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-gold-500/30 transition-colors ${uploading ? 'opacity-50' : ''}`}>
                    {uploading ? (
                      <Loader2 className="w-5 h-5 text-gold-400 animate-spin" />
                    ) : (
                      <Upload className="w-5 h-5 text-dark-400" />
                    )}
                    <span className="text-dark-400 text-sm font-body">
                      {uploading ? 'Yükleniyor...' : 'Dosyadan Yükle'}
                    </span>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-white/10 rounded-xl hover:border-gold-500/30 transition-colors"
                  >
                    <ImageIcon className="w-5 h-5 text-dark-400" />
                    <span className="text-dark-400 text-sm font-body">URL Ekle</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-dark-400 text-xs font-body mb-2 block">Puan</label>
                  <input name="rating" type="number" step="0.1" min="0" max="5" value={form.rating} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="text-dark-400 text-xs font-body mb-2 block">Değerlendirme Sayısı</label>
                  <input name="reviews" type="number" min="0" value={form.reviews} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 rounded accent-yellow-500" />
                  <span className="text-white text-sm font-body">Öne Çıkan</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="new" checked={form.new} onChange={handleChange} className="w-4 h-4 rounded accent-green-500" />
                  <span className="text-white text-sm font-body">Yeni Ürün</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={goBack}
                className="flex-1 py-4 glass-effect hover:bg-white/10 text-white font-body font-medium rounded-full transition-all"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-[2] flex items-center justify-center gap-2 py-4 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/30 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-44 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">Ürün Yönetimi</h1>
            <p className="text-dark-400 font-body text-sm mt-1">{products.length} ürün mevcut</p>
          </div>
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-dark-950 font-body font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-gold-500/30"
          >
            <Plus className="w-5 h-5" />
            Yeni Ürün
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="rounded-xl glass-effect overflow-hidden group"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-dark-800 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-dark-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => openEdit(product)}
                      className="p-3 rounded-full bg-gold-500 text-dark-950 hover:bg-gold-400 transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                      className="p-3 rounded-full bg-red-600 text-white hover:bg-red-500 transition-colors"
                    >
                      {deleting === product.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                    </button>
                  </div>
                  {product.featured && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-gold-500 text-dark-950 text-xs font-body font-bold rounded-full">
                      Öne Çıkan
                    </span>
                  )}
                  {product.new && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-green-600 text-white text-xs font-body font-bold rounded-full">
                      Yeni
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-display font-semibold truncate">{product.name}</h3>
                  <p className="text-dark-400 text-xs font-body mt-1">{product.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-gold-400 font-body font-bold">{product.price?.toLocaleString('tr-TR')} ₺</span>
                    {product.originalPrice && (
                      <span className="text-dark-500 text-sm font-body line-through">{product.originalPrice?.toLocaleString('tr-TR')} ₺</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
