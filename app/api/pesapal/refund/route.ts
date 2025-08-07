import { NextResponse } from "next/server"

const PESAPAL_CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY || "YOUR_PESAPAL_CONSUMER_KEY"
const PESAPAL_CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET || "YOUR_PESAPAL_CONSUMER_SECRET"
const PESAPAL_BASE_URL = "https://pay.pesapal.com/v3" // Sandbox URL

export async function POST(request: Request) {
  try {
    const { confirmationCode, amount, username, remarks } = await request.json()

    if (!confirmationCode || !amount || !username || !remarks) {
      return NextResponse.json(
        { error: "Confirmation code, amount, username, and remarks are required for a refund." },
        { status: 400 },
      )
    }

    // --- Step 1: Authenticate with Pesapal ---
    console.log("Attempting Pesapal Authentication for Refund Request...")
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
      console.error("Pesapal Authentication failed for Refund Request:", errorData)
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to authenticate with Pesapal." },
        { status: authResponse.status },
      )
    }

    const authData = await authResponse.json()
    const accessToken = authData.token
    if (!accessToken) {
      console.error("Pesapal Authentication successful but no token received for Refund Request:", authData)
      return NextResponse.json({ error: "Authentication successful but no access token received." }, { status: 500 })
    }
    console.log("Pesapal Authentication successful. Token received for Refund Request.")

    // --- Step 2: Submit Refund Request ---
    const refundPayload = {
      confirmation_code: confirmationCode,
      amount: amount,
      username: username,
      remarks: remarks,
    }

    console.log("Submitting Pesapal Refund Request with payload:", refundPayload)

    const refundResponse = await fetch(`${PESAPAL_BASE_URL}/api/Transactions/RefundRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(refundPayload),
    })

    const refundData = await refundResponse.json()

    if (!refundResponse.ok) {
      console.error("Pesapal RefundRequest API error:", refundData)
      return NextResponse.json(
        { error: refundData.error?.message || "Failed to submit refund request to Pesapal." },
        { status: refundResponse.status },
      )
    }

    // Check Pesapal's specific success/error codes for refunds
    if (refundData.error === 200) {
      // Assuming 200 means success as per docs
      console.log("Pesapal Refund Request successful:", refundData)
      return NextResponse.json(
        { message: refundData.message || "Refund request submitted successfully." },
        { status: 200 },
      )
    } else {
      console.error("Pesapal Refund Request failed with error code:", refundData)
      return NextResponse.json(
        { error: refundData.message || "Refund request failed." },
        { status: 500 }, // Or appropriate status based on Pesapal's error codes
      )
    }
  } catch (error) {
    console.error("Server error submitting refund request:", error)
    return NextResponse.json({ error: "Internal server error." }, { status: 500 })
  }
}
