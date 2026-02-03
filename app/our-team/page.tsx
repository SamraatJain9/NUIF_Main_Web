"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"

// Import background image
import Background from "@/assets/background_4.jpg"

// Import team members images
import OscarPetersPhoto from "@/assets/people/OscarPeters.jpg"
import FernandoMendozaPhoto from "@/assets/people/FernandoMendoza.jpg"

import AlexanderTelpovPhoto from "@/assets/people/AlexanderTelpov.jpg"
import BenjaminMoorePhoto from "@/assets/people/BenjaminMoore.jpg"
import CharlesCreweReadPhoto from "@/assets/people/CharlesCrewe-Read.jpg"
import DenizErkovanPhoto from "@/assets/people/DenizErkovan.jpg"
import GeorgeChattertonPhoto from "@/assets/people/GeorgeChatterton.jpg"
import PhilipAndreewitchPhoto from "@/assets/people/PhilipAndréewitch.jpg"
import SamBundyPhoto from "@/assets/people/SamBundy.jpg"

// Team member types
type TeamMember = {
  id: string
  name: string
  title: string
  image: any
  link: string
}

// Team member data
const leadership: TeamMember[] = [
  {
    id: "oscar-peters",
    name: "Oscar Peters",
    title: "Founder & Fund Manager",
    image: OscarPetersPhoto,
    link: "https://www.linkedin.com/in/oscar-peters1/"
  },
  {
    id: "fernando-mendoza",
    name: "Fernando Mendoza",
    title: "Founder & Fund Manager",
    image: FernandoMendozaPhoto,
    link: "https://www.linkedin.com/in/fernando-e-mendoza-a83001200/"
  },
]

const headAnalysts: TeamMember[] = [
  {
    id: "benjamin-moore",
    name: "Benjamin Moore",
    title: "Financials | Team Atlas",
    image: BenjaminMoorePhoto,
    link: "https://uk.linkedin.com/in/benjamin-moore-46215b263"
  },
  {
    id: "alexander-telpov",
    name: "Alexander Telpov",
    title: "Financials | Team Mizar",
    image: AlexanderTelpovPhoto,
    link: "https://www.linkedin.com/in/a56109232"
  },
  {
    id: "george-chatterton",
    name: "George Chatterton",
    title: "Energy | Team Sirius",
    image: GeorgeChattertonPhoto,
    link: "https://www.linkedin.com/in/george-chatterton-784257262"
  },
  {
    id: "charles-crewe-read",
    name: "Charles Crewe-Read",
    title: "Energy | Team Canopus",
    image: CharlesCreweReadPhoto,
    link: "https://www.linkedin.com/in/charles-crewe-read-0174552a1"
  },
  {
    id: "sam-bundy",
    name: "Sam Bundy",
    title: "Industrials | Team Rigel",
    image: SamBundyPhoto,
    link: "https://www.linkedin.com/in/samuel-bundy-023592292"
  },
  {
    id: "deniz-erkovan",
    name: "Deniz Erkovan",
    title: "Technology | Team Polaris",
    image: DenizErkovanPhoto,
    link: "https://www.linkedin.com/in/d-erk"
  },
  {
    id: "philip-andreewitch",
    name: "Philip Andréewitch",
    title: " Consumer Staples | Team Vega",
    image: PhilipAndreewitchPhoto,
    link: "https://www.linkedin.com/in/philippandreewitch"
  },
]

