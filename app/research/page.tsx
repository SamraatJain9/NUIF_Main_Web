"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_3.jpg"
import Link from "next/link"
import { useState, useEffect } from 'react'

// PDF Thumbnail with minimal fallback
function PDFThumbnail({ team, company, thumbnailPath }: { team: string; company: string; thumbnailPath: string }) {
  const [imageError, setImageError] = useState(false);
  
  if (!imageError) {
    return (
      <div className="relative w-full bg-gray-100 border-b overflow-hidden">
        <img 
          src={thumbnailPath} 
          alt={`${team} - ${company}`}
          className="w-full h-auto object-contain"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }
  
  // Minimal fallback placeholder when image doesn't exist
  return (
    <div className="relative w-full aspect-[8.5/11] bg-gray-50 border-b flex items-center justify-center">
      <div className="text-center p-6">
        <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-sm font-semibold text-gray-700">{team}</p>
        <p className="text-xs text-gray-500 mt-1">{company}</p>
      </div>
    </div>
  )
}

// Research presentation metadata
type Presentation = {
  id: string
  team: string
  company: string
  title: string
  subtitle: string
  pdfPath: string
  thumbnailPath: string
  dateFormatted: string
}

type GroupedPresentations = Record<string, Presentation[]>

export default function Research() {
  const [groupedPresentations, setGroupedPresentations] = useState<GroupedPresentations>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/presentations')
      .then(res => res.json())
      .then(data => {
        setGroupedPresentations(data.grouped);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading presentations:', error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero 
        image={Background}
        title="Investment Research" 
      />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-12xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
              </div>
            ) : (
              <>
                {Object.entries(groupedPresentations).map(([date, presentations]) => (
                  <div key={date} className="mb-16">
                    {/* Date Header */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-gray-900">{date}</h3>
                    </div>

                    {/* Presentations Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {presentations.map((presentation) => (
                        <div
                          key={presentation.id}
                          className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          {/* PDF Thumbnail */}
                          <PDFThumbnail 
                            team={presentation.team} 
                            company={presentation.company}
                            thumbnailPath={presentation.thumbnailPath}
                          />

                          {/* Presentation Info */}
                          <Link
                            href={presentation.pdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-6"
                          >
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                              {presentation.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {presentation.subtitle}
                            </p>
                            <div className="mt-4 flex items-center text-blue-900 text-sm font-medium">
                              <span>View Analysis</span>
                              <svg 
                                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
