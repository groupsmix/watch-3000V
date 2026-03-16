import { NextRequest, NextResponse } from "next/server";

/**
 * Email subscription API route.
 *
 * Supports ConvertKit and Mailchimp backends via environment variables.
 * Set one of:
 *   - CONVERTKIT_API_KEY + CONVERTKIT_FORM_ID
 *   - MAILCHIMP_API_KEY + MAILCHIMP_LIST_ID + MAILCHIMP_SERVER_PREFIX
 *
 * If neither is configured, stores email in a local log (dev mode).
 */

interface SubscribeRequest {
  email: string;
  honeypot?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubscribeRequest;

    // Honeypot spam check — if filled, silently succeed
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    // Validate email
    const email = body.email?.trim().toLowerCase();
    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // ConvertKit integration
    const ckApiKey = process.env.CONVERTKIT_API_KEY;
    const ckFormId = process.env.CONVERTKIT_FORM_ID;

    if (ckApiKey && ckFormId) {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${ckFormId}/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: ckApiKey,
            email,
            tags: body.source ? [body.source] : [],
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("ConvertKit error:", errorData);
        return NextResponse.json(
          { error: "Subscription failed. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, provider: "convertkit" });
    }

    // Mailchimp integration
    const mcApiKey = process.env.MAILCHIMP_API_KEY;
    const mcListId = process.env.MAILCHIMP_LIST_ID;
    const mcServer = process.env.MAILCHIMP_SERVER_PREFIX;

    if (mcApiKey && mcListId && mcServer) {
      const res = await fetch(
        `https://${mcServer}.api.mailchimp.com/3.0/lists/${mcListId}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `apikey ${mcApiKey}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            tags: body.source ? [body.source] : [],
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        // Already subscribed is not an error
        if (errorData.title === "Member Exists") {
          return NextResponse.json({ success: true, provider: "mailchimp" });
        }
        console.error("Mailchimp error:", errorData);
        return NextResponse.json(
          { error: "Subscription failed. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, provider: "mailchimp" });
    }

    // Fallback: log to console in development
    console.log(`[Email Signup] ${email} — source: ${body.source || "unknown"}`);
    return NextResponse.json({
      success: true,
      provider: "none",
      message: "Email provider not configured. Email logged for development.",
    });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
