const reviews = [
  {
    id: 1,
    rating: 5,
    text: "Amazing quality prints! Got custom T-shirts for our team and everyone loved them. Fast delivery and excellent customer service.",
    author: "Priya Sharma",
  },
  {
    id: 2,
    rating: 5,
    text: "Perfect for election campaign materials! High-quality banners that stood out. MH Traders delivered exactly what we needed.",
    author: "Rajesh Kumar",
  },
  {
    id: 3,
    rating: 5,
    text: "Beautiful photo frames and collages! They turned our memories into stunning wall art. Highly recommended for personalized gifts.",
    author: "Anita Singh",
  },
]

export default function ReviewsSection() {
  return (
    <section className="py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Read testimonials from our satisfied customers</p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* Stars */}
              <div className="flex text-yellow-400 text-xl mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-600 italic mb-6 leading-relaxed">"{review.text}"</p>

              {/* Author */}
              <div className="font-semibold text-slate-800">- {review.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
