"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  cartTotal: number
  isCartOpen: boolean
  addToCart: (name: string, price: number) => void
  removeFromCart: (id: number) => void
  toggleCart: () => void
  showNotification: (message: string, type?: "success" | "warning" | "info" | "error") => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setCartTotal(total)
  }, [cart])

  const addToCart = (productName: string, price: number) => {
    const existingItem = cart.find((item) => item.name === productName)

    if (existingItem) {
      setCart(cart.map((item) => (item.name === productName ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([
        ...cart,
        {
          id: Date.now(),
          name: productName,
          price: price,
          quantity: 1,
        },
      ])
    }

    showNotification(`${productName} added to cart!`, "success")
  }

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter((item) => item.id !== itemId))
    showNotification("Item removed from cart", "info")
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const showNotification = (message: string, type: "success" | "warning" | "info" | "error" = "info") => {
    const notification = document.createElement("div")
    const colors = {
      success: "#27ae60",
      warning: "#f39c12",
      info: "#3498db",
      error: "#e74c3c",
    }

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colors[type]};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      z-index: 4000;
      transition: all 0.3s ease;
      max-width: 300px;
    `

    const iconMap = {
      success: "check",
      warning: "exclamation",
      error: "times",
      info: "info",
    }

    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <i class="fas fa-${iconMap[type]}-circle"></i>
        ${message}
      </div>
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.opacity = "0"
      notification.style.transform = "translateX(100%)"
      setTimeout(() => document.body.removeChild(notification), 300)
    }, 4000)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        isCartOpen,
        addToCart,
        removeFromCart,
        toggleCart,
        showNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
