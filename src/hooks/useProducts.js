import { useState, useEffect } from 'react'
import { products as localProducts, categories as localCategories } from '../data/products'

const STORAGE_KEY = 'jeleyn_products'

function loadProducts() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.log('localStorage okuma hatası:', e.message)
  }
  return localProducts
}

function saveProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (e) {
    console.log('localStorage yazma hatası:', e.message)
  }
}

function getCategories(products) {
  const cats = ['all', ...new Set(products.map(p => p.category))]
  return cats.map(c => {
    if (c === 'all') return { id: 'all', name: 'Tümü', icon: 'grid' }
    const found = localCategories.find(lc => lc.id === c)
    return found || { id: c, name: c, icon: 'shirt' }
  })
}

export function useProducts() {
  const [products, setProducts] = useState(() => loadProducts())
  const [categories, setCategories] = useState(() => getCategories(loadProducts()))
  const [loading, setLoading] = useState(false)

  const refetch = () => {
    const data = loadProducts()
    setProducts(data)
    setCategories(getCategories(data))
  }

  return { products, categories, loading, refetch }
}

export async function getProductById(id) {
  const products = loadProducts()
  return products.find(p => p.id === parseInt(id)) || null
}

export async function addProduct(product) {
  const products = loadProducts()
  const maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0)
  const newProduct = { ...product, id: maxId + 1 }
  const updated = [...products, newProduct]
  saveProducts(updated)
  return newProduct
}

export async function updateProduct(id, updates) {
  const products = loadProducts()
  const updated = products.map(p => p.id === parseInt(id) ? { ...p, ...updates, id: parseInt(id) } : p)
  saveProducts(updated)
  return updated.find(p => p.id === parseInt(id))
}

export async function deleteProduct(id) {
  const products = loadProducts()
  const updated = products.filter(p => p.id !== parseInt(id))
  saveProducts(updated)
}

export async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
