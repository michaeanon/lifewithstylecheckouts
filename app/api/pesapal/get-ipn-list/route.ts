import { NextResponse } from "next/server"

const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY || "YOUR_PESAPAL_CONSUMER_KEY"
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET || "YOUR_PESAPAL_CONSUMER_SECRET"
const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3" // Sandbox URL

export async function GET() {
  try {
    // --- Step 1: Authenticate with Pesapal to get an Access Token ---
    console.log("Attempting Pesapal Authentication for IPN List...")
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
      console.error("Pesapal Authentication failed for IPN List:", errorData)
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to authenticate with Pesapal." },
        { status: authResponse.status },
      )
    }

    const authData = await authResponse.json()
    const accessToken = authData.token
    if (!accessToken) {
      console.error("Pesapal Authentication successful but no token received for IPN List:", authData)
      return NextResponse.json({ error: "Authentication successful but no access token received." }, { status: 500 })
    }
    console.log("Pesapal Authentication successful. Token received for IPN List.")

    // --- Step 2: Fetch Registered IPN List ---
    console.log("Fetching registered IPN list...")
    const ipnListResponse = await fetch(`${PESAPAL_BASE_URL}/api/URLSetup/GetIPNList`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const ipnListData = await ipnListResponse.json()

    if (!ipnListResponse.ok) {
      console.error("Pesapal GetIPNList API error:", ipnListData)
      return NextResponse.json(
        { error: ipnListData.error?.message || "Failed to fetch IPN list from Pesapal." },
        { status: ipnListResponse.status },
      )
    }

    console.log("Successfully fetched IPN list:", ipnListData)
    return NextResponse.json(ipnListData, { status: 200 })
  } catch (error) {
    console.error("Server error fetching IPN list:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
