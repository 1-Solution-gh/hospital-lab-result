"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { QrCode } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  const handleScanClick = () => {
    router.push("/scan")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-8">
        <Image
          src="/logo-transparent.12c1db3b.png"
          alt="GA East Municipal Assembly Logo"
          width={150}
          height={150}
          className="mx-auto mb-6 animate-fade-in"
          priority
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 animate-slide-up">
          GA EAST MUNICIPAL ASSEMBLY
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-4 animate-slide-up delay-100">
          Environmental Health and Sanitation Unit
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-3 animate-slide-up delay-200">
          Health Certificate
        </h2>
        <p className="text-base text-gray-600 max-w-md mx-auto leading-relaxed animate-slide-up delay-300">
          FOR FOOD/BEVERAGE VENDORS (FOOD PROCESSING COMPANIES, HOTELS, CATERING AND RESTAURANT STAFF ETC.)
        </p>
      </div>

      <Button
        onClick={handleScanClick}
        className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 animate-bounce-in"
      >
        <QrCode className="w-6 h-6 mr-3" />
        Scan Health Certificate
      </Button>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        .animate-slide-up.delay-100 { animation-delay: 0.1s; }
        .animate-slide-up.delay-200 { animation-delay: 0.2s; }
        .animate-slide-up.delay-300 { animation-delay: 0.3s; }
        .animate-bounce-in { animation: bounceIn 1s ease-out forwards; }
      `}</style>
    </div>
  )
}
