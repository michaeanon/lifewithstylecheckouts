"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronRight, ChevronLeft, MessageCircle, Sparkles, Home, ShoppingBag, ExternalLink, HandIcon as HandPointing } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DesktopSideMenuProps {
showLimitPopover: boolean;
setShowLimitPopover: (open: boolean) => void;
amount: string;
}

export default function DesktopSideMenu({ showLimitPopover, setShowLimitPopover, amount }: DesktopSideMenuProps) {
const [isOpen, setIsOpen] = useState(false)

const paymentOptions = [
  { type: "Send money", details: "0797952689", color: "bg-gradient-to-r from-orange-500 to-red-500" },
  {
    type: "Paybill",
    businessNo: "625625",
    accountNo: "01201229460800",
    color: "bg-gradient-to-r from-pink-500 to-purple-500",
  },
]

return (
  <>
    {/* Desktop Side Menu - Hidden on mobile */}
    <div className="hidden md:block fixed left-0 top-1/2 -translate-y-1/2 z-40">
      {/* Toggle Button with Popover */}
      <Popover open={showLimitPopover} onOpenChange={(open) => {
        const parsedAmount = Number.parseFloat(amount);
        if (!open && parsedAmount <= 1000) {
          setShowLimitPopover(false);
        } else if (open) {
          setShowLimitPopover(true);
        }
      }}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            size="icon"
            className={`h-12 w-8 rounded-r-xl rounded-l-none bg-white/10 backdrop-blur-sm border border-white/20 border-l-0 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 ${ // Added hover:scale-105
              isOpen ? "translate-x-80" : "translate-x-0"
            }`}
          >
            {isOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            <span className="sr-only">Toggle side menu</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="center"
          className="w-80 rounded-lg shadow-xl overflow-hidden
              data-[state=open]:animate-in data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
              data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
              data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
              duration-300 ease-out data-[state=closed]:duration-200 data-[state=closed]:ease-in" // Enhanced animation classes
        >
          <div className="bg-purple-700 text-white p-4">
            <h4 className="font-bold text-base">Transaction Limit Info</h4>
          </div>
          <div className="bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-black/95 text-white p-4 text-sm border border-white/20 border-t-0 rounded-b-lg backdrop-blur-xl">
            <p className="mb-3">
              For amounts exceeding KES 1,000, please use our alternative payment options:
            </p>
            <ul className="space-y-1 mb-3">
              <li className="flex items-center gap-2">
                <HandPointing className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <strong>Send Money:</strong> 0797952689
              </li>
              <li className="flex items-start gap-2">
                <HandPointing className="h-4 w-4 text-pink-400 flex-shrink-0" />
                <div>
                  <strong>Paybill:</strong>
                  <p className="ml-6">Business No: 625625</p>
                  <p className="ml-6">Account No: 01201229460800</p>
                </div>
              </li>
            </ul>
            <p className="text-xs text-gray-600">
              You can find more details on our <Link href="/terms-and-conditions" className="underline text-pink-600 hover:text-pink-700">Terms and Conditions</Link> page.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>

    {/* Side Panel - Fixed positioning */}
    <div
      className={`hidden md:block fixed left-0 top-0 h-full w-80 bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-black/95 backdrop-blur-xl border-r border-white/20 transition-transform duration-300 ease-in-out z-30 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-pink-400" />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Life with Style
            </span>
          </div>
          <p className="text-sm text-gray-300">by Tina - Premium Lifestyle & Fashion</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200 border-b border-white/20 pb-2">Navigation</h3>
            <div className="space-y-3">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:text-white hover:bg-white/10 backdrop-blur-sm group"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium">Payment Checkout</p>
                  <p className="text-xs text-gray-400">Current page</p>
                </div>
              </Link>

              <Link
                href="https://lifewithstyle.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:text-white hover:bg-white/10 backdrop-blur-sm group"
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <p className="font-medium">Main Website</p>
                  <p className="text-xs text-gray-400">Visit our homepage</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </Link>

              <Link
                href="https://lifewithstyle.vercel.app/shop/featured-collection"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:text-white hover:bg-white/10 backdrop-blur-sm group"
              >
                <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <p className="font-medium">Shop Collection</p>
                  <p className="text-xs text-gray-400">Browse our products</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>

          {/* WhatsApp Support - Prominent placement */}
          <div className="pt-4 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Get Support</h3>
            <Link
              href="https://wa.me/254797952689"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all group w-full"
            >
              <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-white">WhatsApp Support</p>
                <p className="text-xs text-green-100">+254797952689</p>
              </div>
            </Link>
          </div>

          {/* Payment Options */}
          <div className="pt-4 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Alternative Payment Options</h3>
            <div className="space-y-4">
              {paymentOptions.map((option, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-sm flex-shrink-0 mt-1 ${option.color}`} />
                      <div>
                        <p className="font-medium text-white text-sm">{option.type}:</p>
                        {option.type === "Paybill" ? (
                          <>
                            <p className="text-xs text-gray-300 break-all">Business No: {option.businessNo}</p>
                            <p className="text-xs text-gray-300 break-all">Account No: {option.accountNo}</p>
                          </>
                        ) : (
                          <p className="text-xs text-gray-300 break-all">{option.details}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Brand Info */}
          <div className="pt-4 border-t border-white/20">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">Secure payments powered by LWS</p>
              <p className="text-xs text-gray-500">© 2025 Life with Style by Tina</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Overlay when menu is open */}
    {isOpen && (
      <div
        className="hidden md:block fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
        onClick={() => setIsOpen(false)}
      />
    )}
  </>
)
}
