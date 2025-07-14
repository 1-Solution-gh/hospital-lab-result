"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, MapPin, Building, Shield, QrCode, FileText, CheckCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function CertificateReportContent() {
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const certificateId = searchParams.get("id");

  useEffect(() => {
    const loadCertificateData = async () => {
      if (!certificateId) {
        setLoading(false);
        return;
      }
      try {
        const mockData = {
          id: certificateId,
          fullName: "VICTOR ASEYE ADEVE",
          sex: "FEMALE",
          maritalStatus: "Single",
          address: "Pillar 1",
          phone: "0594808039",
          operation: "Chop Bar",
          vendorRegistrationNo: "Pub.1",
          expiryDate: "30/04/2026", // Still needed for overall status
          labResults: [
            {
              testName: "TYPHIDOT IgG/IgM",
              subResults: [
                { name: "Typhi Dot IgG", result: "Negative" },
                { name: "Typhi Dot IgM", result: "Negative" },
              ],
            },
          ],
          passportPicture: "https://i.imgur.com/4s51hqy.jpeg",
          hospitalName: "GA EAST MUNICIPAL ASSEMBLY",
          certificateType:
            "FOR FOOD/BEVERAGE VENDORS (FOOD PROCESSING COMPANIES, HOTELS, CATERING AND RESTAURANT STAFF ETC.)",
          holderSignature: "/placeholder.svg?height=60&width=120",
          holderThumbprint: "/placeholder.svg?height=60&width=60",
          endorsements: [
            { date: "08", receiptNo: "EXPIRY" },
            { date: "05", receiptNo: "30/04/2026", isExpiry: true },
            { date: "25", receiptNo: "23/5635990" },
          ],
        };
        setTimeout(() => {
          setCertificateData(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load certificate data");
        setLoading(false);
      }
    };
    loadCertificateData();
  }, [certificateId]);

  const isExpired = (expiryDate) => {
    const [day, month, year] = expiryDate.split("/");
    const expiry = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day));
    return expiry < new Date();
  };

  if (!certificateId && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border">
          <CardHeader className="pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <QrCode className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Health Certificate Viewer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
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
    );
  }

  if (loading) {
    return null; // Loading component handles this
  }

  if (error || !certificateData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center border">
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
    );
  }

  // Helper component for a form-like field
  const FormField = ({ label, value, className = "" }) => (
    <div className={cn("py-2 border-b border-gray-200 last:border-b-0", className)}>
      <label className="block text-xs font-medium text-gray-500 mb-0.5">{label}</label>
      <p className="text-sm text-gray-800 font-medium">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Header */}
        <div className="text-center mb-4">
          <Image
            src="/logo-transparent.12c1db3b.png"
            alt="GA East Municipal Assembly Logo"
            width={70}
            height={70}
            className="mx-auto mb-2"
          />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">GA EAST MUNICIPAL ASSEMBLY</h1>
          <p className="text-sm text-gray-600">Environmental Health and Sanitation Unit</p>
          <p className="text-sm text-gray-500 mt-2 font-semibold">Health Certificate</p>
          <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto leading-relaxed">
            {certificateData.certificateType}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 p-4 bg-white rounded-lg border">
          <div>
            <p className="text-sm text-gray-500">Certificate ID</p>
            <p className="font-mono text-base font-semibold">{certificateData.id}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant={isExpired(certificateData.expiryDate) ? "destructive" : "default"} className="text-xs">
              {isExpired(certificateData.expiryDate) ? "Expired" : "Valid"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>

        {/* Personal Information with Passport Picture */}
        <Card className="rounded-lg border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <User className="w-4 h-4 mr-2 text-gray-700" />
              Particulars of Holder
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 pb-4 px-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
              {/* Passport Picture */}
              <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-gray-200">
                <img
                  src={certificateData.passportPicture || "/placeholder.svg"}
                  alt="Patient Passport Picture"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Personal Details */}
              <div className="flex-grow text-center sm:text-left w-full">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{certificateData.fullName}</h2>
                <p className="text-sm text-gray-700 mb-3">{certificateData.sex}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-0 gap-x-4 text-left">
                  <FormField label="Marital Status" value={certificateData.maritalStatus} />
                  <FormField label="Vendor Registration No." value={certificateData.vendorRegistrationNo} />
                  <FormField
                    label="Permanent Address"
                    value={certificateData.address}
                    className="col-span-full flex items-start space-x-2"
                  >
                    <MapPin className="w-3 h-3 text-gray-500 mt-1" />
                  </FormField>
                  <FormField
                    label="Tel No."
                    value={certificateData.phone}
                    className="col-span-full flex items-center space-x-2"
                  >
                    <Phone className="w-3 h-3 text-gray-500" />
                  </FormField>
                  <FormField
                    label="Type/Area of Operation"
                    value={certificateData.operation}
                    className="col-span-full flex items-center space-x-2"
                  >
                    <Building className="w-3 h-3 text-gray-500" />
                  </FormField>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Laboratory Results */}
        <Card className="rounded-lg border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <FileText className="w-4 h-4 mr-2 text-gray-700" />
              Laboratory Result
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 pb-4 px-4 space-y-3">
            <div className="grid grid-cols-2 gap-4 text-xs font-medium text-gray-600 border-b pb-2 mb-2">
              <span>TEST NAME</span>
              <span>RESULT</span>
            </div>
            <div className="space-y-2">
              {certificateData.labResults.map((test, idx) => (
                <div key={idx}>
                  <div className="font-bold text-green-900 text-sm mb-1">{test.testName}</div>
                  {test.subResults && test.subResults.map((sub, subIdx) => (
                    <div key={subIdx} className="grid grid-cols-2  items-center ">
                      <span className="font-medium text-sm">{sub.name}</span>
                      <Badge variant={sub.result === "Negative" ? "default" : "destructive"} className="text-xs mb-2 w-fit">
                        {sub.result}
                      </Badge>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Official Endorsement */}
        <Card className="rounded-lg border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <CheckCircle className="w-4 h-4 mr-2 text-gray-700" />
              Official Endorsement
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 pb-4 px-4 space-y-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 text-xs font-medium text-gray-600 uppercase tracking-wider w-1/4">DATE</th>
                  <th className="py-2 text-xs font-medium text-gray-600 uppercase truncate overflow-hidden whitespace-nowrap md:whitespace-normal md:overflow-visible md:truncate-0 w-50">
                    OFFICIAL PARTICULARS/RECEIPT NO.
                  </th>
                </tr>
              </thead>
              <tbody>
                {certificateData.endorsements.map((endorsement, index) => (
                  <tr
                    key={index}
                    className={cn("border-b border-gray-100 last:border-b-0", {
                      " ": endorsement.isExpiry,
                    })}
                  >
                    <td className="py-2 text-sm">{endorsement.date}</td>
                    <td className="py-2 text-sm text-center truncate overflow-hidden whitespace-nowrap md:whitespace-normal md:overflow-visible md:truncate-0">{endorsement.receiptNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="rounded-lg bg-blue-50 border border-blue-200">
          <CardContent className="pt-4 pb-4 px-4">
            <div className="text-center">
              <p className="text-sm text-blue-800 mb-1">
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
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CertificateReportContent />
    </Suspense>
  );
}
