// Render on demand – this page uses interactive client-only components
export const dynamic = "force-dynamic"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ParticlesBackground from "@/components/particles-background"
import BackToTop from "@/components/back-to-top"
import TermsMobileMenu from "@/components/terms-mobile-menu"
import { Sparkles } from 'lucide-react'

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen p-4 relative">
      {/* Particles background layer */}
      <ParticlesBackground />
      {/* Overlay on top of the particles for better text readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/80 via-pink-900/70 to-black/90"></div>

      {/* Mobile Menu Button - positioned absolutely at top-left */}
      <div className="absolute top-4 left-4 z-20">
        <TermsMobileMenu />
      </div>

      {/* Content container that allows scrolling */}
      <div className="flex justify-center pt-16 pb-8">
        <Card className="w-full max-w-3xl shadow-2xl rounded-2xl relative bg-white/10 backdrop-blur-lg border border-white/20 z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white flex items-center justify-center gap-3">
              <Sparkles className="h-8 w-8 text-pink-400" />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Terms and Conditions
              </span>
            </CardTitle>
            <p className="text-gray-300 mt-2">Life with Style by Tina</p>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none p-6 text-gray-100 space-y-6">
            <p className="text-lg text-gray-200">
              Welcome to Life with Style by Tina. These terms and conditions outline the rules and regulations for the
              use of our website, services, and fashion collections.
            </p>
            <p>
              By accessing our website at lifewithstyle.vercel.app, making purchases, or using our styling services, you
              accept these terms and conditions. Do not continue to use Life with Style by Tina if you do not agree to
              take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">1. About Our Services</h2>
            <p>
              Life with Style by Tina offers premium fashion collections, personal styling services, wardrobe
              consultations, and style guidance. Our curated collections include:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• Featured Collections - Curated pieces that define contemporary elegance</li>
              <li>• Seasonal Collections - Summer, Autumn, Winter, and Spring fashion lines</li>
              <li>• Style Guides - Capsule wardrobe, color coordination, and occasion dressing</li>
              <li>• Personal Styling Services - Transform your style with personalized fashion services</li>
              <li>• Wardrobe Audit and Shopping Assistance</li>
            </ul>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">2. Payment Processing</h2>
            <p>
              All payments made through Life with Style by Tina are processed securely by Pesapal. By initiating a
              payment, you agree to Pesapal's terms of service and privacy policy. We accept M-Pesa payments and provide
              alternative payment options including:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• M-Pesa STK Push (primary method)</li>
              <li>• Send Money: 0797952689</li>
              <li>• Paybill: Business No: 625625, Account No: 01201229460800</li>
            </ul>
            <p>
              All transactions are encrypted using industry-standard SSL technology to protect your sensitive
              information during transmission.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">3. Fashion Products & Services</h2>
            <ul className="space-y-2">
              <li>
                All fashion items including dresses, sweaters, trousers, blazers, and accessories are subject to
                availability.
              </li>
              <li>
                Product descriptions and images are provided for guidance. Actual items may vary slightly due to
                lighting, fabric texture, or manufacturing variations.
              </li>
              <li>Prices are displayed in Kenyan Shillings (KES) and are subject to change without prior notice.</li>
              <li>We reserve the right to limit quantities on any product or service.</li>
              <li>Custom styling consultations and personalized services may have different terms and timelines.</li>
              <li>
                Delivery times are estimates and may vary based on location and product availability within Kenya.
              </li>
            </ul>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">4. Styling Services Terms</h2>
            <p>
              Our professional styling services include personal styling, wardrobe audits, and shopping assistance.
              Service terms include:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• Consultation bookings require advance scheduling</li>
              <li>• Service fees are non-refundable once consultation begins</li>
              <li>• Wardrobe recommendations are based on personal style assessment</li>
              <li>• Shopping assistance includes curated product selections</li>
              <li>• All styling advice is personalized and confidential</li>
            </ul>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">5. Returns & Exchanges</h2>
            <p>
              Life with Style by Tina offers a 14-day return policy for fashion items in original condition with tags
              attached. Custom styling services and personalized consultations are non-refundable. Return shipping costs
              may apply unless the item was damaged or incorrect upon delivery.
            </p>
            <p>
              To initiate a return, please contact our customer service team via WhatsApp at +254113313240 within 14
              days of purchase. Refunds will be processed within 5-7 business days after we receive and inspect the
              returned item.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">6. Privacy and Data Protection</h2>
            <p>
              We are committed to protecting your privacy and personal information. All payment data is processed
              securely through Pesapal's encrypted systems. We do not store sensitive payment information on our
              servers.
            </p>
            <p>
              Your personal information including style preferences, measurements, and contact details will only be used
              for order processing, styling consultations, customer support, and marketing communications (with your
              consent). We will never sell or share your information with third parties without your explicit consent,
              except as required by law.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            <p>
              All content, designs, style guides, fashion collections, trademarks, logos, and intellectual property
              displayed on Life with Style by Tina are the property of Tina or our licensors. You may not use,
              reproduce, or distribute any of our intellectual property including styling methodologies, fashion
              curation techniques, or brand elements without explicit written permission.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">8. Service Availability</h2>
            <p>
              Our services are primarily available within Kenya. International shipping and styling consultations may be
              available upon request with additional terms and fees. Virtual styling consultations can be arranged for
              clients outside Kenya.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">9. Limitation of Liability</h2>
            <p>
              Life with Style by Tina shall not be liable for any indirect, incidental, special, consequential or
              punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
              losses, resulting from your use of our services, products, or styling consultations.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try
              to provide at least 30 days notice prior to any new terms taking effect. Your continued use of our
              services after any changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-white text-2xl font-bold mt-8 mb-4">11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, our fashion collections, or styling services, please contact
              us:
            </p>
            <ul className="space-y-2 ml-6">
              <li>• WhatsApp Support: +254797952689</li>
              <li>
                • Website:{" "}
                <a href="https://lifewithstyle.vercel.app" className="text-pink-400 hover:text-pink-300 underline">
                  lifewithstyle.vercel.app
                </a>
              </li>
              <li>• Email support available through our website contact form</li>
            </ul>
            <p>
              Our support team is available to assist you with any concerns or questions about our fashion products,
              styling services, or policies. We're here to help you discover your unique style!
            </p>

            <div className="mt-12 text-center border-t border-white/20 pt-8">
              <p className="text-sm text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white border-0 rounded-xl px-8 py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Back to Checkout
                  </Button>
                </Link>
                <Link href="https://lifewithstyle.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-3 font-semibold transition-all duration-300 bg-transparent"
                  >
                    Visit Main Website
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BackToTop />
    </div>
  )
}
