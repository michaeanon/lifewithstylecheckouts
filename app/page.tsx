"use client"
// Opt-out of static prerendering
export const dynamic = "force-dynamic"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Wallet, CreditCard, ReceiptText, DollarSign, Check, Sparkles } from 'lucide-react'
import ParticlesBackground from "@/components/particles-background"
import MobileMenu from "@/components/mobile-menu"
import DesktopSideMenu from "@/components/desktop-side-menu"
import { useIsMobile } from "@/hooks/use-mobile" // Import useIsMobile

export default function LifeWithStyleCheckout() {
  const [amount, setAmount] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("") // This will store the formatted number
  const [displayPhoneNumber, setDisplayPhoneNumber] = useState("") // This will store what the user types
  const [loading, setLoading] = useState(false)
  const [showLimitPopover, setShowLimitPopover] = useState(false) // State for popover visibility
  const { toast } = useToast()
  const isMobile = useIsMobile(); // Use the hook

  // Add no-scroll class to body on main page to prevent scrolling
  useEffect(() => {
    document.body.classList.add("no-scroll")
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    const parsedAmount = Number.parseFloat(value);

    // Automatically show/hide popover based on amount
    // If amount > 1000, show popover; otherwise, hide it.
    if (parsedAmount > 1000) {
      setShowLimitPopover(true);
    } else {
      setShowLimitPopover(false);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setDisplayPhoneNumber(value) // Always update display with what user types

    // Format the number for the backend
    // Ensure the number is at least 10 digits for 07/01 prefix before attempting conversion
    if (value.startsWith("07") && value.length >= 10) {
      value = "254" + value.substring(1) // Replace '0' with '254'
    } else if (value.startsWith("01") && value.length >= 10) {
      // Added 01 prefix handling
      value = "254" + value.substring(1) // Replace '0' with '254'
    } else if (value.startsWith("+2547") && value.length >= 13) {
      value = value.substring(1) // Remove the '+'
    } else if (value.startsWith("+2541") && value.length >= 13) {
      // Added +2541 prefix handling
      value = value.substring(1) // Remove the '+'
    } else if (value.startsWith("2547") && value.length >= 12) {
      // Already in 2547 format, do nothing
    } else if (value.startsWith("2541") && value.length >= 12) {
      // Added 2541 prefix handling
      // Already in 2541 format, do nothing
    }
    // You might want more robust validation here (e.g., regex for digits only)
    setPhoneNumber(value) // Set the formatted number for submission
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("handleSubmit called.") // Debugging log
    setLoading(true)
    setShowLimitPopover(false); // Close popover on new submission attempt

    console.log("--- Validation Check ---") // NEW DEBUG LOG
    console.log("Current amount:", amount) // NEW DEBUG LOG
    console.log("Current phoneNumber (formatted):", phoneNumber) // NEW DEBUG LOG
    console.log("Current displayPhoneNumber (raw):", displayPhoneNumber) // NEW DEBUG LOG

    const parsedAmount = Number.parseFloat(amount);

    // Client-side validation for amount and phone number
    if (
      !amount ||
      isNaN(parsedAmount) ||
      parsedAmount <= 0 ||
      !phoneNumber ||
      phoneNumber.length < 12 || // Ensure it's 12 digits after formatting
      (!phoneNumber.startsWith("2547") && !phoneNumber.startsWith("2541")) // Ensure correct prefix
    ) {
      console.log("Validation failed. Details:") // Debugging log
      console.log("  !amount:", !amount)
      console.log("  isNaN(parsedAmount):", isNaN(parsedAmount))
      console.log("  parsedAmount <= 0:", parsedAmount <= 0)
      console.log("  !phoneNumber:", !phoneNumber)
      console.log("  phoneNumber.length:", phoneNumber.length) // NEW DEBUG LOG
      console.log("  phoneNumber.length < 12:", phoneNumber.length < 12)
      console.log("  !phoneNumber.startsWith('2547'):", !phoneNumber.startsWith("2547"))
      console.log("  !phoneNumber.startsWith('2541'):", !phoneNumber.startsWith("2541"))
      toast({
        title: "Error",
        description: "Please enter a valid amount and M-Pesa phone number (e.g., 0797952689 or 254797952689).",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // NEW: Client-side check for Pesapal limit
    if (parsedAmount > 1000) {
      setShowLimitPopover(true); // Show popover on the menu button
      toast({
        title: "Transaction Limit Exceeded",
        description: "Please enter an amount below KES 1,000 to continue.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    console.log("Validation passed. Initiating fetch...") // Debugging log
    try {
      const response = await fetch("/api/pesapal/stk-push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parsedAmount, phoneNumber }), // Use the formatted phoneNumber
      })

      const data = await response.json()
      console.log("API response received:", data) // Debugging log

      if (response.ok) {
        console.log("API response OK. Redirecting...") // Debugging log
        toast({
          title: "Redirecting...",
          description: data.message,
        })
        // Redirect the user to Pesapal's payment page
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl
        } else {
          console.log("No redirect URL received.") // Debugging log
          toast({
            title: "Error",
            description: "No redirect URL received from Pesapal.",
            variant: "destructive",
          })
        }
      } else {
        console.log("API response NOT OK.", data.error) // Debugging log
        let errorMessage = data.error?.message || "An unexpected error occurred."

        // NEW: Specific error message for amount limit
        if (data.error?.code === 'amount_exceeds_default_limit') {
          errorMessage = "Transaction amount exceeds limit. Please contact Pesapal support to increase your account limits."
        }

        toast({
          title: "Payment Initiation Failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error initiating payment (catch block):", error) // Debugging log
      toast({
        title: "Error",
        description: "Could not connect to the payment service. Please try again.",
        variant: "destructive",
      })
    } finally {
      console.log("Finally block: setting loading to false.") // Debugging log
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      {/* Particles background layer */}
      <ParticlesBackground />
      {/* Overlay on top of the particles for better text readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/80 via-pink-900/70 to-black/90"></div>

      {/* Conditionally render MobileMenu or DesktopSideMenu */}
      {isMobile ? (
        <div className="absolute top-4 left-4 z-20">
          <MobileMenu showLimitPopover={showLimitPopover} setShowLimitPopover={setShowLimitPopover} amount={amount} />
        </div>
      ) : (
        <DesktopSideMenu showLimitPopover={showLimitPopover} setShowLimitPopover={setShowLimitPopover} amount={amount} />
      )}

      {/* Card component - remains centered and transparent, now on top of the animated background */}
      <Card className="w-full max-w-md shadow-2xl rounded-2xl relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 z-10">
        <CardHeader className="text-center pb-4 relative z-10">
          <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-pink-400" />
              <div className="absolute inset-0 h-10 w-10 text-pink-400 animate-pulse opacity-50">
                <Sparkles className="h-10 w-10" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Life with Style
            </span>
          </CardTitle>
          <CardDescription className="text-gray-200 mt-3 text-lg">Premium lifestyle & fashion checkout</CardDescription>
          <div className="mt-2 text-sm text-pink-300/80">Secure payments powered by LWS</div>
        </CardHeader>
        <CardContent className="relative z-10">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="amount" className="text-gray-100 text-base font-medium">
                Amount (KES)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount less than KES 1000"
                step="0.01"
                value={amount}
                onChange={handleAmountChange} // This handler updates showLimitPopover
                required
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 h-12 text-lg rounded-xl"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="phoneNumber" className="text-gray-100 text-base font-medium">
                M-Pesa Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="e.g., 0797952689 or 254797952689"
                value={displayPhoneNumber}
                onChange={handlePhoneNumberChange}
                required
                className="border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 h-12 text-lg rounded-xl"
              />
            </div>
            <Button
              type="submit"
              variant="ghost"
              className="w-full py-4 text-lg font-semibold pay-btn bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white border-0 rounded-xl h-14 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin text-white" />
                  <span className="btn-text">Processing Payment...</span>
                </>
              ) : (
                <>
                  <div className="icon-container">
                    <Wallet className="icon default-icon wallet-icon" />
                    <CreditCard className="icon card-icon" />
                    <ReceiptText className="icon payment-icon" />
                    <DollarSign className="icon dollar-icon" />
                    <Check className="icon check-icon" />
                  </div>
                  <span className="btn-text">Complete Purchase</span>
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center text-center text-sm text-gray-200 mt-4 relative z-10 px-6">
          {'By clicking "Complete Purchase", you agree to our '}
          <a href="/terms-and-conditions" className="underline hover:text-pink-400 mx-1 transition-colors">
            terms and conditions
          </a>
          {"."}
        </CardFooter>
      </Card>
    </div>
  )
}
