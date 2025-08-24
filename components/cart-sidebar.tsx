"use client"

import { useCart } from "@/contexts/cart-context"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { useState } from "react"
import "swiper/css"

export default function CartSidebar() {
  const { cart, cartTotal, isCartOpen, removeFromCart, toggleCart, showNotification } = useCart()
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  // ✅ Safe product icon handler
  const getProductIcon = (productName?: string) => {
    if (!productName) return "🎁"
    if (productName.includes("Photo")) return "📷"
    if (productName.includes("T-Shirt") || productName.includes("Shirt")) return "👕"
    if (productName.includes("Mug") || productName.includes("Coffee")) return "☕"
    if (productName.includes("Banner")) return "🏳️"
    if (productName.includes("Keychain")) return "🔑"
    if (productName.includes("Pillow")) return "🛏️"
    return "🎁"
  }

  // ✅ Checkout with UPI QR generation
  const proceedToCheckout = async () => {
    if (cart.length === 0) {
      showNotification("Your cart is empty!", "warning")
      return
    }

    try {
      const upiId = "7234944612@ptsbi"
      const amount = Number(cartTotal) || 0
      const upiString = `upi://pay?pa=${upiId}&am=${amount}&cu=INR&tn=Payment for Order`

      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        upiString
      )}`

      setQrCodeUrl(qrApiUrl)
      setShowQRCode(true)
    } catch (error) {
      showNotification("Error generating QR code", "warning")
    }
  }

  const closeQRModal = () => {
    setShowQRCode(false)
    setQrCodeUrl("")
  }


  function generateOrderNumber() {
    const now = new Date();
    const datePart = now.getFullYear().toString().slice(-2) + 
                    (now.getMonth() + 1).toString().padStart(2, '0') + 
                    now.getDate().toString().padStart(2, '0');
    const timePart = now.getHours().toString().padStart(2, '0') +
                    now.getMinutes().toString().padStart(2, '0') +
                    now.getSeconds().toString().padStart(2, '0');
    const randomPart = Math.floor(1000 + Math.random() * 9000);

    return "MHT" + datePart + timePart + randomPart;
  }

  const confirmPayment = () => {
  // const orderNumber = "MHT" + Date.now()
  const orderNumber = generateOrderNumber();
  showNotification(`Order placed successfully! Order Number: ${orderNumber}`, "success")
  setShowQRCode(false)
  toggleCart()

  // Open popup
  const popup = window.open("", "PaymentSuccess", "width=400,height=320")
  if (!popup) return

  // Clear existing document safely
  popup.document.body.innerHTML = ""

  // Create container
  const container = popup.document.createElement("div")
    container.style.cssText = `
      border: 2px solid green;
      border-radius: 10px;
      padding: 20px;
      background: #f0fff0;
      text-align: center;
      font-family: Arial, sans-serif;
    `

    // Title
    const title = popup.document.createElement("h2")
    title.textContent = "✅ Payment Successful"
    title.style.color = "green"

    // Message
    const msg = popup.document.createElement("p")
    msg.innerHTML = "Please take a <b>screenshot</b> of this payment<br/>Send it on WhatsApp to:"

    // WhatsApp link
    const link = popup.document.createElement("a")
    link.href = "https://wa.me/7234944612?text=Hello,%20I%20have%20completed%20the%20payment.%20Here%20is%20my%20screenshot."
    link.target = "_blank"
    link.textContent = "📱 7234944612 (Click to Open WhatsApp)"
    link.style.cssText = `
      display:inline-block;
      margin-top:12px;
      padding:10px 15px;
      background:#25D366;
      color:#fff;
      text-decoration:none;
      border-radius:8px;
      font-weight:bold;
    `

    // Append everything
    container.appendChild(title)
    container.appendChild(msg)
    container.appendChild(link)
    popup.document.body.appendChild(container)
  }

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleCart} />}
      {showQRCode && (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">UPI Payment</h3>
              <div className="mb-4">
                <img src={qrCodeUrl || "/placeholder.svg"} alt="UPI QR Code" className="mx-auto rounded-lg" />
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-2">Scan QR code to pay</p>
                <p className="text-lg font-bold text-blue-600">₹{cartTotal}</p>
                <p className="text-sm text-slate-500">UPI ID: 7234944612@ptsbi</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={closeQRModal}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPayment}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition-colors"
                >
                  Payment Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold">Shopping Cart</h3>
          <button onClick={toggleCart} className="text-slate-500 hover:text-slate-700 text-2xl">
            ×
          </button>
        </div>

        {/* ✅ Swiper Carousel */}
        <div className="p-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-slate-500">Your cart is empty</p>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
            >
              {cart.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="flex gap-4 p-4 border border-slate-200 rounded-xl">
                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                      {getProductIcon(item?.name)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{item?.name || "Unnamed Product"}</h4>
                      <div className="text-blue-600 font-bold">
                        ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* ✅ Checkout Button */}
        {cart.length > 0 && (
          <div className="p-6 bg-slate-50 border-t border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-blue-600">₹{cartTotal}</span>
            </div>
            <button
              onClick={proceedToCheckout}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Pay with UPI
            </button>
          </div>
        )}
      </div>
    </>
  )
}
