"use server"

import { Resend } from "resend"

// Email templates
const adminEmailTemplate = (name: string, email: string, subject: string, message: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0284c7; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
    .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>New Contact Form Submission</h1>
  </div>
  <div class="content">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <h3>Message:</h3>
    <p>${message.replace(/\n/g, "<br>")}</p>
  </div>
  <div class="footer">
    <p>This email was sent from your Robel Fit website contact form.</p>
  </div>
</body>
</html>
`

const autoResponderTemplate = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank you for contacting Robel Fit</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #0284c7; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
    .footer { margin-top: 20px; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Thank You for Contacting Us</h1>
  </div>
  <div class="content">
    <p>Hello ${name},</p>
    <p>Thank you for reaching out to Robel Fit. We have received your message and will get back to you as soon as possible.</p>
    <p>In the meantime, feel free to check out our workout guides and resources on our website.</p>
    <p>Best regards,<br>The Robel Fit Team</p>
  </div>
  <div class="footer">
    <p>This is an automated response. Please do not reply to this email.</p>
  </div>
</body>
</html>
`

// Check if we're in a production environment
const isProduction = process.env.NODE_ENV === "production"

// Initialize Resend only in production
let resend: Resend | null = null
if (isProduction && process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY)
}

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string
    const honeypot = formData.get("website") as string

    // Check honeypot field - if it's filled, it's likely a bot
    if (honeypot) {
      console.log("Spam detected via honeypot")
      // Return success to the bot but don't actually send the email
      return {
        success: true,
        message: "Your message has been sent successfully! We will get back to you soon.",
      }
    }

    // Validate form data
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "Please fill out all fields",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      }
    }

    // In production, use Resend to send actual emails
    if (isProduction && resend) {
      // Send email to admin
      const adminEmailResult = await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: process.env.EMAIL_TO || "your-email@example.com",
        subject: `Contact Form: ${subject}`,
        html: adminEmailTemplate(name, email, subject, message),
        reply_to: email,
      })

      if (adminEmailResult.error) {
        console.error("Error sending admin email:", adminEmailResult.error)
        throw new Error("Failed to send email to admin")
      }

      // Send auto-responder email to the user
      const autoResponderResult = await resend.emails.send({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: email,
        subject: "Thank you for contacting Robel Fit",
        html: autoResponderTemplate(name),
      })

      if (autoResponderResult.error) {
        console.error("Error sending auto-responder:", autoResponderResult.error)
        // We don't throw here because the main email was sent successfully
      }
    } else {
      // In development/preview, simulate sending emails
      console.log("📧 SIMULATED EMAIL: Admin notification would be sent to", process.env.EMAIL_TO)
      console.log("📧 Email details:", {
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: process.env.EMAIL_TO || "your-email@example.com",
        subject: `Contact Form: ${subject}`,
        replyTo: email,
        content: `Name: ${name}, Email: ${email}, Subject: ${subject}, Message: ${message}`,
      })

      console.log("📧 SIMULATED EMAIL: Auto-responder would be sent to", email)

      // Simulate a delay to mimic sending an email
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    return {
      success: true,
      message: "Your message has been sent successfully! We will get back to you soon.",
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    }
  }
}