// Current members by role
const analysts = [
  { name: "Adam Vigh-Vecsey", link: "https://www.linkedin.com/in/adam-vigh-vecsey-b6ab74295/" },
  { name: "Amaan Mughal", link: "https://www.linkedin.com/in/amaan-m-7289b831b/" },
  { name: "Amy Morrish", link: "https://www.linkedin.com/in/amy-morrish-8b7b60327/" },
  { name: "Aneesh Avvari", link: "https://www.linkedin.com/in/aneesh-avvari-4aa5b0299/" },
  { name: "Charlie Stevens", link: "https://www.linkedin.com/in/charlie-stevens-321712272/" },
  { name: "Elliot Monk", link: "https://www.linkedin.com/in/elliot-monk-25a159263/" },
  { name: "Emy Chen", link: "https://www.linkedin.com/in/emy-chen/" },
  { name: "Ethan Wood", link: "https://www.linkedin.com/in/ethan-wood-370b63360/" },
  { name: "Finlay Ritchie", link: "https://www.linkedin.com/in/finlay-ritchie-178356235/" },
  { name: "Henri Allen", link: "https://www.linkedin.com/in/henri-allen-773a652b1/" },
  { name: "Isaac Rodrigues", link: "https://www.linkedin.com/in/isaac-rodrigues-733604245/" },
  { name: "Jack Stevens", link: "https://www.linkedin.com/in/jackantonystevens/" },
  { name: "Jaime Allen", link: "https://www.linkedin.com/in/jaime-allen-056782339/" },
  { name: "Jamie Setch", link: "https://www.linkedin.com/in/jamie-setch/" },
  { name: "Josh Schofield", link: "https://www.linkedin.com/in/joshschofieldbaf/" },
  { name: "Louis Hart", link: "https://www.linkedin.com/in/louis-hart-6b1714311/" },
  { name: "Mannik Bhambhu", link: "https://www.linkedin.com/in/mannik-bhambhu/" },
  { name: "Marcus Tsang", link: "https://www.linkedin.com/in/medic001/" },
  { name: "Max Flanagan", link: "https://www.linkedin.com/in/max-flanagan-085772376/" },
]

const digitalInfrastructure = [
  { name: "Samraat Jain (Admin)", link: "https://www.linkedin.com/in/samraat-jain/" },
  { name: "James Delin", link: "https://www.linkedin.com/in/james-delin-89b737394/" },
]

const riskOfficers = [
  { name: "Amir Tsoy", link: "https://www.linkedin.com/in/wiryhook/" },
  { name: "Andrii Vorobiov", link: "https://www.linkedin.com/in/andrii-vorobiov-b3820b19a/" },
  { name: "Callum McGrath", link: "https://www.linkedin.com/in/callum-mcgrath-b62839316/" },
  { name: "Hrik Datta", link: "https://www.linkedin.com/in/hrik-datta/" },
  { name: "J.P. Dunphy", link: "https://www.linkedin.com/in/james-patrick-dunphy-b86246326/" },
  { name: "Marcus Tejero Mehmi", link: "https://www.linkedin.com/in/marcus-tm-466398304/" },
  { name: "Rhys Jones", link: "https://www.linkedin.com/in/rhys-jones-0400aa235/" },
  { name: "Theodore Kolawole", link: "https://www.linkedin.com/in/theodore-k-416036235/" },
  { name: "Abdulrahman Adetunbi", link: "https://www.linkedin.com/in/abdulrahman-adetunbi-05728827b/" },
]

const complianceOfficers = [
  { name: "Aishath Janna Jameel", link: "https://www.linkedin.com/in/aishath-janna-jameel/" },
  { name: "Ben Hobbs", link: "https://www.linkedin.com/in/ben-hobbs-024858203/" },
]

const welfareOfficers = [
  { name: "Audrey Mumtaz Aqila Fuad", link: "https://www.linkedin.com/in/audrey-mumtaz-aqila-fuad-6b0453215/" },
]

