import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { products as localProducts, categories as localCategories } from '../data/products'

export function useProducts() {
  const [products, setProducts] = useState(localProducts)
  const [categories, setCategories] = useState(localCategories)
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })

      if (error) throw error

      if (data && data.length > 0) {
        setProducts(data)
        const cats = ['all', ...new Set(data.map(p => p.category))]
        setCategories(cats.map(c => {
          if (c === 'all') return { id: 'all', name: 'Tümü', icon: 'grid' }
          const found = localCategories.find(lc => lc.id === c)
          return found || { id: c, name: c, icon: 'shirt' }
        }))
      }
    } catch (err) {
      console.log('Supabase bağlantısı yok, yerel veriler kullanılıyor:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return { products, categories, loading, refetch: fetchProducts }
}

export async function getProductById(id) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  } catch {
    return localProducts.find(p => p.id === parseInt(id)) || null
  }
}

export async function addProduct(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) throw error
  return data?.[0] || data
}

export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data?.[0] || data
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function uploadImage(file) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
  const filePath = `products/${fileName}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
