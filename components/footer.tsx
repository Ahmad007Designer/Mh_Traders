"use client"

import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa"

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const showRefundPolicy = () => {
    alert(`Refund Policy:
1. Items can be returned within 7 days of delivery
2. Custom printed items are non-returnable unless defective
3. Refund processing takes 5-7 business days
4. Original packaging required for returns
5. Contact customer support for refund requests`)
  }

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">MH Traders</h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Your trusted partner for all custom printing and personalized product needs. Quality,
              creativity, and customer satisfaction are our top priorities.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/people/MH-Traders/pfbid0NvpnsdJ6mmge7GWz2Y4zn85Cev7UPqEUir9LPm1V68G8vv2TWBmm3szfsSmb4g6Fl/?rdid=NZR9IJCnFdyDiSEf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19jZhdANaK%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaFacebookF className="text-xl" />
              </a>

              <a
                href="https://www.instagram.com/mhtraders_csp/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-pink-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaInstagram className="text-xl" />
              </a>

              <a
                href="https://wa.me/917234944612"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaWhatsapp className="text-xl" />
              </a>

              <a
                href="https://www.youtube.com/channel/UCwvhmE_aP6T4-SUbNN4G_Vg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Photo Printing & Frames",
                "Custom T-Shirt Printing",
                "Mug Printing",
                "Banner & Poster Design",
                "Keychain Printing",
                "Pillow Printing",
              ].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollToSection("products")}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", id: "home" },
                { name: "Products", id: "products" },
                { name: "Services", id: "services" },
                { name: "Customize", id: "customize" },
                { name: "Contact", id: "contact" },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={showRefundPolicy}
                  className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4">Customer Support</h3>
            <ul className="space-y-2 text-slate-300">
              <li>Phone: +91 7234944612</li>
              <li>Email: mohdrock007@gmail.com</li>
              <li>WhatsApp: +91 7234944612</li>
              <li>
                <button
                  onClick={showRefundPolicy}
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-slate-400">
            &copy; 2025 MH Traders. All rights reserved | Designed with ❤️ by Ahmad Husain
          </p>
        </div>
      </div>
    </footer>
  )
}
