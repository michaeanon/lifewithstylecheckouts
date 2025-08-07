"use client"

// The callback relies on search params & router – disable SSG
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, Loader2, XCircle, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [paymentStatus, setPaymentStatus] = useState("pending") // pending, success, failed, error
  const [statusMessage, setStatusMessage] = useState("Checking payment status...")
  const [orderTrackingId, setOrderTrackingId] = useState<string | null>(null)
  const [merchantReference, setMerchantReference] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const orderTrackingIdParam = searchParams.get("OrderTrackingId")
    const orderNotificationTypeParam = searchParams.get("OrderNotificationType")
    const orderMerchantReferenceParam = searchParams.get("OrderMerchantReference")

    setOrderTrackingId(orderTrackingIdParam)
    setMerchantReference(orderMerchantReferenceParam)

    if (orderTrackingIdParam) {
      const fetchPaymentStatus = async () => {
        try {
          const response = await fetch(`/api/pesapal/get-transaction-status?orderTrackingId=${orderTrackingIdParam}`)
          const data = await response.json()

          if (response.ok) {
            const status = data.status
            setPaymentStatus(status === "COMPLETED" ? "success" : status === "FAILED" ? "failed" : "pending")
            setStatusMessage(data.message || `Payment status: ${status}`)
            toast({
              title: "Payment Update",
              description: data.message || `Payment status: ${status}`,
              variant: status === "COMPLETED" ? "default" : "destructive",
            })
          } else {
            setPaymentStatus("error")
            setStatusMessage(data.error || "Failed to retrieve payment status.")
            toast({
              title: "Error",
              description: data.error || "Failed to retrieve payment status.",
              variant: "destructive",
            })
          }
        } catch (error) {
          console.error("Error fetching payment status:", error)
          setPaymentStatus("error")
          setStatusMessage("An error occurred while checking payment status.")
          toast({
            title: "Error",
            description: "An error occurred while checking payment status.",
            variant: "destructive",
          })
        }
      }
      fetchPaymentStatus()
    } else {
      setPaymentStatus("error")
      setStatusMessage("No Order Tracking ID found in URL. Invalid callback.")
      toast({
        title: "Error",
        description: "No Order Tracking ID found in URL. Invalid callback.",
        variant: "destructive",
      })
    }
  }, [searchParams, toast])

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case "pending":
        return <Loader2 className="h-16 w-16 animate-spin text-purple-500" />
      case "success":
        return <CheckCircle2 className="h-16 w-16 text-green-500" />
      case "failed":
        return <XCircle className="h-16 w-16 text-red-500" />
      case "error":
        return <XCircle className="h-16 w-16 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusCardClass = () => {
    switch (paymentStatus) {
      case "success":
        return "border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/20"
      case "failed":
        return "border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20"
      case "error":
        return "border-gray-500/50 bg-gray-500/10 shadow-lg shadow-gray-500/20"
      default:
        return "border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-500/20"
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-black p-4">
      <Card className={`w-full max-w-md text-center backdrop-blur-lg border ${getStatusCardClass()} rounded-2xl`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-400" />
            Payment Status
          </CardTitle>
          <CardDescription className="mt-2 text-gray-300">
            Details about your Life with Style transaction
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 p-6">
          {getStatusIcon()}
          <p className="text-xl font-semibold text-white">{statusMessage}</p>
          {orderTrackingId && (
            <p className="text-sm text-gray-300">
              Order Tracking ID: <span className="font-mono font-medium text-pink-300">{orderTrackingId}</span>
            </p>
          )}
          {merchantReference && (
            <p className="text-sm text-gray-300">
              Your Reference: <span className="font-mono font-medium text-pink-300">{merchantReference}</span>
            </p>
          )}
          {paymentStatus === "success" && (
            <p className="text-base text-green-400 font-medium">
              Your payment was successful! Thank you for choosing Life with Style.
            </p>
          )}
          {(paymentStatus === "failed" || paymentStatus === "error") && (
            <p className="text-base text-red-400 font-medium">
              There was an issue with your payment. Please try again or contact our support team.
            </p>
          )}
          <Button
            onClick={() => router.push("/")}
            className="mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white border-0 rounded-xl px-8 py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Back to Checkout
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
