"use client"

import { useState } from "react"
import { FaWhatsapp } from "react-icons/fa"

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  const handleToggleChat = () => {
    setOpen(!open)
  }

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        onClick={handleToggleChat}
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl transition-all duration-300 hover:scale-110 z-40"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp />
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border z-50">
          <div className="bg-green-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span className="font-semibold">Chat with us on WhatsApp</span>
            <button onClick={handleToggleChat}>✖</button>
          </div>
          <div className="p-4 text-sm text-gray-700">
            <p>Hi 👋, how can we help you?</p>
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
              id="waMessage"
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                const message = (document.getElementById("waMessage") as HTMLInputElement).value
                const phoneNumber = "919335537142"
                const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
                window.open(url, "_blank")
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}
