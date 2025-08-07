import { NextResponse } from "next/server"

// Define your Pesapal environment variables
// You will need to set these in your Vercel project settings or .env.local
const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY || "YOUR_PESAPAL_CONSUMER_KEY"
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET || "YOUR_PESAPAL_CONSUMER_SECRET"
const PESAPAL_IPN_URL = process.env.PESAPAL_IPN_URL || "YOUR_PESAPAL_IPN_URL" // Your Instant Payment Notification URL (server-to-server)
const PESAPAL_IPN_ID = process.env.PESAPAL_IPN_ID || "YOUR_PESAPAL_IPN_ID" // The IPN ID generated from Pesapal registration

// const PESAPAL_BASE_URL = "https://cybqa.pesapal.com/pesapalv3" // Sandbox URL
const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3" // Live URL

export async function POST(request: Request) {
  try {
    const { amount, phoneNumber } = await request.json()

    if (!amount || !phoneNumber) {
      return NextResponse.json({ error: "Amount and phone number are required." }, { status: 400 })
    }

    // --- Step 1: Authenticate with Pesapal ---
    console.log("Attempting Pesapal Authentication...")
    const authResponse = await fetch(`${PESAPAL_BASE_URL}/api/Auth/RequestToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        consumer_key: PESAPAL_CONSUMER_KEY,
        consumer_secret: PESAPAL_CONSUMER_SECRET,
      }),
    })

    if (!authResponse.ok) {
      const errorData = await authResponse.json()
      console.error("Pesapal Authentication failed:", errorData)
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to authenticate with Pesapal." },
        { status: authResponse.status },
      )
    }

    const authData = await authResponse.json()
    const accessToken = authData.token
    if (!accessToken) {
      console.error("Pesapal Authentication successful but no token received:", authData)
      return NextResponse.json({ error: "Authentication successful but no access token received." }, { status: 500 })
    }
    console.log("Pesapal Authentication successful. Token received.")

    // --- Step 2: Submit Order Request ---
    const orderId = `ORDER-${Date.now()}` // Unique order ID for your system
    // This is the URL Pesapal redirects the USER'S BROWSER to after payment completion
    const clientCallbackUrl = `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}/payment-callback`

    const pesapalPayload = {
      id: orderId, // Your unique order reference
      currency: "KES",
      amount: amount,
      description: `Payment for order ${orderId}`,
      callback_url: clientCallbackUrl, // User's browser redirect after payment
      notification_id: PESAPAL_IPN_ID, // Your registered IPN ID (server-to-server)
      redirect_mode: "TOP_WINDOW", // Or "PARENT_WINDOW" if using iframe
      billing_address: {
        phone_number: phoneNumber,
        // email_address: "customer@example.com", // Optional if phone_number is provided
        // first_name: "John", // Optional
        // last_name: "Doe", // Optional
      },
      // Add other optional fields like branch, customer details if needed
    }

    console.log("Submitting Pesapal Order Request with payload:", pesapalPayload)

    const pesapalResponse = await fetch(`${PESAPAL_BASE_URL}/api/Transactions/SubmitOrderRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(pesapalPayload),
    })

    const pesapalData = await pesapalResponse.json()

    if (!pesapalResponse.ok) {
      console.error("Pesapal SubmitOrderRequest API error:", pesapalData)
      return NextResponse.json(
        { error: pesapalData.error?.message || "Failed to submit order request to Pesapal." },
        { status: pesapalResponse.status },
      )
    }

    // Pesapal returns a redirect_url which the client must navigate to
    const redirectUrl = pesapalData.redirect_url
    if (!redirectUrl) {
      console.error("SubmitOrderRequest successful but no redirect_url received:", pesapalData)
      return NextResponse.json(
        { error: "Payment initiation successful but no redirect URL received." },
        { status: 500 },
      )
    }

    console.log("Pesapal Order Request successful. Redirect URL:", redirectUrl)
    return NextResponse.json(
      {
        message: "Order submitted successfully. Redirecting to Pesapal for payment.",
        redirectUrl: redirectUrl,
        orderTrackingId: pesapalData.order_tracking_id, // Pesapal's unique ID for the transaction
        merchantReference: pesapalData.merchant_reference, // Your 'id' from the request
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
