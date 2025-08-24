"use client"

import { useState, useEffect, useRef } from "react"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"

const products = [
  { id: 1, name: "Coffee Mug", price: 219, originalPrice: 299, discount: 27, image: "/images/cofee_mug.jpg", bg: "#FFF4E6" },
  { id: 2, name: "Photo Frame 6x8", price: 349, originalPrice: 499, discount: 30, image: "/images/cofee_mug.jpg", bg: "#E6F7FF" },
  { id: 3, name: "Custom T-Shirt", price: 499, originalPrice: 699, discount: 29, image: "/images/cofee_mug.jpg", bg: "#F9F0FF" },
  { id: 4, name: "Printed T-Shirt", price: 459, originalPrice: 599, discount: 23, image: "/images/cofee_mug.jpg", bg: "#E8FFE6" },
]

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(4)
  const { addToCart } = useCart()

  const carouselRef = useRef<HTMLDivElement>(null)

  // Responsive cards
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 576) setCardsPerView(1)
      else if (window.innerWidth < 768) setCardsPerView(2)
      else if (window.innerWidth < 992) setCardsPerView(3)
      else setCardsPerView(4)
    }
    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  // Auto-slide
  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [cardsPerView])

const intervalRef = useRef<number | null>(null)

const startAutoSlide = () => {
  stopAutoSlide()
  intervalRef.current = window.setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }, 3000)
}

const stopAutoSlide = () => {
  if (intervalRef.current !== null) {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }
}


  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % products.length)
  const goToSlide = (index: number) => setCurrentIndex(index % products.length)

  // Duplicate products for infinite effect
  const displayProducts = [...products, ...products]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Customer Favourites</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our customers can't get enough of these favourites. Don't miss out on the most-loved picks just for you.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden rounded-2xl mx-12">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out gap-4 p-2"
              style={{
                transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
                width: `${(displayProducts.length / cardsPerView) * 100}%`,
              }}
            >
              {displayProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex-shrink-0"
                  style={{ width: `${100 / displayProducts.length}%` }}
                >
                  {/* Image */}
                  <div className="h-40 flex items-center justify-center" style={{ backgroundColor: product.bg }}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={128}
                      height={128}
                      className="object-contain rounded-lg"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-slate-600 text-sm mb-3">Small description about this item.</p>
                    <div className="mb-4 text-sm">
                      <span className="text-slate-500">From </span>
                      <span className="text-slate-800 font-semibold">Rs. {product.price}</span>
                      <span className="text-slate-400 line-through ml-2">{product.originalPrice}</span>
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded ml-2 text-xs">
                        {product.discount}%
                      </span>
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => addToCart({ id: String(product.id), name: product.name, price: product.price })}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 mx-auto"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: products.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex % products.length ? "bg-slate-400 w-6" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
