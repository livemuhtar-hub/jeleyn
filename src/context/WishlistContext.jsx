import { createContext, useContext, useReducer } from 'react'

const WishlistContext = createContext()

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      const exists = state.items.find(item => item.id === action.payload.id)
      if (exists) {
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) }
      }
      return { ...state, items: [...state.items, action.payload] }
    case 'REMOVE':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) }
    default:
      return state
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE', payload: product })
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE', payload: id })
  const isInWishlist = (id) => state.items.some(item => item.id === id)

  return (
    <WishlistContext.Provider value={{
      wishlistItems: state.items,
      wishlistCount: state.items.length,
      toggleWishlist,
      removeFromWishlist,
      isInWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
