import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Life with Style by Tina - Premium Lifestyle & Fashion",
  description: "Discover your unique style with Tina's curated collection of premium lifestyle and fashion products",
  generator: "Life with Style by Tina",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
