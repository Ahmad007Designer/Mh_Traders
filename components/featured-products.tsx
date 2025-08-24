"use client"

import { useState } from "react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"

const categories = [
  {
    id: "photo",
    name: "Photo Printing",
    icon: "🖼️", // ✅ Emoji icon for heading
    description: "High-quality prints with vibrant colors",
    bgColor: "#FFF4E6",
    products: [
      {
        id: 1,
        name: "Standard Photo Print",
        price: 1,
        image: "/images/6x8.jpg",
      },
      {
        id: 2,
        name: "Framed Collage",
        price: 299,
        image: "/images/collase.jpg",
      },
    ],
  },
  {
    id: "tshirt",
    name: "T-Shirt Printing",
    icon: "👕",
    description: "Custom designs on high-quality fabric",
    bgColor: "#E6F7FF",
    products: [
      {
        id: 3,
        name: "Custom White Tee",
        price: 299,
        image: "/images/tshirt.jpg",
      },
      {
        id: 4,
        name: "Logo T-Shirt",
        price: 349,
        image: "/images/tshirt-logo.jpg",
      },
    ],
  },
  {
    id: "mug",
    name: "Mug Printing",
    icon: "☕",
    description: "Personalized mugs perfect for gifts",
    bgColor: "#F9F0FF",
    products: [
      {
        id: 5,
        name: "Custom Coffee Mug",
        price: 199,
        image: "/images/mug.jpg",
      },
      {
        id: 6,
        name: "Couple Mugs Set",
        price: 349,
        image: "/images/mug-couple.jpg",
      },
    ],
  },
]

export default function CategoriesSection() {
  const { addToCart } = useCart()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id)
  }

  return (
    <section id="categories" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Categories</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Browse our product categories and customize your favorite items
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300"
            >
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-xl text-3xl"
                    style={{ backgroundColor: category.bgColor }}
                  >
                    {category.icon} {/* ✅ Emoji instead of image */}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{category.name}</h3>
                </div>
                <span className="text-slate-500">{openCategory === category.id ? "▲" : "▼"}</span>
              </button>

              {/* Products inside category */}
              {openCategory === category.id && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6">
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      className="p-6 bg-slate-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      {/* ✅ Product Image */}
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="rounded-lg object-cover mx-auto mb-4"
                      />

                      <h4 className="text-lg font-semibold text-slate-800 mb-2">{product.name}</h4>
                      <p className="text-blue-600 font-bold mb-4">₹{product.price}</p>
                      <button
                        onClick={() => addToCart({ id: String(product.id), name: product.name, price: product.price })}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
