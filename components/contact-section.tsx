"use client"

import React, { useState } from "react"
import emailjs from "@emailjs/browser"
import { useCart } from "@/contexts/cart-context"
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa"


export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const { showNotification } = useCart()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // ✅ Your Service ID
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // ✅ Your Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // ✅ Your Public Key
      )

      showNotification("✅ Thank you! Your message has been sent successfully.", "success")
      setFormData({ name: "", email: "", phone: "", service: "", message: "" })
    } catch (error) {
      console.error("EmailJS Error:", error)
      showNotification("❌ Failed to send message. Please try again later.", "error")
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Have questions or need a custom quote? We're here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Your Full Name"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Your Number"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="photo-printing">Photo Printing & Frames</option>
                  <option value="tshirt-printing">T-Shirt Printing</option>
                  <option value="mug-printing">Mug Printing</option>
                  <option value="banner-design">Banner & Poster Design</option>
                  <option value="keychain-printing">Keychain Printing</option>
                  <option value="pillow-printing">Pillow Printing</option>
                  <option value="custom-design">Custom Design</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us about your project requirements..."
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info (restored) */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-3xl text-white">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-blue-100">
                    LIG 27C, Subhash Nagar Colony, Surajkund
                    <br />
                    Gorakhnath, Gorakhpur Uttar Pradesh - 273015
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-blue-100">+91 7234944612</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-blue-100">mohdrock007@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">🕒</div>
                <div>
                  <h4 className="font-semibold mb-1">Business Hours</h4>
                  <p className="text-blue-100">Mon - Sun: 7:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/people/MH-Traders/pfbid0NvpnsdJ6mmge7GWz2Y4zn85Cev7UPqEUir9LPm1V68G8vv2TWBmm3szfsSmb4g6Fl/?rdid=NZR9IJCnFdyDiSEf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19jZhdANaK%2F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaFacebookF className="text-xl" />
                </a>

                <a
                  href="https://www.instagram.com/mhtraders_csp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaInstagram className="text-xl" />
                </a>

                <a
                  href="https://wa.me/917234944612"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaWhatsapp className="text-xl" />
                </a>

                <a
                  href="https://www.youtube.com/channel/UCwvhmE_aP6T4-SUbNN4G_Vg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaYoutube className="text-xl" />
                </a>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
