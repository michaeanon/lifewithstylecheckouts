import { NextResponse } from "next/server"

/**
 * Handles GET requests to the IPN callback URL.
 * This might be used by Pesapal for initial URL verification or for debugging.
 */
export async function GET(request: Request) {
  console.log("Received GET request to IPN callback URL.")
  const { searchParams } = new URL(request.url)
  const verificationParam = searchParams.get("verification_code")

  if (verificationParam) {
    console.log("Verification parameter received:", verificationParam)
    return NextResponse.json({ message: "IPN URL verified successfully.", code: verificationParam }, { status: 200 })
  }

  return NextResponse.json({ message: "IPN callback endpoint is active (GET)." }, { status: 200 })
}

/**
 * Handles POST requests to the IPN callback URL.
 * This is the primary method Pesapal uses to send actual transaction notifications.
 */
export async function POST(request: Request) {
  try {
    const ipnData = await request.json()
    console.log("Received Pesapal IPN (POST):", ipnData)

    // --- IMPORTANT: Implement IPN Verification and Processing Logic Here ---
    // 1. Verify the IPN: Pesapal usually provides a way to verify the authenticity of the IPN.
    //    This might involve checking a signature or making a separate API call to Pesapal.
    //    DO NOT process the payment until the IPN is verified as legitimate.
    // 2. Process the transaction status:
    //    - Check `ipnData.status` or similar fields to determine if the payment was successful, failed, etc.
    //    - Update your database: Mark the order as paid, update user balance, etc.
    //    - Handle edge cases: What if the IPN is received multiple times? Ensure idempotency.

    // Extract necessary data from the incoming IPN for the response
    const orderTrackingId = ipnData.order_tracking_id || ipnData.OrderTrackingId // Use consistent casing
    const orderMerchantReference = ipnData.merchant_reference || ipnData.OrderMerchantReference // Use consistent casing
    const orderNotificationType = ipnData.order_notification_type || ipnData.OrderNotificationType || "IPNCHANGE" // Default to IPNCHANGE

    // Example of a simplified processing logic:
    const transactionStatus = ipnData.status // Assuming 'status' field exists
    // const orderTrackingId = ipnData.order_tracking_id // Already extracted above

    if (transactionStatus === "COMPLETED") {
      console.log(`Payment for Order ${orderTrackingId} COMPLETED.`)
      // Logic to update your order status in the database
    } else if (transactionStatus === "FAILED") {
      console.log(`Payment for Order ${orderTrackingId} FAILED.`)
      // Logic to handle failed payment (e.g., notify user, log error)
    } else {
      console.log(`Payment for Order ${orderTrackingId} has status: ${transactionStatus}`)
      // Handle other statuses like PENDING, CANCELLED, etc.
    }

    // --- Respond to Pesapal with the specified JSON format ---
    // This tells Pesapal that you have successfully received and processed the IPN.
    return NextResponse.json(
      {
        OrderNotificationType: orderNotificationType,
        OrderTrackingId: orderTrackingId,
        OrderMerchantReference: orderMerchantReference,
        status: "200", // Indicate successful receipt and processing of the IPN
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing Pesapal IPN (POST):", error)
    // Return a 500 error if there was an issue processing, Pesapal might retry
    return NextResponse.json({ error: "Failed to process IPN." }, { status: 500 })
  }
}
