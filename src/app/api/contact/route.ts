import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

// Create reusable transporter
function createTransporter() {
    // Check if Gmail credentials are configured
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;

    if (!user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: user,
            pass: pass,
        },
    });
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();

        // Validate required fields
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Validate message length
        if (message.length < 10) {
            return NextResponse.json(
                { error: "Message must be at least 10 characters" },
                { status: 400 }
            );
        }

        if (message.length > 5000) {
            return NextResponse.json(
                { error: "Message must be less than 5000 characters" },
                { status: 400 }
            );
        }

        // Log the submission
        console.log("=== New Contact Form Submission ===");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Subject:", subject);
        console.log("Message:", message);
        console.log("Timestamp:", new Date().toISOString());
        console.log("===================================");

        // Try to send email if SMTP is configured
        const transporter = createTransporter();

        if (transporter) {
            try {
                // Send email to yourself
                await transporter.sendMail({
                    from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
                    to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
                    replyTo: email,
                    subject: `[Portfolio Contact] ${subject}`,
                    text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from your portfolio contact form
          `,
                    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 5px; }
    .message-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; }
    .footer { margin-top: 20px; font-size: 12px; color: #9ca3af; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${name} (${email})</div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
      </div>
    </div>
    <div class="footer">
      Sent from your portfolio contact form at ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>
          `,
                });

                console.log("Email sent successfully!");
            } catch (emailError) {
                console.error("Failed to send email:", emailError);
                // Don't fail the request if email fails, just log it
            }
        } else {
            console.log(
                "Gmail not configured. Set GMAIL_USER and GMAIL_PASS environment variables to enable email sending."
            );
        }

        // Return success response
        return NextResponse.json(
            {
                success: true,
                message: "Thank you for your message! I will get back to you soon.",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to process your message. Please try again." },
            { status: 500 }
        );
    }
}

// Handle other methods
export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
