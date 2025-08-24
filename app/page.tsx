"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CartSidebar from "@/components/cart-sidebar"
import HeroSection from "@/components/hero-section"
import ProductCarousel from "@/components/product-carousel"
import FeaturedProducts from "@/components/featured-products"
import ServicesSection from "@/components/services-section"
import ReviewsSection from "@/components/reviews-section"
import ContactSection from "@/components/contact-section"
import WhatsAppButton from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <main>
        <HeroSection />
        <ProductCarousel />
        <FeaturedProducts />
        <ServicesSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <CartSidebar />
      <WhatsAppButton />
    </div>
  )
}
