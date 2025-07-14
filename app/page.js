"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Smartphone, ExternalLink } from "lucide-react"
// import Image from "next/image"

export default function QRTestPage() {
  const [currentUrl, setCurrentUrl] = useState("")
  const certificateUrl = `${currentUrl}/report?id=T12345`

  useEffect(() => {
    setCurrentUrl(window.location.origin)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Certificate QR Code</h1>
          <p className="text-gray-600">Scan with your phone camera to view certificate</p>
        </div>

        <div className="grid grid-cols-1  gap-6">
          {/* QR Code Card */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                <QrCode className="w-5 h-5 mr-2" />
                Hospital Certificate QR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {/* QR Code - Using QR Server API */}
              <div className="bg-white p-6 rounded-lg shadow-inner mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(certificateUrl)}`}
                  alt="Certificate QR Code"
                  className="mx-auto"
                  width={250}
                  height={250}
                />
              </div>

              {/* <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Certificate ID: T12345</p>
                <p className="text-xs text-gray-500 break-all">{certificateUrl}</p>
              </div> */}
            </CardContent>
          </Card>

          {/* Instructions Card */}
          {/* <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                How to Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 mb-3">📱 How to Scan:</h3>
                <ol className="text-sm text-gray-700 space-y-2 pl-4">
                  <li>1. Open your phone camera app</li>
                  <li>2. Point camera at the QR code</li>
                  <li>3. Tap the notification that appears</li>
                  <li>4. Certificate opens automatically</li>
                </ol>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Certificate Details:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Patient: Theresa Thompson</li>
                  <li>• ID: T12345</li>
                  <li>• Status: Valid until 30/04/2026</li>
                </ul>
              </div>

              <Button
                onClick={() => window.open(certificateUrl, "_blank")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Preview Certificate
              </Button>
            </CardContent>
          </Card> */}
        </div>

        {/* Technical Info */}
        {/* <Card className="mt-6 shadow-xl bg-gray-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Certificate ID: <span className="font-mono">T12345</span>
              </p>
              <p className="text-xs text-gray-500">This QR code contains the direct link to the certificate</p>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
