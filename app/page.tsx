import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Link from "next/link"

import Background from "@/assets/background_1.jpg"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero
        image={Background}
        title="Newcastle University Investment Fund"
        subtitle="Developing future finance professionals through hands-on investment experience"
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Shaping Tomorrow's Financial Leaders</h2>
            <p className="text-lg md:text-xl mb-12 text-gray-700">
              The Newcastle University student-led Investment Fund (NUIF) created in 2025, provides students with real-world experience
              in equity research and long-term investing. Our analysts develop valuable skills that prepare them for
              competitive roles in the financial services industry.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link
                href="/about"
                className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
              >
                Learn More
              </Link>
              <Link
                href="/our-team"
                className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
{/* 
      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6">Fund Performance</h2>
            <p className="text-3xl md:text-4xl font-bold mb-8">This will be updated on a monthly basis</p>
          </div>
        </div>
      </section> */}

      <Footer />
    </main>
  )
}
