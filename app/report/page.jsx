"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Phone, MapPin, Building, Calendar, Shield, QrCode, CheckCircle } from "lucide-react"

export default function CertificatePage() {
  const [certificateData, setCertificateData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()
  const certificateId = searchParams.get("id")

  useEffect(() => {
    const loadCertificateData = async () => {
      if (!certificateId) {
        setLoading(false)
        return
      }

      try {
        const mockData = {
          id: certificateId,
          fullName: "VICTOR ASEYE ADEVE",
          sex: "Male",
          address: "Pillar 1",
          phone: "0594808039",
          operation: "Engineer",
          expiryDate: "30/04/2026",
          issueDate: "15/04/2024",
          hospitalName: "City General Hospital",
          labResults: {
            "Typhi IgG": "Negative",
            "Typhi IgM": "Negative",
            "Hepatitis B": "Negative",
            HIV: "Negative",
          },
          passportPicture: "https://i.imgur.com/4s51hqy.jpeg", // Adjusted size for profile
        }

        setTimeout(() => {
          setCertificateData(mockData)
          setLoading(false)
        }, 800)
      } catch (err) {
        setError("Failed to load certificate data")
        setLoading(false)
      }
    }

    loadCertificateData()
  }, [certificateId])

  const isExpired = (expiryDate) => {
    const [day, month, year] = expiryDate.split("/")
    const expiry = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))
    return expiry < new Date()
  }

  if (!certificateId && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardHeader className="pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <QrCode className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Health Certificate Viewer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">How to view your certificate:</h3>
              <ol className="text-sm text-blue-800 space-y-1 text-left">
                <li>1. Open your phone camera</li>
                <li>2. Point it at the QR code on your certificate card</li>
                <li>3. Tap the notification that appears</li>
                <li>4. Your certificate will open automatically</li>
              </ol>
            </div>
            <p className="text-xs text-gray-500">This page is designed to be accessed via QR code scanning</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificate...</p>
        </div>
      </div>
    )
  }

  if (error || !certificateData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Certificate Not Found</h2>
            <p className="text-red-600 mb-4">{error || "Invalid certificate ID"}</p>
            <p className="text-sm text-gray-500">
              Please check your QR code or contact the hospital if this error persists.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Health Certificate</h1>
            <p className="text-gray-600">{certificateData.hospitalName}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Certificate ID</p>
              <p className="font-mono text-lg font-semibold">{certificateData.id}</p>
            </div>
            {/* <div className="flex gap-2">
              <Badge variant={isExpired(certificateData.expiryDate) ? "destructive" : "default"} className="text-sm">
                {isExpired(certificateData.expiryDate) ? "Expired" : "Valid"}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div> */}
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Information with Passport Picture */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-4">
                {/* Passport Picture */}
                <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                  <img
                    src={certificateData.passportPicture || "/placeholder.svg"}
                    alt="Patient Passport Picture"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Personal Details */}
                <div className="flex-grow text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{certificateData.fullName}</h2>
                  <p className="text-lg text-gray-700 mb-4">{certificateData.sex}</p>

                  <div className="space-y-3 text-left">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p>{certificateData.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p>{certificateData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Type of Operation</label>
                        <p>{certificateData.operation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Details */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-lg">
                <CheckCircle className="w-5 h-5 mr-2" />
                Lab Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Issue Date</label>
                  <p className="text-lg">{certificateData.issueDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Expiry Date</label>
                  <p
                    className={`text-lg font-semibold ${isExpired(certificateData.expiryDate) ? "text-red-600" : "text-green-600"}`}
                  >
                    {certificateData.expiryDate}
                  </p>
                </div>
              </div> */}

              <div>
                <label className="text-sm font-medium text-gray-500 mb-3 block">Lab Results</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(certificateData.labResults).map(([test, result]) => (
                    <div key={test} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-sm">{test}</span>
                      <Badge variant={result === "Negative" ? "default" : "destructive"} className="text-xs">
                        {result}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <Card className="shadow-sm bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Issued by:</strong> {certificateData.hospitalName}
                </p>
                <p className="text-xs text-blue-600">
                  This is an official health certificate. For verification or inquiries, contact the issuing hospital.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