export default function Members() {
  const [activeSection, setActiveSection] = useState<"leadership" | "current" | "alumni">("leadership")

  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero 
        image={Background}
        title="Our Team" 
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4">
              <h2 className="text-2xl font-bold mb-6">Our Team</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection("leadership")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "leadership" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  LEADERSHIP
                </button>
                <button
                  onClick={() => setActiveSection("current")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "current" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  CURRENT MEMBERS
                </button>
                <button
                  onClick={() => setActiveSection("alumni")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "alumni" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  ALUMNI
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              {activeSection === "leadership" && (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 pb-4 border-b">Leadership</h2>
                  
                  <h3 className="text-2xl font-bold mb-8">Executive Committee</h3>
                  
                  {leadership.length > 0 ? (
                    <>
                      {/* Executive Committee grid (max 2 per row on md+) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {leadership.map((member) => (
                          <Link 
                            href={member.link} 
                            key={member.id}
                            className="group block text-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="mx-auto mb-4 relative w-48 h-48 overflow-hidden rounded-full grayscale hover:grayscale-0 transition-all duration-300">
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: "cover" }}
                                className="group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                              {member.title}
                            </h4>
                            <h3 className="text-lg font-semibold text-blue-900">
                              {member.name}
                            </h3>
                          </Link>
                        ))}
                      </div>
                      

                      {/* Head Analysts heading on its own line */}
                      <h3 className="text-2xl font-bold mt-12 mb-8">Head Analysts</h3>

                      {/* Head Analysts grid (max 2 per row on md+) */}
                      {headAnalysts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {headAnalysts.map((member) => (
                            <Link
                              href={member.link}
                              key={member.id}
                              className="group block text-center"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="mx-auto mb-4 relative w-48 h-48 overflow-hidden rounded-full grayscale hover:grayscale-0 transition-all duration-300">
                                <Image
                                  src={member.image}
                                  alt={member.name}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  style={{ objectFit: "cover" }}
                                  className="group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                                {member.title}
                              </h4>
                              <h3 className="text-lg font-semibold text-blue-900">
                                {member.name}
                              </h3>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <p className="text-lg text-gray-500">Head Analyst profiles are being updated.</p>
                          <p className="text-gray-500">Check back soon for more information about our team.</p>
                        </div>
                      )}         
                    </>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-lg text-gray-500">Leadership profiles are being updated.</p>
                      <p className="text-gray-500">Check back soon for more information about our team.</p>
                    </div>
                  )}
                </>
              )}

              {activeSection === "current" && (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 pb-4 border-b">Current Members</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left column: Analysts */}
                    <div>
                      <h3 className="text-2xl font-bold mb-8">Analysts:</h3>
                      <ul className="space-y-2 ml-6">
                        {analysts.map((analyst, index) => (
                          <li key={index}>
                            <Link 
                              href={analyst.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-700 hover:text-blue-900 hover:ml-2 transition-all duration-200 inline-block"
                            >
                              {analyst.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right column: Officers */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-8">Digital Infrastructure:</h3>
                        <ul className="space-y-2 ml-6">
                          {digitalInfrastructure.map((officer, index) => (
                            <li key={index}>
                              <Link 
                                href={officer.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-900 hover:ml-2 transition-all duration-200 inline-block"
                              >
                                {officer.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold mb-8">Risk Officers:</h3>
                        <ul className="space-y-2 ml-6">
                          {riskOfficers.map((officer, index) => (
                            <li key={index}>
                              <Link 
                                href={officer.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-900 hover:ml-2 transition-all duration-200 inline-block"
                              >
                                {officer.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold mb-8">Compliance Officers:</h3>
                        <ul className="space-y-2 ml-6">
                          {complianceOfficers.map((officer, index) => (
                            <li key={index}>
                              <Link 
                                href={officer.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-900 hover:ml-2 transition-all duration-200 inline-block"
                              >
                                {officer.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold mb-8">Welfare Officer:</h3>
                        <ul className="space-y-2 ml-6">
                          {welfareOfficers.map((officer, index) => (
                            <li key={index}>
                              <Link 
                                href={officer.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-900 hover:ml-2 transition-all duration-200 inline-block"
                              >
                                {officer.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "alumni" && (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 pb-4 border-b">Alumni</h2>
                  <div className="rounded-lg border border-solid border-gray-300 bg-gray-50 p-12 text-center">
                    <p className="text-xl font-semibold text-gray-600">Coming Soon</p>
                    
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}