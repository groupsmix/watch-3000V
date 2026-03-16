---
title: "Contact Us"
slug: "/contact/"
template: static
meta_title: "Contact Us — WristNerd"
meta_description: "Get in touch with the WristNerd team. Questions about watch recommendations, corrections, partnership inquiries, or just to say hello."
schema_types:
  - WebPage
  - ContactPage
  - BreadcrumbList
og_title: "Contact Us — WristNerd"
og_description: "Get in touch with the WristNerd team. We read every message and respond within 48 hours."
canonical: "https://wristnerd.xyz/contact/"
word_count_target: "400–600"
last_updated: "2026-03-16"
image_notes:
  hero: "No image needed — clean, text-focused layout with contact form."
---

<!-- ============================================ -->
<!-- STATIC PAGE: Contact                         -->
<!-- ============================================ -->

<!-- SECTION: Breadcrumbs -->

Home > Contact

---

# Contact Us

Have a question, suggestion, or just want to say hello? We'd love to hear from you.

We read every message and respond within **48 hours** (usually faster).

---

## Get in Touch

### Email

The fastest way to reach us:

**[hello@wristnerd.xyz](mailto:hello@wristnerd.xyz)**

---

### Contact Form

<!-- Form fields: Name (required), Email (required), Subject (dropdown), Message (required textarea) -->
<!-- Form submission: sends email to hello@wristnerd.xyz via backend form handler (Formspree, Netlify Forms, or custom) -->
<!-- Success message: "Thanks! We've received your message and will get back to you within 48 hours." -->

| Field | Type | Required |
|-------|------|----------|
| **Your Name** | Text input | Yes |
| **Your Email** | Email input | Yes |
| **Subject** | Dropdown | Yes |
| **Your Message** | Textarea (min 4 rows) | Yes |

**Subject dropdown options:**
- Watch recommendation question
- Correction or update request
- Partnership / collaboration inquiry
- Press or media inquiry
- Technical issue with the site
- Other

**[Send Message →]**

<!-- Spam protection: honeypot field + reCAPTCHA v3 (invisible) -->

---

## What We Can Help With

### Watch Questions
Not sure what watch to get? Already used our [Gift Finder Quiz](/gift-finder/) but want more personalized advice? We're happy to help narrow it down. Include details like:
- Who the watch is for (relationship, age, personality)
- The occasion (birthday, holiday, anniversary, etc.)
- Your budget
- Any style preferences or watches he currently wears

### Corrections & Updates
Found a price that's changed? A watch that's been discontinued? A broken link? Let us know and we'll update the guide. We take accuracy seriously.

### Partnerships
We selectively consider partnerships with watch brands, retailers, and complementary businesses. If you'd like to discuss a collaboration, please include:
- Your company/brand name
- What you're proposing
- Relevant links or materials

**Note:** We do not accept payment for editorial placements or rankings. See our [Affiliate Disclosure →](/affiliate-disclosure/) for details on how we maintain editorial independence.

### Press & Media
For press inquiries, interview requests, or media quotes, email us directly at **hello@wristnerd.xyz** with "Press" in the subject line.

---

## Response Times

| Inquiry Type | Expected Response |
|--------------|-------------------|
| Watch questions | Within 48 hours |
| Corrections | Within 24 hours |
| Partnerships | Within 5 business days |
| Press/Media | Within 48 hours |

---

## Find Us

- **Website:** [wristnerd.xyz](https://wristnerd.xyz/)
- **Email:** [hello@wristnerd.xyz](mailto:hello@wristnerd.xyz)

---

<!-- ============================================ -->
<!-- INTERNAL LINK SUMMARY                        -->
<!-- ============================================ -->

**Internal Links on This Page:**

1. /gift-finder/ (Watch questions section)
2. /affiliate-disclosure/ (Partnerships section)

<!-- ============================================ -->
<!-- JSON-LD SCHEMA MARKUP                        -->
<!-- ============================================ -->

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "name": "Contact Us",
      "description": "Get in touch with the WristNerd team.",
      "url": "https://wristnerd.xyz/contact/",
      "mainEntity": {
        "@type": "Organization",
        "name": "WristNerd",
        "url": "https://wristnerd.xyz/",
        "email": "hello@wristnerd.xyz",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "hello@wristnerd.xyz",
          "contactType": "customer service",
          "availableLanguage": "English"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wristnerd.xyz/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://wristnerd.xyz/contact/" }
      ]
    }
  ]
}
```

<!-- END CONTACT PAGE -->
