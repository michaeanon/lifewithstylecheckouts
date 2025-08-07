"use client"

import Link from "next/link"
import { MenuIcon, MessageCircle, Sparkles, Home, ShoppingBag, HandIcon as HandPointing } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MobileMenuProps {
  showLimitPopover: boolean;
  setShowLimitPopover: (open: boolean) => void;
  amount: string;
}

export default function MobileMenu({ showLimitPopover, setShowLimitPopover, amount }: MobileMenuProps) {
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
    <Sheet>
      {/* The 'open' prop here directly controls the popover's visibility */}
      <Popover open={showLimitPopover} onOpenChange={(open) => {
        const parsedAmount = Number.parseFloat(amount);
        if (!open && parsedAmount <= 1000) {
          setShowLimitPopover(false);
        } else if (open) {
          setShowLimitPopover(true);
        }
      }}>
        <PopoverTrigger asChild>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl hover:scale-105 transition-all duration-300" // Added hover:scale-105
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
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
      <SheetContent
        side="left"
        className="bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white border-r border-white/20 backdrop-blur-xl"
      >
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-400" />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Life with Style
            </span>
          </SheetTitle>
        </SheetHeader>
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="https://lifewithstyle.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <Home className="h-5 w-5" />
            Main Website
          </Link>

          <Link
            href="https://lifewithstyle.vercel.app/shop/featured-collection"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <ShoppingBag className="h-5 w-5" />
            Shop Collection
          </Link>

          {/* WhatsApp Support Button */}
          <Link
            href="https://wa.me/254797952689"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition-all hover:shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Support
          </Link>

          <div className="mt-6 pt-6 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Alternative Payment Options</h3>
            <div className="grid gap-4">
              {paymentOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-gray-300 p-3 rounded-xl bg-white/5 backdrop-blur-sm"
                >
                  <div className={`w-4 h-4 rounded-sm flex-shrink-0 mt-1 ${option.color}`} />
                  <div>
                    <p className="font-medium text-white">{option.type}:</p>
                    {option.type === "Paybill" ? (
                      <>
                        <p className="text-sm text-gray-300">Business No: {option.businessNo}</p>
                        <p className="text-sm text-gray-300">Account No: {option.accountNo}</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-300">{option.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
