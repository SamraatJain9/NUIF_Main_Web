import Background from "@/assets/background_3.jpg"
import Image from "next/image"

interface UpcomingSectionProps {
  title: string
  description: string
}

export default function UpcomingSection({ title, description }: UpcomingSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <div className="absolute inset-0">
        <Image 
          src={Background}
          alt="Background" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative z-10 blur-overlay rounded-lg p-8 md:p-12 max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg md:text-xl text-gray-700">{description}</p>
      </div>
    </div>
  )
}
