"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import { teamPageContent } from "@/data/our-team"

export default function Members() {
  const [activeSection, setActiveSection] = useState<"leadership" | "current" | "alumni">("leadership")

  const {
    hero,
    nav,
    headings,
    fallbacks,
    alumniYear,
    members: {
      leadership,
      headAnalysts,
      alumniFounders,
      exHeadAnalysts,
      analysts,
      digitalInfrastructure,
      riskOfficers,
      complianceOfficers,
      welfareOfficers,
    },
  } = teamPageContent

  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero 
        image={hero.image}
        title={hero.title} 
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4">
              <h2 className="text-2xl font-bold mb-6">{nav.heading}</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection("leadership")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "leadership" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {nav.leadership}
                </button>
                <button
                  onClick={() => setActiveSection("current")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "current" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {nav.current}
                </button>
                <button
                  onClick={() => setActiveSection("alumni")}
                  className={`block w-full text-left py-2 px-4 rounded-md transition-colors ${
                    activeSection === "alumni" 
                      ? "bg-gray-900 text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {nav.alumni}
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="md:w-3/4">
              {activeSection === "leadership" && (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 pb-4 border-b">{headings.leadership}</h2>
                  
                  <h3 className="text-2xl font-bold mb-8">{headings.executive}</h3>
                  
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
                      <h3 className="text-2xl font-bold mt-12 mb-8">{headings.headAnalysts}</h3>

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
                          <p className="text-lg text-gray-500">{fallbacks.headAnalystsTitle}</p>
                          <p className="text-gray-500">{fallbacks.headAnalystsBody}</p>
                        </div>
                      )}         
                    </>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-lg text-gray-500">{fallbacks.leadershipTitle}</p>
                      <p className="text-gray-500">{fallbacks.leadershipBody}</p>
                    </div>
                  )}
                </>
              )}

              {activeSection === "current" && (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 pb-4 border-b">{headings.current}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left column: Analysts */}
                    <div>
                      <h3 className="text-2xl font-bold mb-8">{headings.analysts}</h3>
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
                        <h3 className="text-2xl font-bold mb-8">{headings.digitalInfrastructure}</h3>
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
                        <h3 className="text-2xl font-bold mb-8">{headings.riskOfficers}</h3>
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
                        <h3 className="text-2xl font-bold mb-8">{headings.complianceOfficers}</h3>
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
                        <h3 className="text-2xl font-bold mb-8">{headings.welfareOfficers}</h3>
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 pb-4 border-b">{headings.alumni}</h2>
                  <h3 className="text-2xl font-bold mb-8">{headings.founders}</h3>
                  {alumniFounders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {alumniFounders.map((member) => (
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
                          <p className="text-sm text-gray-500 mt-1">{alumniYear}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-lg text-gray-500">{fallbacks.foundersTitle}</p>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mt-12 mb-8">{headings.exHeadAnalysts}</h3>
                  {exHeadAnalysts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {exHeadAnalysts.map((member) => (
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
                          <p className="text-sm text-gray-500 mt-1">{alumniYear}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-lg text-gray-500">{fallbacks.exHeadAnalystsTitle}</p>
                    </div>
                  )}
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
