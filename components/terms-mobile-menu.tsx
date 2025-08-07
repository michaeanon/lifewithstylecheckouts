"use client"

import Link from "next/link"
import { MenuIcon, Home, FileText, MessageCircle, Sparkles, ShoppingBag, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function TermsMobileMenu() {
  const menuItems = [
    {
      href: "/",
      label: "Back to Checkout",
      icon: Home,
      description: "Return to payment form",
      external: false,
    },
    {
      href: "https://lifewithstyle.vercel.app/",
      label: "Main Website",
      icon: Home,
      description: "Visit our homepage",
      external: true,
    },
    {
      href: "https://lifewithstyle.vercel.app/shop/featured-collection",
      label: "Featured Collection",
      icon: ShoppingBag,
      description: "Browse curated fashion pieces",
      external: true,
    },
    {
      href: "/terms-and-conditions",
      label: "Terms & Conditions",
      icon: FileText,
      description: "Current page",
      external: false,
    },
  ]

  const contactOptions = [
    {
      type: "Send money",
      details: "0113313240",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      description: "Direct M-Pesa transfer",
    },
    {
      type: "Paybill",
      details: "Business No: 625625 Account No: 01201229460800",
      color: "bg-gradient-to-r from-pink-500 to-purple-500",
      description: "M-Pesa Paybill option",
    },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl transition-colors"
        >
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white border-r border-white/20 backdrop-blur-xl w-80"
      >
        <SheetHeader className="mb-8">
          <SheetTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-400" />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Life with Style
            </span>
          </SheetTitle>
          <p className="text-sm text-gray-300">BY TINA - Premium Fashion & Lifestyle</p>
        </SheetHeader>

        <nav className="space-y-6">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200 border-b border-white/20 pb-2">Navigation</h3>
            <div className="space-y-3">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon
                const linkProps = item.external ? { target: "_blank", rel: "noopener noreferrer" } : {}

                return (
                  <Link
                    key={index}
                    href={item.href}
                    {...linkProps}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-300 transition-all hover:text-white hover:bg-white/10 backdrop-blur-sm group"
                  >
                    <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-gray-400">{item.description}</p>
                    </div>
                    {item.external && <ExternalLink className="h-4 w-4 text-gray-400" />}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Services Quick Links */}
          <div className="pt-4 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Our Services</h3>
            <div className="space-y-2 text-sm">
              <div className="text-gray-300 px-4 py-2 rounded-lg bg-white/5">
                <p className="font-medium text-white">• Personal Styling</p>
                <p className="text-xs text-gray-400">Transform your style with personalized fashion services</p>
              </div>
              <div className="text-gray-300 px-4 py-2 rounded-lg bg-white/5">
                <p className="font-medium text-white">• Wardrobe Audit</p>
                <p className="text-xs text-gray-400">Professional wardrobe consultation</p>
              </div>
              <div className="text-gray-300 px-4 py-2 rounded-lg bg-white/5">
                <p className="font-medium text-white">• Shopping Assistance</p>
                <p className="text-xs text-gray-400">Curated fashion selections</p>
              </div>
            </div>
          </div>

          {/* WhatsApp Support - Prominent placement */}
          <div className="pt-4 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Get Support</h3>
            <Link
              href="https://wa.me/254113313240"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all group w-full"
            >
              <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-medium text-white">WhatsApp Support</p>
                <p className="text-xs text-green-100">+254113313240</p>
              </div>
            </Link>
          </div>

          {/* Payment Options */}
          <div className="pt-4 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Payment Options</h3>
            <div className="space-y-4">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-gray-300 p-3 rounded-xl bg-white/5 backdrop-blur-sm"
                >
                  <div className={`w-4 h-4 rounded-sm flex-shrink-0 mt-1 ${option.color}`} />
                  <div>
                    <p className="font-medium text-white text-sm">{option.type}:</p>
                    <p className="text-xs text-gray-300 break-all mb-1">{option.details}</p>
                    <p className="text-xs text-gray-400">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Footer */}
          <div className="pt-4 border-t border-white/20 text-center">
            <p className="text-xs text-gray-400">© 2025 Life with Style by Tina</p>
            <p className="text-xs text-gray-500 mt-1">Premium Fashion & Lifestyle</p>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
