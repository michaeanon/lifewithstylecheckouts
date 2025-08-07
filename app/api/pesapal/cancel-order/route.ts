import { NextResponse } from "next/server"

const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY || "YOUR_PESAPAL_CONSUMER_KEY"
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET || "YOUR_PESAPAL_CONSUMER_SECRET"
const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3" // Sandbox URL

export async function POST(request: Request) {
  try {
    const { orderTrackingId } = await request.json()

    if (!orderTrackingId) {
      return NextResponse.json({ error: "Order Tracking ID is required for cancellation." }, { status: 400 })
    }

    // --- Step 1: Authenticate with Pesapal ---
    console.log("Attempting Pesapal Authentication for Order Cancellation...")
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
      console.error("Pesapal Authentication failed for Order Cancellation:", errorData)
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to authenticate with Pesapal." },
        { status: authResponse.status },
      )
    }

    const authData = await authResponse.json()
    const accessToken = authData.token
    if (!accessToken) {
      console.error("Pesapal Authentication successful but no token received for Order Cancellation:", authData)
      return NextResponse.json({ error: "Authentication successful but no access token received." }, { status: 500 })
    }
    console.log("Pesapal Authentication successful. Token received for Order Cancellation.")

    // --- Step 2: Submit Order Cancellation Request ---
    const cancellationPayload = {
      order_tracking_id: orderTrackingId,
    }

    console.log("Submitting Pesapal Order Cancellation Request with payload:", cancellationPayload)

    const cancelResponse = await fetch(`${PESAPAL_BASE_URL}/api/Transactions/CancelOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(cancellationPayload),
    })

    const cancelData = await cancelResponse.json()

    if (!cancelResponse.ok) {
      console.error("Pesapal CancelOrder API error:", cancelData)
      return NextResponse.json(
        { error: cancelData.message || "Failed to submit order cancellation request to Pesapal." },
        { status: cancelResponse.status },
      )
    }

    // Check Pesapal's specific status codes for cancellation
    if (cancelData.status === "200") {
      console.log("Pesapal Order Cancellation successful:", cancelData)
      return NextResponse.json({ message: cancelData.message || "Order successfully cancelled." }, { status: 200 })
    } else {
      console.error("Pesapal Order Cancellation failed with status:", cancelData)
      return NextResponse.json(
        { error: cancelData.message || "Order could not be cancelled." },
        { status: 500 }, // Or appropriate status based on Pesapal's error codes
      )
    }
  } catch (error) {
    console.error("Server error submitting order cancellation request:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
