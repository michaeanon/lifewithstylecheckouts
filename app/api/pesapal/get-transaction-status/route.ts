import { NextResponse } from "next/server"

const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY || "YOUR_PESAPAL_CONSUMER_KEY"
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET || "YOUR_PESAPAL_CONSUMER_SECRET"
const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3" // Live URL

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderTrackingId = searchParams.get("orderTrackingId")

  if (!orderTrackingId) {
    return NextResponse.json({ error: "Order Tracking ID is required." }, { status: 400 })
  }

  try {
    // --- Step 1: Authenticate with Pesapal ---
    console.log("Attempting Pesapal Authentication for GetTransactionStatus...")
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
      console.error("Pesapal Authentication failed for GetTransactionStatus:", errorData)
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to authenticate with Pesapal." },
        { status: authResponse.status },
      )
    }

    const authData = await authResponse.json()
    const accessToken = authData.token
    if (!accessToken) {
      console.error("Pesapal Authentication successful but no token received for GetTransactionStatus:", authData)
      return NextResponse.json({ error: "Authentication successful but no access token received." }, { status: 500 })
    }
    console.log("Pesapal Authentication successful. Token received for GetTransactionStatus.")

    // --- Step 2: Get Transaction Status ---
    console.log(`Fetching transaction status for Order Tracking ID: ${orderTrackingId}`)
    const statusResponse = await fetch(
      `${PESAPAL_BASE_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    const statusData = await statusResponse.json()

    if (!statusResponse.ok) {
      console.error("Pesapal GetTransactionStatus API error:", statusData)
      return NextResponse.json(
        { error: statusData.error?.message || "Failed to fetch transaction status from Pesapal." },
        { status: statusResponse.status },
      )
    }

    console.log("Successfully fetched transaction status:", statusData)
    return NextResponse.json(statusData, { status: 200 })
  } catch (error) {
    console.error("Server error fetching transaction status:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
