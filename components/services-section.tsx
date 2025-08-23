export default function ServicesSection() {
  const services = [
    {
      icon: "🎨",
      title: "Custom Design",
      description: "Our creative team helps you design unique and eye-catching prints tailored to your vision",
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Quick turnaround time with reliable delivery service across the region",
    },
    {
      icon: "🏆",
      title: "Premium Quality",
      description: "High-quality materials and advanced printing technology for lasting results",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      description: "Dedicated customer support to help you with orders and customizations",
    },
  ]

  return (
    <section id="services" className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Professional printing solutions for all your needs</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
