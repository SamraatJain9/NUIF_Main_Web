import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"

import Background from "@/assets/background_2.jpg"

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero image={Background} title="About Us" />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Us</h2>

            <div className="prose prose-lg max-w-none text-center">
              <p>
              NUIF is a pioneering initiative within Newcastle University Business School, offering students with hands-on experience in financial markets. Managed entirely by students, the fund focuses on equity research, ethical investing, and long-term portfolio growth. Bridging theory and practice, NUIF prepares students for careers in finance while elevating Newcastle University’s reputation among top UK universities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Impact</h2>
            <p className="text-lg md:text-xl mb-12 text-gray-700">
              The skills developed through NUIF have helped many of our alumni secure internships, placements, and
              graduate positions at top-tier financial institutions.
            </p>

            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">XXX+</div>
                <p className="text-gray-700">Statistic 1</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">£XXX+</div>
                <p className="text-gray-700">Statistic 2</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold mb-2 text-gray-900">XX%</div>
                <p className="text-gray-700">Statistic 3</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
