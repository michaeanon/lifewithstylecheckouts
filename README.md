# ✨ Life with Style Payment Gateway

![Life with Style Logo](public/images/life-with-style-official-logo.jpeg)

Welcome to the **Life with Style Payment Gateway**, a secure and elegant checkout solution powered by Pesapal. This application provides a seamless payment experience for customers, integrating M-Pesa STK Push and offering alternative payment methods for transactions.

## 🌟 Features

*   **Secure Pesapal Integration:** Process payments safely and reliably via Pesapal's API.
*   **M-Pesa STK Push:** Initiate mobile money payments directly from the checkout page.
*   **Alternative Payment Options:** Clearly display "Send Money" and "Paybill" details for larger transactions or alternative methods.
*   **Responsive Design:** Optimized for both desktop and mobile devices, ensuring a consistent user experience.
*   **Dynamic UI:** Interactive elements, animations, and popovers for a modern feel.
*   **Transaction Status Tracking:** Real-time updates on payment status after redirection.
*   **Terms & Conditions Page:** Dedicated section for legal and service information.
*   **Particle Background:** Visually appealing animated background for an enhanced user interface.

## 🚀 Technologies Used

This project is built with the latest web technologies to ensure performance, scalability, and a great developer experience:

*   **Next.js 14+ (App Router):** A React framework for building full-stack web applications.
*   **React:** For building interactive user interfaces.
*   **TypeScript:** For type safety and improved code quality.
*   **Tailwind CSS:** A utility-first CSS framework for rapid styling.
*   **shadcn/ui:** Reusable UI components built with Radix UI and Tailwind CSS.
*   **Pesapal API:** For handling payment processing.
*   **Lucide React:** A collection of beautiful and customizable open-source icons.
*   **`@tsparticles/react`:** For the interactive particle background.


Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💡 Usage

*   **Payment Checkout:** Enter an amount and M-Pesa phone number on the main page to initiate an STK Push.
*   **Transaction Limit:** For amounts over KES 1,000, a popover will guide users to alternative payment methods (Send Money, Paybill).
*   **Navigation:** Use the side menu (desktop) or mobile menu (mobile) to navigate to the main website, shop, or terms and conditions.
*   **Terms & Conditions:** Review the detailed terms and conditions for services and payments.

## 🔗 API Endpoints

The application exposes the following API routes for Pesapal integration:

*   `POST /api/pesapal/stk-push`: Initiates an M-Pesa STK Push payment.
*   `GET /api/pesapal/get-transaction-status`: Retrieves the status of a Pesapal transaction using an `orderTrackingId`.
*   `POST /api/pesapal/cancel-order`: Cancels a Pesapal order.
*   `POST /api/pesapal/refund`: Initiates a refund for a Pesapal transaction.
*   `GET /api/pesapal/get-ipn-list`: Fetches the list of registered IPN URLs.
*   `GET/POST /api/pesapal/ipn-callback`: Pesapal's Instant Payment Notification (IPN) endpoint for server-to-server communication.


## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 📞 Contact

For any questions or support, please reach out:

*   **WhatsApp:** +254797952689
*   **Main Website:** [lifewithstyle.vercel.app](https://lifewithstyle.vercel.app/)

---

Made with ❤️ by ANONYMIKE.
