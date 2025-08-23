"use client"

import { useState, useEffect } from "react"

export default function HeroSection() {
  const [counters, setCounters] = useState({ products: 0, delivery: 0, quality: 0 })

  useEffect(() => {
    const targets = { products: 500, delivery: 24, quality: 100 }
    const duration = 2000
    const steps = 60

    const increment = {
      products: targets.products / steps,
      delivery: targets.delivery / steps,
      quality: targets.quality / steps,
    }

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      setCounters({
        products: Math.min(Math.floor(increment.products * currentStep), targets.products),
        delivery: Math.min(Math.floor(increment.delivery * currentStep), targets.delivery),
        quality: Math.min(Math.floor(increment.quality * currentStep), targets.quality),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="pt-24 pb-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[75vh]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Rating Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-600 text-sm">Trusted by 1000+ customers</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Custom Printing
              <span className="block text-blue-600">Made Perfect</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0">
              From business cards to banners, we bring your ideas to life with premium quality printing services.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button
                onClick={scrollToProducts}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Explore Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={scrollToContact}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Contact Us
              </button>
            </div>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-blue-600">{counters.products}</h3>
                <p className="text-slate-600 text-sm">Products</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600">{counters.delivery}</h3>
                <p className="text-slate-600 text-sm">Quick Delivery</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-blue-600">{counters.quality}</h3>
                <p className="text-slate-600 text-sm">Quality</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="text-center">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <img src="/images/home_bg.jpeg" alt="Printing Services" className="w-full h-auto rounded-2xl" />
              </div>
              <div className="absolute -top-4 -right-4">
                <span className="bg-yellow-400 text-slate-800 px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                  Best Quality!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
