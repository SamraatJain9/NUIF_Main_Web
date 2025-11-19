"use client"

import { useState, FormEvent, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ParallaxHero from "@/components/parallax-hero"
import Background from "@/assets/background_5.jpg"
import Link from "next/link"

export default function Apply() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [applicationCount, setApplicationCount] = useState(0)
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [selectedPosition, setSelectedPosition] = useState<string>("")

  // Check localStorage on component mount
  useEffect(() => {
    const count = localStorage.getItem("nuif_application_count")
    if (count) {
      setApplicationCount(parseInt(count))
    }
  }, [])

  const sectors = [
    "Energy",
    "Materials",
    "Industrials",
    "Utilities",
    "Healthcare",
    "Consumer Discretionary",
    "Communication Services",
    "Information Technology",
    "Real Estate",
    "Consumer Staples",
    "Financials"
  ]

  const handleSectorChange = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      setSelectedSectors(selectedSectors.filter(s => s !== sector))
    } else {
      // Only allow selection if less than 3 sectors are selected
      if (selectedSectors.length < 3) {
        setSelectedSectors([...selectedSectors, sector])
      }
    }
  }

  const handlePositionChange = (position: string) => {
    setSelectedPosition(position)
    // Clear selected sectors when changing position
    setSelectedSectors([])
  }

  // Check if position requires sector selection
  const requiresSectorSelection = selectedPosition === "Head Analyst" || selectedPosition === "Analyst"

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    // Validate sectors only for Analyst and Head Analyst positions
    if (requiresSectorSelection && selectedSectors.length !== 3) {
      setError("Please select exactly 3 sectors")
      setIsSubmitting(false)
      return
    }

    const studentId = formData.get("studentId") as string
    if (studentId.length !== 9) {
      setError("Student ID must be exactly 9 characters long")
      setIsSubmitting(false)
      return
    }

    // Add application count to form data
    const newApplicationCount = applicationCount + 1
    formData.append("applicationCount", newApplicationCount.toString())

    // Add sectors to form data only for analyst positions
    if (requiresSectorSelection) {
      formData.append("sectors", JSON.stringify(selectedSectors))
    }

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        // Update and store application count in localStorage
        const newCount = applicationCount + 1
        setApplicationCount(newCount)
        localStorage.setItem("nuif_application_count", newCount.toString())
        setSubmitted(true)
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
          setSelectedSectors([])
          setSelectedPosition("")
          // Reset form inputs
          const form = e.currentTarget as HTMLFormElement
          form.reset()
        }, 3000)
      } else {
        setError(data.error || "An error occurred while submitting your application")
      }
    } catch (error) {
      setError("Failed to submit application. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const handleCut = (e: React.ClipboardEvent) => {
    e.preventDefault()
  }

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  // Content to display if user has previously submitted an application
  const SuccessContent = () => (
    <div className="bg-green-50 border border-green-500 rounded-lg p-8 text-center">
      <h3 className="text-2xl font-bold text-green-800 mb-4">Application Submitted!</h3>
      <p className="text-green-700 text-lg mb-4">
        Thank you very much for applying to the Newcastle University Student-Led Investment Fund.
        Our recruiters will review your application and reach out soon.
      </p>
      {applicationCount > 1 && (
        <p className="text-green-600 text-sm">
          This is your {getOrdinalNumber(applicationCount)} application from this device.
        </p>
      )}
      <p className="text-green-600 text-sm mt-2">
        The form will reset automatically in a few seconds.
      </p>
    </div>
  )

  const getOrdinalNumber = (num: number) => {
    const ordinals = ["", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"]
    return ordinals[num] || `${num}th`
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <ParallaxHero image={Background} title="Apply to Join NUIF" />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Join Our Team</h2>

            <div className="prose prose-lg max-w-none mb-10 text-center">
              <p>
                We're looking for passionate students who are interested in finance and investing to join our team.
                As a member of NUIF, you'll gain hands-on experience in equity research, portfolio management,
                and financial analysis.
              </p>

              <p>
                Whether you're studying finance, economics, business or any other discipline, if you have a
                keen interest in financial markets and are committed to learning, we'd love to hear from you.
              </p>
            </div>

            {submitted ? (
              <SuccessContent />
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                {/* Rest of your form as before */}
                {error && (
                  <div className="mb-6 p-4 bg-red-100 border border-red-500 rounded text-red-700">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block mb-1 font-medium">Full Name *</label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <br />

                      <div>
                        <label htmlFor="email" className="block mb-1 font-medium">University Email *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          pattern=".*@newcastle\.ac\.uk$"
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="example@newcastle.ac.uk"
                        />
                        <p className="text-sm text-gray-500 mt-1">Must be a Newcastle University email</p>
                      </div>

                      <br />

                      <div>
                        <label htmlFor="studentId" className="block mb-1 font-medium">University ID Number *</label>
                        <input
                          id="studentId"
                          name="studentId"
                          type="text"
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>

                      <br />

                      <div>
                        <label className="block mb-1 font-medium">What academic year will you be in for 2025/2026? *</label>
                        <select
                          name="academicYear"
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Select your year</option>
                          <option value="1st year">1st year</option>
                          <option value="2nd year">2nd year</option>
                          <option value="3rd year">3rd year</option>
                          <option value="4th year">4th year</option>
                          <option value="Masters">Masters</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <br />

                  {/* Position Information */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Position Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-1 font-medium">What position will you be applying for? *</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="headAnalyst"
                              name="position"
                              value="Head Analyst"
                              required
                              className="mr-2"
                              onChange={(e) => handlePositionChange(e.target.value)}
                            />
                            <label htmlFor="headAnalyst">Head Analyst</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="analyst"
                              name="position"
                              value="Analyst"
                              className="mr-2"
                              onChange={(e) => handlePositionChange(e.target.value)}
                            />
                            <label htmlFor="analyst">Analyst</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="esgOfficer"
                              name="position"
                              value="ESG Officer"
                              className="mr-2"
                              onChange={(e) => handlePositionChange(e.target.value)}
                            />
                            <label htmlFor="esgOfficer">ESG Officer</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="complianceOfficer"
                              name="position"
                              value="Compliance Officer"
                              className="mr-2"
                              onChange={(e) => handlePositionChange(e.target.value)}
                            />
                            <label htmlFor="complianceOfficer">Compliance Officer</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="riskOfficer"
                              name="position"
                              value="Risk Officer"
                              className="mr-2"
                              onChange={(e) => handlePositionChange(e.target.value)}
                            />
                            <label htmlFor="riskOfficer">Risk Officer</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="welfareOfficer"
                              name="position"
                              value="Welfare Officer"
                              className="mr-2"
                              onChange={(e) => handlePositionChange(e.target.value)}
                            />
                            <label htmlFor="welfareOfficer">Welfare Officer</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="speakerAcquisitionOfficer"
                              name="position"
                              value="Speaker Acquisition Officer"
                              className="mr-2"
                              onChange={(e) => handlePositionChange(e.target.value)}
                            />
                            <label htmlFor="speakerAcquisitionOfficer">Speaker Acquisition Officer</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="socialMediaOfficer"
                              name="position"
                              value="Social Media Officer"
                              className="mr-2"
                              onChange={(e) => handlePositionChange(e.target.value)}
                            />
                            <label htmlFor="socialMediaOfficer">Social Media Officer</label>
                          </div>
                        </div>
                      </div>

                      <br />

                      <div>
                        <label htmlFor="positionReason" className="block mb-1 font-medium">
                          Why do you want to be in this position? *
                        </label>
                        <textarea
                          id="positionReason"
                          name="positionReason"
                          rows={4}
                          required
                          onPaste={handlePaste}
                          onCopy={handleCopy}
                          onCut={handleCut}
                          onContextMenu={handleContextMenu}
                          className="w-full p-2 border border-gray-300 rounded"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <br />

                  {/* Sector Preferences */}
                  {(selectedPosition === "" || requiresSectorSelection) && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Sector Preferences</h3>
                      <p className="mb-2">
                        Please select exactly 3 sectors you'd like to analyse <strong>(Only for Analysts and Head Analysts)</strong>:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {sectors.map(sector => (
                          <div key={sector} className="flex items-center">
                            <input
                              type="checkbox"
                              id={sector}
                              checked={selectedSectors.includes(sector)}
                              onChange={() => handleSectorChange(sector)}
                              className="mr-2"
                              disabled={!requiresSectorSelection && selectedPosition !== ""}
                            />
                            <label htmlFor={sector} className={!requiresSectorSelection && selectedPosition !== "" ? "text-gray-400" : ""}>
                              {sector}
                            </label>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Selected: {selectedSectors.length}/3
                      </p>
                    </div>
                  )}

                  {(selectedPosition === "" || requiresSectorSelection) && <br />}

                  {/* Motivation */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Motivation</h3>
                    <div>
                      <label htmlFor="motivation" className="block mb-1 font-medium">
                        Why do you want to be a part of this fund and what could you contribute? *
                      </label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        rows={6}
                        required
                        onPaste={handlePaste}
                        onCopy={handleCopy}
                        onCut={handleCut}
                        onContextMenu={handleContextMenu}
                        className="w-full p-2 border border-gray-300 rounded"
                      ></textarea>
                    </div>
                  </div>

                  <br />

                  {/* CV Upload */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">CV Upload</h3>
                    <div>
                      <label htmlFor="cv" className="block mb-1 font-medium">Upload your CV *</label>
                      <input
                        id="cv"
                        name="cv"
                        type="file"
                        required
                        accept=".pdf,.doc,.docx"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Accepted formats: PDF, DOC, DOCX. Maximum size: 5MB.
                      </p>
                    </div>
                  </div>

                  <br />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-3 rounded font-medium text-white ${isSubmitting
                        ? "bg-gray-400"
                        : "bg-gray-900 hover:bg-gray-800 transition-colors"
                      }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-100">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Application Process</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-xl font-bold mb-2 text-gray-900">1. Submit Application</div>
                <p className="text-gray-700">Complete our online application form and upload your CV</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-xl font-bold mb-2 text-gray-900">2. Interview</div>
                <p className="text-gray-700">Selected candidates will be invited for an interview</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-xl font-bold mb-2 text-gray-900">3. Bootcamp</div>
                <p className="text-gray-700">You will be taught equity-research and take an assessment</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-xl font-bold mb-2 text-gray-900">4. Join the Team</div>
                <p className="text-gray-700">Successful candidates will be welcomed to the NUIF team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}