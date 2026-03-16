# WristNerd.xyz — Site Architecture & Wireframes

> **Version:** 1.0
> **Date:** March 15, 2026
> **Status:** Awaiting client approval before proceeding to Content Planning (Step 4)

---

## Table of Contents

1. [Complete Sitemap](#1-complete-sitemap)
2. [Detailed Wireframe Descriptions](#2-detailed-wireframe-descriptions)
3. [User Journey Flows](#3-user-journey-flows)
4. [Full Feature List](#4-full-feature-list)

---

## 1. Complete Sitemap

### 1.1 Top-Level Navigation Structure

```
WristNerd.xyz
├── Home
├── Gift Guides (mega-menu dropdown)
│   ├── By Occasion
│   │   ├── Father's Day Watches
│   │   ├── Christmas Gift Watches
│   │   ├── Birthday Watch Gifts
│   │   ├── Valentine's Day Watches
│   │   ├── Anniversary Watch Gifts
│   │   └── Graduation Watch Gifts
│   ├── By Budget
│   │   ├── Best Watches Under $100
│   │   ├── Best Watches Under $200
│   │   ├── Best Watches Under $300
│   │   ├── Best Watches Under $500
│   │   └── Luxury Watches ($500–$2,000)
│   └── By Recipient
│       ├── Watches for Husbands
│       ├── Watches for Dads
│       ├── Watches for Boyfriends
│       ├── Watches for Sons
│       └── Watches for Friends / Colleagues
├── Reviews
│   ├── [Individual Watch Review Pages]
│   └── [Brand Spotlight Pages]
├── Compare
│   └── [Watch A vs Watch B Pages]
├── Gift Finder Quiz
├── Blog
│   └── [Blog Post Pages]
├── Deals (Phase 2)
├── About
├── Contact
├── Privacy Policy
├── Affiliate Disclosure
└── Terms of Use
```

### 1.2 Full URL Structure

| Page Type | URL Pattern | Example |
|---|---|---|
| **Homepage** | `/` | `wristnerd.xyz/` |
| **Occasion Landing** | `/gift-guides/{occasion}/` | `/gift-guides/fathers-day/` |
| **Budget Landing** | `/best-watches-under-{amount}/` | `/best-watches-under-200/` |
| **Recipient Landing** | `/watches-for-{recipient}/` | `/watches-for-husbands/` |
| **Best-Of Roundup** | `/best-{type}-watches-for-{context}/` | `/best-seiko-watches-for-dads/` |
| **Single Review** | `/reviews/{brand}-{model}/` | `/reviews/seiko-presage-srpd37/` |
| **Brand Spotlight** | `/brands/{brand-name}/` | `/brands/seiko/` |
| **Comparison** | `/compare/{watch-a}-vs-{watch-b}/` | `/compare/seiko-5-vs-orient-bambino/` |
| **Gift Finder Quiz** | `/gift-finder/` | `/gift-finder/` |
| **Quiz Results** | `/gift-finder/results/` | `/gift-finder/results/?budget=200&occasion=birthday&recipient=husband` |
| **Blog Post** | `/blog/{post-slug}/` | `/blog/how-to-choose-a-watch-size/` |
| **Blog Index** | `/blog/` | `/blog/` |
| **Deals Page** | `/deals/` | `/deals/` (Phase 2) |
| **About** | `/about/` | `/about/` |
| **Contact** | `/contact/` | `/contact/` |
| **Privacy** | `/privacy-policy/` | `/privacy-policy/` |
| **Affiliate Disclosure** | `/affiliate-disclosure/` | `/affiliate-disclosure/` |
| **Terms** | `/terms/` | `/terms/` |

### 1.3 Complete Page Inventory

#### Occasion Pages (6 pages)
| # | Page Title | URL |
|---|---|---|
| 1 | Best Gift Watches for Father's Day 2026 | `/gift-guides/fathers-day/` |
| 2 | Best Christmas Gift Watches for Men | `/gift-guides/christmas/` |
| 3 | Best Birthday Watch Gifts for Him | `/gift-guides/birthday/` |
| 4 | Best Valentine's Day Watches for Him | `/gift-guides/valentines-day/` |
| 5 | Best Anniversary Watch Gifts for Husband | `/gift-guides/anniversary/` |
| 6 | Best Graduation Watch Gifts | `/gift-guides/graduation/` |

#### Budget Pages (5 pages)
| # | Page Title | URL |
|---|---|---|
| 1 | 15 Best Watches Under $100 (That Look Expensive) | `/best-watches-under-100/` |
| 2 | 12 Best Watches Under $200 for Every Man | `/best-watches-under-200/` |
| 3 | 10 Best Watches Under $300 Worth Gifting | `/best-watches-under-300/` |
| 4 | 10 Best Watches Under $500 — Premium Picks | `/best-watches-under-500/` |
| 5 | Best Luxury Gift Watches for Men ($500–$2,000) | `/best-luxury-gift-watches/` |

#### Recipient Pages (5 pages)
| # | Page Title | URL |
|---|---|---|
| 1 | Best Watch Gifts for Husbands | `/watches-for-husbands/` |
| 2 | Best Watch Gifts for Dads | `/watches-for-dads/` |
| 3 | Best Watch Gifts for Boyfriends | `/watches-for-boyfriends/` |
| 4 | Best Watch Gifts for Sons (18–30) | `/watches-for-sons/` |
| 5 | Best Watch Gifts for Friends & Colleagues | `/watches-for-friends/` |

#### Brand Spotlight Pages (6 initial pages)
| # | Page Title | URL |
|---|---|---|
| 1 | Seiko: Best Gift-Worthy Watches | `/brands/seiko/` |
| 2 | Citizen: Best Gift-Worthy Watches | `/brands/citizen/` |
| 3 | Fossil: Best Gift-Worthy Watches | `/brands/fossil/` |
| 4 | Tissot: Best Gift-Worthy Watches | `/brands/tissot/` |
| 5 | Orient: Best Gift-Worthy Watches | `/brands/orient/` |
| 6 | Hamilton: Best Gift-Worthy Watches | `/brands/hamilton/` |

#### Single Review Pages (10 initial launch reviews)
| # | Page Title | URL |
|---|---|---|
| 1 | Seiko Presage SRPD37 Review | `/reviews/seiko-presage-srpd37/` |
| 2 | Citizen Eco-Drive BM8180-03E Review | `/reviews/citizen-eco-drive-bm8180/` |
| 3 | Orient Bambino V2 Review | `/reviews/orient-bambino-v2/` |
| 4 | Tissot PRX Review | `/reviews/tissot-prx/` |
| 5 | Seiko 5 Sports SRPD55 Review | `/reviews/seiko-5-srpd55/` |
| 6 | Fossil Neutra Chronograph Review | `/reviews/fossil-neutra-chronograph/` |
| 7 | Hamilton Khaki Field Mechanical Review | `/reviews/hamilton-khaki-field-mechanical/` |
| 8 | Casio G-Shock GA2100 Review | `/reviews/casio-g-shock-ga2100/` |
| 9 | Timex Marlin Automatic Review | `/reviews/timex-marlin-automatic/` |
| 10 | Bulova Lunar Pilot Review | `/reviews/bulova-lunar-pilot/` |

#### Comparison Pages (5 initial pages)
| # | Page Title | URL |
|---|---|---|
| 1 | Seiko 5 vs Orient Bambino: Which Is the Better Gift? | `/compare/seiko-5-vs-orient-bambino/` |
| 2 | Tissot PRX vs Hamilton Khaki Field | `/compare/tissot-prx-vs-hamilton-khaki-field/` |
| 3 | Citizen Eco-Drive vs Seiko Solar | `/compare/citizen-eco-drive-vs-seiko-solar/` |
| 4 | Fossil vs Seiko: Which Brand Makes Better Gifts? | `/compare/fossil-vs-seiko/` |
| 5 | Casio G-Shock vs Timex Expedition: Best Rugged Gift | `/compare/casio-g-shock-vs-timex-expedition/` |

#### Blog Posts (10 initial editorial articles)
| # | Page Title | URL |
|---|---|---|
| 1 | How to Choose the Right Watch Size for a Gift | `/blog/how-to-choose-watch-size/` |
| 2 | Automatic vs Quartz: Which Is Better for a Gift? | `/blog/automatic-vs-quartz-gift/` |
| 3 | Watch Gift Wrapping Ideas That Impress | `/blog/watch-gift-wrapping-ideas/` |
| 4 | 7 Signs He's a Watch Guy (And What to Get Him) | `/blog/signs-hes-a-watch-guy/` |
| 5 | What to Engrave on a Watch: 50+ Ideas | `/blog/watch-engraving-ideas/` |
| 6 | First Watch Gift? Here's What Every Beginner Should Know | `/blog/first-watch-gift-guide/` |
| 7 | Why Watches Make the Best Gifts for Men | `/blog/why-watches-best-gifts/` |
| 8 | Watch Brands to Avoid (And What to Buy Instead) | `/blog/watch-brands-to-avoid/` |
| 9 | How to Buy a Watch Online Without Trying It On | `/blog/buying-watch-online-tips/` |
| 10 | The Ultimate Watch Care Guide (Include with Your Gift) | `/blog/watch-care-guide/` |

#### Static / Utility Pages (5 pages)
| # | Page | URL |
|---|---|---|
| 1 | About WristNerd | `/about/` |
| 2 | Contact Us | `/contact/` |
| 3 | Privacy Policy | `/privacy-policy/` |
| 4 | Affiliate Disclosure | `/affiliate-disclosure/` |
| 5 | Terms of Use | `/terms/` |

#### Interactive Feature Pages (1 page + results)
| # | Page | URL |
|---|---|---|
| 1 | Gift Finder Quiz | `/gift-finder/` |
| 2 | Quiz Results (dynamic) | `/gift-finder/results/` |

### 1.4 Total Page Count at Launch

| Category | Count |
|---|---|
| Homepage | 1 |
| Occasion Pages | 6 |
| Budget Pages | 5 |
| Recipient Pages | 5 |
| Brand Spotlights | 6 |
| Single Reviews | 10 |
| Comparison Pages | 5 |
| Blog Posts | 10 |
| Gift Finder (Quiz + Results) | 2 |
| Static Pages | 5 |
| **Total** | **55 pages** |

### 1.5 Internal Linking Architecture

```
Homepage
├── Links to → All 6 Occasion Pages (seasonal cards)
├── Links to → All 5 Budget Pages (budget picker bar)
├── Links to → Gift Finder Quiz (hero CTA)
├── Links to → Top 3 Featured Reviews (editorial picks)
│
Occasion Pages
├── Links to → Relevant Budget Pages ("Shop by budget")
├── Links to → Relevant Single Reviews (product cards)
├── Links to → Related Blog Posts (contextual sidebar)
├── Links to → Gift Finder Quiz (inline CTA)
│
Budget Pages
├── Links to → Single Reviews (each product card)
├── Links to → Relevant Occasion Pages ("Perfect for...")
├── Links to → Comparison Pages ("Can't decide?")
│
Recipient Pages
├── Links to → Budget Pages (budget filter)
├── Links to → Single Reviews (product cards)
├── Links to → Occasion Pages (occasion filter)
│
Single Review Pages
├── Links to → Comparison Pages ("How does it compare?")
├── Links to → Brand Spotlight Page (brand link)
├── Links to → Related Reviews ("You might also like")
├── Links to → Relevant Budget Page (breadcrumb/category)
│
Comparison Pages
├── Links to → Both Single Reviews
├── Links to → Budget Pages
├── Links to → Gift Finder Quiz ("Still can't decide?")
│
Brand Spotlight Pages
├── Links to → All Reviews for that Brand
├── Links to → Budget Pages where brand appears
├── Links to → Comparison Pages featuring that brand
│
Blog Posts
├── Links to → Relevant Occasion/Budget/Recipient Pages
├── Links to → Relevant Reviews
├── Links to → Gift Finder Quiz (where contextual)
│
Gift Finder Quiz
├── Results link to → Single Reviews
├── Results link to → Budget Pages
├── Results link to → Occasion Pages
```

---

## 2. Detailed Wireframe Descriptions

### 2.1 Global Components (Shared Across All Pages)

#### 2.1.1 Header / Navigation

```
┌─────────────────────────────────────────────────────────────────┐
│  [WristNerd Logo]     Gift Guides ▾  Reviews  Compare  Quiz    │
│                                                    [🔍] [📧]   │
│                       ┌─────────────────┐                       │
│                       │ MEGA MENU       │                       │
│                       │ By Occasion     │                       │
│                       │ • Father's Day  │                       │
│                       │ • Christmas     │                       │
│                       │ • Birthday      │                       │
│                       │ • Valentine's   │                       │
│                       │ • Anniversary   │                       │
│                       │ • Graduation    │                       │
│                       │                 │                       │
│                       │ By Budget       │                       │
│                       │ • Under $100    │                       │
│                       │ • Under $200    │                       │
│                       │ • Under $300    │                       │
│                       │ • Under $500    │                       │
│                       │ • Luxury        │                       │
│                       │                 │                       │
│                       │ By Recipient    │                       │
│                       │ • For Husbands  │                       │
│                       │ • For Dads      │                       │
│                       │ • For Boyfriends│                       │
│                       │ • For Sons      │                       │
│                       │ • For Friends   │                       │
│                       └─────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

**Specs:**
- **Desktop:** Sticky header, 64px height, white background, subtle bottom border (`#E5E5E5`)
- **Logo:** Left-aligned, Playfair Display bold, Navy (`#0D1F3C`), max-width 160px
- **Nav items:** Inter 15px medium, Navy, 24px spacing between items
- **Mega menu:** Triggered on hover (desktop) / tap (mobile), 3-column layout, white background, subtle shadow
- **Search icon:** Opens slide-down search bar with autocomplete
- **Email icon:** Opens email signup modal
- **Mobile:** Hamburger menu (right-aligned), full-screen overlay nav, accordion sections for Gift Guides
- **Mobile header height:** 56px
- **CTA:** None in header — the nav IS the CTA (every link leads to monetized content)

#### 2.1.2 Announcement Bar (Optional, Seasonal)

```
┌─────────────────────────────────────────────────────────────────┐
│  🎁 Father's Day Gift Guide is Live → Shop Our Top Picks   [✕] │
└─────────────────────────────────────────────────────────────────┘
```

**Specs:**
- Gold background (`#C5A55A`), Navy text, 36px height
- Dismissable with `✕` (sets cookie, hidden for 7 days)
- Links to the current seasonal occasion page
- Only shown during active seasonal windows (configurable)

#### 2.1.3 Footer

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [WristNerd Logo]       Gift Guides    Resources     Company    │
│                         Father's Day   Blog          About      │
│  "Helping you find      Christmas      Gift Finder   Contact    │
│   the perfect watch     Birthday       Watch Care    Privacy    │
│   gift since 2026."     Valentine's    Sizing Guide  Terms      │
│                         Anniversary    Engraving     Affiliate  │
│                         Graduation     Ideas         Disclosure │
│                         By Budget                               │
│                         By Recipient                            │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  📧 Get the best watch picks in your inbox                      │
│  [        Your email        ] [Subscribe →]                     │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  © 2026 WristNerd.xyz · All rights reserved                     │
│  WristNerd is reader-supported. We may earn a commission        │
│  through links on our site at no cost to you.                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specs:**
- Dark Navy background (`#0D1F3C`), white text
- 4-column layout on desktop, stacked on mobile
- Email signup form: inline, gold CTA button
- Affiliate disclosure mini-text always visible
- Footer links: Inter 14px regular, white, 1.6 line-height
- Mobile: Single-column, accordion sections for link groups

#### 2.1.4 Breadcrumbs

```
Home > Gift Guides > Father's Day > Seiko Presage SRPD37 Review
```

**Specs:**
- Inter 13px, gray (`#666`), separator: `>`
- Schema.org `BreadcrumbList` markup on every page
- Shown below header, above hero on all pages except homepage

---

### 2.2 Homepage Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    ┌──────────────────────┐                     │
│  HERO SECTION      │   [Hero Image:      │                     │
│                    │   Elegant watch on   │                     │
│  "Find the         │   gift box / wrist]  │                     │
│   Perfect Watch    │                      │                     │
│   Gift for Him"    └──────────────────────┘                     │
│                                                                 │
│  Curated guides to help you choose a watch                      │
│  he'll love — for every occasion & budget.                      │
│                                                                 │
│  [Take the Gift Finder Quiz →]   [Browse Gift Guides →]        │
│  (Gold btn, primary)              (Navy btn, secondary)         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TRUST BAR                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │ 50+ Expert│ │ Trusted  │ │ Budget-  │ │ Free &   │           │
│  │ Reviews   │ │ Brands   │ │ Friendly │ │ Unbiased │           │
│  │ Only      │ │ Only     │ │ Picks    │ │ Always   │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SHOP BY OCCASION (Section heading, centered)                   │
│  "Not sure where to start? Pick his occasion."                  │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │ 🎁      │ │ 🎄      │ │ 🎂      │ │ ❤️      │              │
│  │ Father's│ │Christmas│ │Birthday │ │Valentine│              │
│  │ Day     │ │         │ │         │ │'s Day   │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│  ┌─────────┐ ┌─────────┐                                       │
│  │ 🎓      │ │ 💍      │                                       │
│  │Graduati-│ │Annivers-│                                       │
│  │on       │ │ary      │                                       │
│  └─────────┘ └─────────┘                                       │
│                                                                 │
│  (Cards: Rounded corners, subtle shadow, image background,      │
│   occasion name overlaid. Link to occasion landing page.)       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SHOP BY BUDGET (Section heading, centered)                     │
│  "Set your budget. We'll find the watch."                       │
│                                                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │Under │  │Under │  │Under │  │Under │  │Luxury│             │
│  │$100  │  │$200  │  │$300  │  │$500  │  │$500+ │             │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘             │
│                                                                 │
│  (Horizontal pill/tab-style buttons, gold outline active state) │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  EDITOR'S PICKS — "Our Favorite Gift Watches Right Now"         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ [Watch Img]   │  │ [Watch Img]   │  │ [Watch Img]   │        │
│  │               │  │               │  │               │        │
│  │ Seiko Presage │  │ Tissot PRX    │  │ Orient Bambino│        │
│  │ SRPD37        │  │               │  │ V2            │        │
│  │               │  │               │  │               │        │
│  │ ★★★★★ (4.8)  │  │ ★★★★½ (4.6)  │  │ ★★★★★ (4.9)  │        │
│  │ Great for:    │  │ Great for:    │  │ Great for:    │        │
│  │ Birthdays,    │  │ Father's Day, │  │ Anniversary,  │        │
│  │ Anniversary   │  │ Graduation    │  │ Valentine's   │        │
│  │               │  │               │  │               │        │
│  │ [Check Price  │  │ [Check Price  │  │ [Check Price  │        │
│  │  on Amazon →] │  │  on Amazon →] │  │  on Amazon →] │        │
│  │               │  │               │  │               │        │
│  │ [Read Review] │  │ [Read Review] │  │ [Read Review] │        │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
│  (3 cards on desktop, horizontal scroll on mobile)              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  "NOT SURE WHAT TO GET?" — Gift Finder CTA Block               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │  Answer 4 quick questions and we'll recommend the       │    │
│  │  perfect watch gift for him.                            │    │
│  │                                                         │    │
│  │  [Start the Gift Finder Quiz →]                         │    │
│  │  (Full-width gold button)                               │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  (Navy background, white text, centered, 80px vertical padding) │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LATEST FROM THE BLOG (Section heading)                         │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ [Blog Img]    │  │ [Blog Img]    │  │ [Blog Img]    │        │
│  │               │  │               │  │               │        │
│  │ How to Choose │  │ Automatic vs  │  │ 7 Signs He's  │        │
│  │ Watch Size    │  │ Quartz for    │  │ a Watch Guy   │        │
│  │ for a Gift    │  │ Gifting       │  │               │        │
│  │               │  │               │  │               │        │
│  │ [Read →]      │  │ [Read →]      │  │ [Read →]      │        │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  EMAIL SIGNUP SECTION                                           │
│                                                                 │
│  "Get Gift Watch Picks Before Everyone Else"                    │
│  Join 1,000+ smart shoppers. Seasonal picks, deals,             │
│  and guides — straight to your inbox.                           │
│                                                                 │
│  [        Your email address        ] [Subscribe →]             │
│                                                                 │
│  (Light gray background, centered, 60px padding)                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      [FOOTER]                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Homepage Specs:**
- **Hero:** Split layout on desktop (text left 55%, image right 45%). Full-width stacked on mobile (image on top, text below).
- **Hero headline:** Playfair Display, 48px desktop / 32px mobile, Navy
- **Hero subheadline:** Inter, 18px, Gray (`#555`)
- **Primary CTA:** Gold (`#C5A55A`) background, Navy text, 16px Inter semi-bold, 48px height, rounded 8px, hover darkens 10%
- **Secondary CTA:** Navy outline, Navy text, same size specs
- **Trust bar:** 4 equal columns on desktop, 2x2 grid on mobile, icon + text, Inter 14px
- **Occasion cards:** 3-per-row desktop, 2-per-row tablet, horizontal scroll mobile, 200px height, rounded 12px
- **Budget pills:** Horizontal scroll on mobile, 40px height, 16px Inter, gold border on active
- **Editor's Picks cards:** Max-width 360px each, white background, shadow `0 2px 12px rgba(0,0,0,0.08)`, rounded 12px
- **Product card CTA:** Gold button, full card width, 40px height
- **Email signup:** Single-row input+button on desktop, stacked on mobile

---

### 2.3 Occasion Landing Page Wireframe (e.g., Father's Day)

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│  Home > Gift Guides > Father's Day                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO SECTION (Full-width, Navy overlay on lifestyle image)     │
│                                                                 │
│  "Best Watch Gifts for Father's Day 2026"                       │
│  Curated picks Dad will actually wear — from $75 to $1,500.     │
│  Updated: March 2026 · By [Author Name]                         │
│                                                                 │
│  [Jump to Our #1 Pick →]                                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TABLE OF CONTENTS / QUICK NAVIGATION                           │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Quick Jump:                                             │    │
│  │ 1. Best Overall    4. Best Automatic  7. Best Rugged    │    │
│  │ 2. Best Under $100 5. Best Dress      8. Best Eco-Drive │    │
│  │ 3. Best Under $200 6. Best Chrono     9. Buying Guide   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  INTRO PARAGRAPH                                                │
│  (200–300 words, addresses buyer pain points, establishes       │
│   authority, mentions methodology. Friendly tone.)              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  COMPARISON TABLE (Sticky header on scroll)                     │
│  ┌────────────┬──────────┬──────────┬──────────┬──────────┐    │
│  │ Watch      │ Best For │ Price    │ Movement │ CTA      │    │
│  ├────────────┼──────────┼──────────┼──────────┼──────────┤    │
│  │ [Img] Seiko│ Best     │ $$$     │ Auto     │[Check    │    │
│  │ Presage    │ Overall  │          │          │ Price →] │    │
│  ├────────────┼──────────┼──────────┼──────────┼──────────┤    │
│  │ [Img]      │ Under    │ $$      │ Quartz   │[Check    │    │
│  │ Citizen    │ $100     │          │          │ Price →] │    │
│  │ Eco-Drive  │          │          │          │          │    │
│  ├────────────┼──────────┼──────────┼──────────┼──────────┤    │
│  │ ...        │ ...      │ ...      │ ...      │ ...      │    │
│  └────────────┴──────────┴──────────┴──────────┴──────────┘    │
│                                                                 │
│  (Mobile: Horizontally scrollable table OR stacked cards)       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRODUCT BLOCK #1 — "Best Overall: Seiko Presage SRPD37"        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                                                         │    │
│  │  [Product Image — large, high-quality, white bg]        │    │
│  │                                                         │    │
│  │  ★★★★★ (4.8/5) · Our Rating                            │    │
│  │                                                         │    │
│  │  SPECS BOX:                                             │    │
│  │  Movement: Automatic · Case: 40.5mm · WR: 50m          │    │
│  │  Crystal: Hardlex · Strap: Leather                      │    │
│  │                                                         │    │
│  │  WHY WE PICKED IT (150–200 words)                       │    │
│  │  Editorial paragraph explaining why this is perfect     │    │
│  │  for the occasion. Gift-framed language.                │    │
│  │                                                         │    │
│  │  ✅ PROS              ❌ CONS                            │    │
│  │  • Stunning dial      • No sapphire crystal             │    │
│  │  • Great movement     • Slightly thick for dress        │    │
│  │  • Excellent value    • Leather strap breaks in slow    │    │
│  │                                                         │    │
│  │  WHO IS IT FOR?                                         │    │
│  │  "Perfect for dads who appreciate classic style..."     │    │
│  │                                                         │    │
│  │  [Check Price on Amazon →]   [Read Full Review →]       │    │
│  │  (Gold CTA, primary)         (Text link, secondary)     │    │
│  │                                                         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  (Repeat PRODUCT BLOCK for each watch — typically 8–12 watches) │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BUYING GUIDE SECTION                                           │
│  "How to Choose a Father's Day Watch Gift"                      │
│                                                                 │
│  • What to Consider (style, size, movement, budget)             │
│  • Common Mistakes to Avoid                                     │
│  • How We Tested and Selected These Watches                     │
│                                                                 │
│  (500–800 words, FAQ schema at the end)                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FAQ SECTION (Schema-marked)                                    │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ Q: What's the best watch gift for dad under $200?       │    │
│  │ A: The Seiko Presage SRPD37 offers incredible value...  │    │
│  │                                                         │    │
│  │ Q: Should I buy an automatic or quartz watch as a gift? │    │
│  │ A: It depends on your dad's lifestyle...                │    │
│  │                                                         │    │
│  │ Q: What size watch should I get for my dad?             │    │
│  │ A: Most men's watches are 38–42mm...                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  RELATED GUIDES SECTION                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Watches for  │  │ Best Under   │  │ Christmas    │          │
│  │ Dads         │  │ $200         │  │ Gift Watches │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [EMAIL SIGNUP SECTION]                                         │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      [FOOTER]                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Occasion Page Specs:**
- **Hero:** Full-width image with dark overlay (60% opacity Navy), text centered, Playfair Display 42px headline
- **Last Updated date:** Visible — builds trust and freshness signals for SEO
- **Table of Contents:** Bordered box, light gray background, anchor links, sticky on desktop sidebar (see below)
- **Comparison table:** Full-width, alternating row colors (white / `#F9F9F9`), gold CTA buttons in last column
- **Product blocks:** Alternating layout (image left/right) on desktop; stacked on mobile (image → content → CTA)
- **Product image:** 400px max-width, lazy-loaded, WebP format with JPG fallback, alt text includes watch name + "gift"
- **Pros/Cons:** Two-column on desktop, stacked on mobile, green checkmark / red X icons
- **CTA buttons:** Gold, 44px height, full-width on mobile, inline on desktop, 16px Inter semi-bold
- **Sidebar (desktop only):** Sticky, contains: Table of Contents, "Quick Pick" card (top recommendation), Email signup
- **FAQ:** Collapsible accordion, `FAQPage` schema markup
- **Word count target:** 3,000–5,000 words per occasion page

---

### 2.4 Budget Landing Page Wireframe (e.g., Best Watches Under $200)

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│  Home > Best Watches Under $200                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO (Simple, no full-width image)                             │
│                                                                 │
│  "12 Best Watches Under $200 for Every Man"                     │
│  Expert-curated picks that punch way above their price.         │
│  Updated: March 2026                                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BUDGET NAVIGATION BAR (horizontal pills, gold active state)    │
│  [ Under $100 ] [ Under $200 ● ] [ Under $300 ] [ Under $500 ] │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FILTER / SORT OPTIONS                                          │
│  Filter by: [Style ▾] [Movement ▾] [Occasion ▾]                │
│  Sort by: [Our Pick] [Price Low→High] [Rating]                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  COMPARISON TABLE (same format as Occasion pages)               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRODUCT BLOCKS (same format as Occasion pages)                 │
│  Each block includes:                                           │
│  • "Perfect Occasion" tags (e.g., "Great for: Father's Day,     │
│    Graduation")                                                  │
│  • Price indicator prominently displayed                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BUYING GUIDE: "How to Find a Great Watch Under $200"           │
│  FAQ SECTION (Schema)                                           │
│  RELATED BUDGET PAGES                                           │
│  EMAIL SIGNUP                                                   │
│  FOOTER                                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Budget Page-Specific Specs:**
- Same product block layout as Occasion pages
- **Budget nav bar:** Always visible, allows quick switching between budget tiers
- **Price display:** Prominent, but uses "Check Price" link (not hard-coded price) to avoid stale data
- **Filter/sort:** Client-side JS, no page reload. Filters by watch style (dress, sport, casual, dive) and movement type (automatic, quartz, solar)
- **Occasion tags:** Colored pills below each watch name (e.g., gold pill "Father's Day", navy pill "Birthday")
- **Word count target:** 2,500–4,000 words

---

### 2.5 Recipient Landing Page Wireframe (e.g., Watches for Husbands)

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│  Home > Watches for Husbands                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HERO                                                           │
│  "Best Watch Gifts for Husbands — Picks He'll Treasure"         │
│  From affordable everyday watches to luxury anniversary gifts.  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  RECIPIENT NAV BAR                                              │
│  [Husbands ●] [Dads] [Boyfriends] [Sons] [Friends]             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  OCCASION + BUDGET CROSS-FILTER                                 │
│  "Shopping for a specific occasion?"                            │
│  [Anniversary] [Birthday] [Christmas] [Valentine's] [Any]       │
│                                                                 │
│  "What's your budget?"                                          │
│  [ Under $100 ] [ Under $200 ] [ Under $500 ] [ Luxury ]       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRODUCT BLOCKS (same format, but intro copy is                 │
│  recipient-specific: "Your husband will love this because...")   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  BUYING GUIDE: "How to Choose a Watch Gift for Your Husband"    │
│  FAQ SECTION, RELATED PAGES, EMAIL SIGNUP, FOOTER               │
└─────────────────────────────────────────────────────────────────┘
```

**Recipient Page-Specific Specs:**
- Copy is written from the buyer's perspective ("Your husband will love...")
- Cross-filtering lets the buyer narrow by occasion AND budget on the same page
- Emphasizes gift-worthiness and emotional impact over technical specs
- **Word count target:** 2,000–3,500 words

---

### 2.6 Single Watch Review Page Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│  Home > Reviews > Seiko Presage SRPD37                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────┬──────────────────────────────┐    │
│  │                          │                              │    │
│  │  [Large Product Image]   │  Seiko Presage SRPD37        │    │
│  │  [Thumbnail gallery      │  ★★★★★ 4.8 / 5              │    │
│  │   below main image]      │                              │    │
│  │                          │  VERDICT BOX:                │    │
│  │  [img1] [img2] [img3]    │  "A stunning dress watch     │    │
│  │                          │   that makes any occasion    │    │
│  │                          │   feel special. Best for     │    │
│  │                          │   birthdays & anniversaries."│    │
│  │                          │                              │    │
│  │                          │  QUICK SPECS:                │    │
│  │                          │  Movement: 4R35 Automatic    │    │
│  │                          │  Case: 40.5mm SS             │    │
│  │                          │  WR: 50m                     │    │
│  │                          │  Crystal: Hardlex            │    │
│  │                          │  Power Reserve: 41hrs        │    │
│  │                          │                              │    │
│  │                          │  RATING BREAKDOWN:           │    │
│  │                          │  Design:     ████████░░ 4.5  │    │
│  │                          │  Value:      █████████░ 4.8  │    │
│  │                          │  Gift-Worth: ██████████ 5.0  │    │
│  │                          │  Quality:    ████████░░ 4.5  │    │
│  │                          │  Wearability:█████████░ 4.7  │    │
│  │                          │                              │    │
│  │                          │  [Check Price on Amazon →]   │    │
│  │                          │  (Gold button, full-width)   │    │
│  │                          │                              │    │
│  └──────────────────────────┴──────────────────────────────┘    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TABLE OF CONTENTS (left sidebar, sticky on desktop)            │
│  1. First Impressions                                           │
│  2. Design & Build Quality                                      │
│  3. Movement & Accuracy                                         │
│  4. Comfort & Wearability                                       │
│  5. Gift-Worthiness Score                                       │
│  6. Who Should Buy This                                         │
│  7. Who Should Skip This                                        │
│  8. Pros & Cons                                                 │
│  9. Verdict                                                     │
│  10. Where to Buy                                               │
│  11. FAQ                                                        │
│                                                                 │
│  MAIN CONTENT (right, 2/3 width on desktop)                     │
│                                                                 │
│  [Section 1: First Impressions — 200 words]                     │
│  [Section 2: Design & Build — 300 words + close-up images]      │
│  [Section 3: Movement — 200 words]                              │
│  [Section 4: Comfort — 200 words]                               │
│                                                                 │
│  GIFT-WORTHINESS SECTION (Unique to WristNerd)                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 🎁 GIFT-WORTHINESS SCORE: 9.2 / 10                      │    │
│  │                                                         │    │
│  │ Presentation:  ████████░░ (looks expensive on the wrist)│    │
│  │ Unboxing:      ███████░░░ (Seiko box is decent)         │    │
│  │ Wow Factor:    █████████░ (the dial stops people)       │    │
│  │ Versatility:   ████████░░ (dress to smart casual)       │    │
│  │ Price-to-Value:██████████ (punches way above)           │    │
│  │                                                         │    │
│  │ Best occasions: Birthday, Anniversary, Valentine's Day  │    │
│  │ Best recipients: Husband, Boyfriend                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  [Section 6: Who Should Buy This — 150 words]                   │
│  [Section 7: Who Should Skip This — 100 words]                  │
│                                                                 │
│  PROS & CONS (same format as occasion pages)                    │
│                                                                 │
│  VERDICT — 150 words, bold, with final CTA                      │
│  [Check Price on Amazon →] [Compare with Orient Bambino →]      │
│                                                                 │
│  WHERE TO BUY — Table with retailer links                       │
│  ┌──────────────┬──────────┬───────────┐                        │
│  │ Retailer     │ Price    │ Link      │                        │
│  ├──────────────┼──────────┼───────────┤                        │
│  │ Amazon       │ ~$285    │[Check →]  │                        │
│  │ Macy's       │ ~$295    │[Check →]  │                        │
│  │ Jomashop     │ ~$265    │[Check →]  │                        │
│  └──────────────┴──────────┴───────────┘                        │
│                                                                 │
│  FAQ SECTION (Schema-marked, 5–7 questions)                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  "YOU MIGHT ALSO LIKE" — 3 related review cards                 │
│  "COMPARE" — Links to relevant comparison pages                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  EMAIL SIGNUP, FOOTER                                           │
└─────────────────────────────────────────────────────────────────┘
```

**Review Page Specs:**
- **Product header:** 2-column on desktop (image gallery left 50%, info right 50%); stacked on mobile
- **Image gallery:** Main image 600x600, 3–5 thumbnails below, click to enlarge (lightbox), lazy-loaded WebP
- **Rating breakdown:** Custom bar chart, CSS-only (no JS dependency), accessible alt text
- **Gift-Worthiness Score:** Unique WristNerd differentiator — a branded scoring system for how giftable a watch is
- **Schema:** `Product` + `Review` + `FAQPage` structured data
- **Sidebar:** Sticky, contains TOC + "Quick Buy" card (image + CTA)
- **Word count target:** 1,500–2,500 words per review
- **Affiliate links:** Nofollow + sponsored rel attributes

---

### 2.7 Comparison Page Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│  Home > Compare > Seiko 5 vs Orient Bambino                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  "Seiko 5 vs Orient Bambino: Which Is the Better Gift?"         │
│  A side-by-side comparison to help you pick the right one.      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SIDE-BY-SIDE HERO                                              │
│  ┌─────────────────────┬──── VS ────┬────────────────────┐     │
│  │                     │            │                    │     │
│  │   [Seiko 5 Image]   │     VS     │ [Orient Bambino    │     │
│  │                     │            │  Image]            │     │
│  │   Seiko 5 SRPD55    │            │ Orient Bambino V2  │     │
│  │   ★★★★½ (4.6)       │            │ ★★★★★ (4.9)        │     │
│  │                     │            │                    │     │
│  │   [Check Price →]   │            │ [Check Price →]    │     │
│  │                     │            │                    │     │
│  └─────────────────────┴────────────┴────────────────────┘     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  WINNER BADGE (above the fold)                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ 🏆 OUR PICK: Orient Bambino V2                          │    │
│  │ "Better gift-worthiness, more dressy, incredible value" │    │
│  │ [Check Price on Amazon →]                               │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FULL SPECS COMPARISON TABLE                                    │
│  ┌────────────────┬──────────────┬──────────────┬────────┐     │
│  │ Spec           │ Seiko 5      │ Orient       │ Winner │     │
│  ├────────────────┼──────────────┼──────────────┼────────┤     │
│  │ Price          │ ~$250        │ ~$180        │ Orient │     │
│  │ Movement       │ 4R36 Auto    │ F6724 Auto   │ Tie    │     │
│  │ Case Size      │ 42.5mm       │ 40.5mm       │ Orient │     │
│  │ Water Resist   │ 100m         │ 30m          │ Seiko  │     │
│  │ Crystal        │ Hardlex      │ Mineral      │ Tie    │     │
│  │ Style          │ Sport/Casual │ Dress        │ —      │     │
│  │ Gift-Worthiness│ 7.8/10       │ 9.1/10       │ Orient │     │
│  ├────────────────┼──────────────┼──────────────┼────────┤     │
│  │ OVERALL WINNER │              │      ✅       │        │     │
│  └────────────────┴──────────────┴──────────────┴────────┘     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CATEGORY-BY-CATEGORY BREAKDOWN                                 │
│                                                                 │
│  "Design & Appearance" — 200 words + verdict                    │
│  "Movement & Reliability" — 200 words + verdict                 │
│  "Comfort & Wearability" — 150 words + verdict                  │
│  "Value for Money" — 200 words + verdict                        │
│  "Gift-Worthiness" — 200 words + verdict                        │
│                                                                 │
│  Each section ends with: "Winner: [Watch Name]"                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FINAL VERDICT                                                  │
│  "Get the Seiko 5 if..." / "Get the Orient Bambino if..."      │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │ Get the Seiko 5     │  │ Get the Orient      │              │
│  │ if you want:        │  │ Bambino if:         │              │
│  │ • Sports versatility│  │ • Dress occasions   │              │
│  │ • Water resistance  │  │ • Better value      │              │
│  │ • Casual daily wear │  │ • More gift-worthy  │              │
│  │                     │  │ • Classic elegance   │              │
│  │ [Check Price →]     │  │ [Check Price →]     │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FAQ, RELATED COMPARISONS, EMAIL SIGNUP, FOOTER                 │
└─────────────────────────────────────────────────────────────────┘
```

**Comparison Page Specs:**
- **Side-by-side hero:** Equal 50/50 columns, "VS" badge centered between them, Navy background
- **Winner badge:** Gold background, prominent placement above the fold
- **Specs table:** Alternating rows, "Winner" column with checkmarks, mobile-responsive (card layout)
- **Category breakdowns:** Each ends with a clear winner statement + mini CTA
- **Final verdict:** Two-column "Get X if... / Get Y if..." decision helper
- **Schema:** Use `Product` schema for both watches
- **Word count target:** 2,000–3,000 words

---

### 2.8 Gift Finder Quiz Page Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  QUIZ LANDING (before starting)                                 │
│                                                                 │
│  "Find the Perfect Watch Gift in 60 Seconds"                    │
│  Answer 4 simple questions. We'll match you with the            │
│  ideal watch gift.                                              │
│                                                                 │
│  [Start the Quiz →]                                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  QUIZ STEP 1 (Progress bar: ████░░░░░░░░ 25%)                  │
│                                                                 │
│  "Who are you buying for?"                                      │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ 💑       │  │ 👨       │  │ 💕       │  │ 👦       │       │
│  │ Husband  │  │ Dad      │  │ Boyfriend│  │ Son      │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐                                    │
│  │ 🤝       │  │ 🎁       │                                    │
│  │ Friend   │  │ Myself   │                                    │
│  └──────────┘  └──────────┘                                    │
│                                                                 │
│  (Selection cards: hover = gold border, selected = gold bg)     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  QUIZ STEP 2 (Progress bar: ████████░░░░ 50%)                  │
│                                                                 │
│  "What's the occasion?"                                         │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Father's │  │ Birthday │  │ Christmas│  │Valentine'│       │
│  │ Day      │  │          │  │          │  │s Day     │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │Anniversary│  │Graduation│  │ Just     │                      │
│  │          │  │          │  │ Because  │                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  QUIZ STEP 3 (Progress bar: ████████████░░ 75%)                │
│                                                                 │
│  "What's your budget?"                                          │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Under    │  │ $100–    │  │ $200–    │  │ $500+    │       │
│  │ $100     │  │ $200     │  │ $500     │  │ Luxury   │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  QUIZ STEP 4 (Progress bar: ████████████████ 100%)             │
│                                                                 │
│  "What's his style?"                                            │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ [img]    │  │ [img]    │  │ [img]    │  │ [img]    │       │
│  │ Classic/ │  │ Sporty/  │  │ Modern/  │  │ Rugged/  │       │
│  │ Dressy   │  │ Active   │  │ Minimal  │  │ Outdoor  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                 │
│  [See My Results →]                                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  RESULTS PAGE                                                   │
│                                                                 │
│  "Your Perfect Watch Gift: Seiko Presage SRPD37"                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ [Product Image]                                         │    │
│  │                                                         │    │
│  │ Why it's perfect for [Husband] + [Birthday] +           │    │
│  │ [$100–$200] + [Classic/Dressy]:                         │    │
│  │                                                         │    │
│  │ "The Seiko Presage SRPD37 is the ultimate birthday      │    │
│  │  gift for a husband who appreciates classic style..."   │    │
│  │                                                         │    │
│  │ Gift-Worthiness: 9.2/10                                 │    │
│  │                                                         │    │
│  │ [Check Price on Amazon →]   [Read Full Review →]        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  "Other Great Options:"                                         │
│  ┌──────────────┐  ┌──────────────┐                             │
│  │ Runner-Up #1 │  │ Runner-Up #2 │                             │
│  └──────────────┘  └──────────────┘                             │
│                                                                 │
│  "Want more options?"                                           │
│  [Browse all watches under $200 →]                              │
│  [Retake the Quiz →]                                            │
│                                                                 │
│  EMAIL CAPTURE:                                                 │
│  "Save your results + get notified when this watch goes on sale"│
│  [        Your email        ] [Save & Subscribe →]              │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      [FOOTER]                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Quiz Page Specs:**
- **Flow:** Single-page app experience (no page reloads between steps)
- **Progress bar:** Gold fill, 4px height, smooth CSS transition
- **Selection cards:** 120x120px on desktop, 100x100px on mobile, grid layout
- **Animation:** Fade-in transition between steps (300ms ease)
- **Results:** Server-side or client-side matching logic based on a watch scoring matrix
- **Results URL:** Shareable (query parameters encode selections)
- **Email capture on results page:** High-intent moment — offer to "save results and get sale alerts"
- **No page reload:** Entire quiz runs client-side, results page is a separate route
- **Fallback:** If JS disabled, quiz degrades to multi-page form

---

### 2.9 Blog Post Page Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│  Home > Blog > How to Choose Watch Size for a Gift              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ARTICLE HEADER                                                 │
│                                                                 │
│  "How to Choose the Right Watch Size for a Gift"                │
│  By [Author Name] · March 12, 2026 · 6 min read                │
│                                                                 │
│  [Featured Image — lifestyle, editorial quality]                │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────┐  ┌─────────────────────────────────────┐    │
│  │ SIDEBAR        │  │ MAIN CONTENT                        │    │
│  │ (Sticky)       │  │                                     │    │
│  │                │  │ [Article body — 1,200–2,000 words]  │    │
│  │ Table of       │  │                                     │    │
│  │ Contents       │  │ Includes:                           │    │
│  │                │  │ • H2/H3 headings                    │    │
│  │ Related        │  │ • Inline images / diagrams          │    │
│  │ Articles       │  │ • Contextual product recommendations│    │
│  │                │  │   with affiliate CTAs               │    │
│  │ Email          │  │ • Internal links to guides/reviews  │    │
│  │ Signup         │  │                                     │    │
│  │                │  │ [Inline CTA: "Need a watch? Try     │    │
│  │ Gift Finder    │  │  our Gift Finder Quiz →"]           │    │
│  │ Quiz CTA       │  │                                     │    │
│  │                │  │                                     │    │
│  └────────────────┘  └─────────────────────────────────────┘    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AUTHOR BIO BOX                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ [Avatar] [Author Name] — Watch enthusiast and gift      │    │
│  │          guide curator at WristNerd. [More articles →]  │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  RELATED ARTICLES (3 cards), EMAIL SIGNUP, FOOTER               │
└─────────────────────────────────────────────────────────────────┘
```

**Blog Post Specs:**
- **Layout:** Sidebar (25%) + main content (75%) on desktop; no sidebar on mobile
- **Heading hierarchy:** H1 (title) → H2 (sections) → H3 (subsections)
- **Images:** Lazy-loaded, WebP, responsive `srcset`, descriptive alt text
- **Schema:** `Article` + `BreadcrumbList` + optional `FAQPage`
- **Internal linking:** Each blog post links to 2–3 relevant product pages/guides
- **Inline CTAs:** Contextual recommendations mid-article, styled as subtle callout boxes (not full product cards)
- **Word count target:** 1,200–2,000 words

---

### 2.10 Brand Spotlight Page Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│                      [HEADER / NAV]                             │
├─────────────────────────────────────────────────────────────────┤
│  Home > Brands > Seiko                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BRAND HERO                                                     │
│  [Brand Logo] + "Seiko: Best Gift-Worthy Watches"               │
│  A brief brand history + why Seiko is great for gifting         │
│  (200 words)                                                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  "Our Top Seiko Picks for Gifting"                              │
│  (Product cards — same format as occasion pages)                │
│  Each card links to full review                                 │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  "Seiko Buying Guide" — 500 words                               │
│  • Price ranges & collections overview                          │
│  • Best Seiko for each budget tier                              │
│  • Where to buy Seiko                                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  FAQ (Schema), RELATED BRAND PAGES, EMAIL SIGNUP, FOOTER        │
└─────────────────────────────────────────────────────────────────┘
```

**Brand Spotlight Specs:**
- **Word count target:** 1,500–2,500 words
- **Schema:** `Organization` (brand) + `Product` (each watch) + `BreadcrumbList`
- **Internal linking:** Links to all individual reviews for that brand + relevant budget pages

---

### 2.11 Mobile vs Desktop Layout Notes (All Pages)

| Element | Desktop | Mobile |
|---|---|---|
| **Header** | Sticky, 64px, horizontal nav, mega menu on hover | Sticky, 56px, hamburger menu, full-screen overlay |
| **Sidebar** | Sticky 25% width (TOC, Quick Pick, Email) | Hidden — TOC becomes inline collapsible block above content |
| **Product cards** | 3 per row (homepage), inline with content (guides) | Stacked full-width, image → content → CTA |
| **Comparison table** | Full table with all columns | Horizontally scrollable OR stacked card layout |
| **Budget nav pills** | Horizontal row, no scroll | Horizontal scroll with scroll indicator |
| **Hero section** | Split layout (text + image side-by-side) | Stacked (image top, text below) |
| **CTAs** | Inline buttons, 200px width | Full-width buttons, 48px min-height for touch |
| **Images** | Full resolution, max 800px | Responsive, max 100vw, lazy-loaded |
| **Font sizes** | H1: 48px, H2: 32px, Body: 16px | H1: 32px, H2: 24px, Body: 16px |
| **Quiz cards** | 4 per row | 2 per row |
| **Footer** | 4-column layout | Single column, accordion sections |

---

## 3. User Journey Flows

### 3.1 SEO Visitor → Affiliate Conversion

```
ENTRY POINTS (Organic Search):
│
├── "best watches for dad under $200"
│   └── Lands on: /gift-guides/fathers-day/ OR /best-watches-under-200/
│
├── "seiko presage review"
│   └── Lands on: /reviews/seiko-presage-srpd37/
│
├── "orient bambino vs seiko 5"
│   └── Lands on: /compare/seiko-5-vs-orient-bambino/
│
├── "what to engrave on a watch"
│   └── Lands on: /blog/watch-engraving-ideas/
│
└── "watch gift finder quiz"
    └── Lands on: /gift-finder/

CONVERSION PATH (Primary):
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Search Query │ →  │ Landing Page │ →  │ Read Content  │ →  │ Click "Check │
│              │    │ (Guide,      │    │ Pros/Cons,   │    │ Price on     │
│              │    │  Review, or  │    │ Rating,      │    │ Amazon →"    │
│              │    │  Comparison) │    │ Gift Score   │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                    │
                                                                    ▼
                                                            ┌──────────────┐
                                                            │ Amazon /     │
                                                            │ Retailer     │
                                                            │ (Affiliate   │
                                                            │  Cookie Set) │
                                                            │              │
                                                            │ → Purchase   │
                                                            │ → Commission │
                                                            └──────────────┘

SECONDARY PATH (Exploration before conversion):
Landing Page → Read Review → Click "Compare" → Comparison Page → Decision → CTA Click → Retailer

TERTIARY PATH (Undecided):
Landing Page → Overwhelmed → Click "Gift Finder Quiz" → Complete Quiz → Get Recommendation → CTA Click → Retailer

KEY METRICS TO TRACK:
- Click-through rate on affiliate CTAs (target: 8–15%)
- Bounce rate on landing pages (target: <45%)
- Pages per session (target: 2.5+)
- Average session duration (target: 3+ minutes)
```

### 3.2 Email Subscriber → Seasonal Campaign → Purchase

```
ACQUISITION:
┌──────────────┐    ┌──────────────────────┐    ┌──────────────┐
│ Visit any    │ →  │ See email signup:     │ →  │ Subscribe    │
│ page on site │    │ • Footer form        │    │ with email   │
│              │    │ • Inline in content   │    │              │
│              │    │ • Quiz results page   │    │              │
│              │    │ • Exit-intent (soft)  │    │              │
└──────────────┘    └──────────────────────┘    └──────────────┘
                                                       │
                                                       ▼
NURTURE SEQUENCE:                               ┌──────────────┐
                                                │ Welcome Email│
                                                │ "5 Gift Watch│
                                                │  Mistakes to │
                                                │  Avoid"      │
                                                └──────┬───────┘
                                                       │
                                                       ▼
                                                ┌──────────────┐
                                                │ Email 2 (Day │
                                                │ 3): "Our Top │
                                                │ 3 Gift Watch │
                                                │ Picks for    │
                                                │ 2026"        │
                                                └──────┬───────┘
                                                       │
                                                       ▼
                                                ┌──────────────┐
                                                │ Email 3 (Day │
                                                │ 7): "Take the│
                                                │ Gift Finder  │
                                                │ Quiz"        │
                                                └──────┬───────┘
                                                       │
                                                       ▼
SEASONAL CAMPAIGNS:                             ┌──────────────┐
(Triggered by calendar events)                  │ Seasonal     │
                                                │ Campaign:    │
Father's Day (May): 3-email sequence            │ "Father's Day│
Christmas (Nov–Dec): 5-email sequence           │ Watch Guide  │
Valentine's (Jan–Feb): 3-email sequence         │ is Live!"    │
Birthday (year-round, personalized): 1 email    │              │
                                                │ → Links to   │
                                                │   occasion   │
                                                │   page       │
                                                │ → Direct     │
                                                │   product    │
                                                │   recs       │
                                                └──────┬───────┘
                                                       │
                                                       ▼
                                                ┌──────────────┐
                                                │ Click →      │
                                                │ Occasion     │
                                                │ Page →       │
                                                │ CTA Click →  │
                                                │ Purchase     │
                                                └──────────────┘

KEY METRICS:
- Email signup rate (target: 3–5% of visitors)
- Email open rate (target: 25–35%)
- Email click-through rate (target: 3–5%)
- Revenue per email subscriber (track over 12 months)
```

### 3.3 Comparison Page Visitor → Decision → Purchase

```
┌──────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│ Search:      │ →  │ Comparison Page      │ →  │ Read category-by-    │
│ "seiko 5 vs  │    │                      │    │ category breakdown   │
│  orient      │    │ See side-by-side     │    │                      │
│  bambino"    │    │ hero + winner badge  │    │ Design, Movement,    │
│              │    │ above the fold       │    │ Comfort, Value,      │
│              │    │                      │    │ Gift-Worthiness      │
└──────────────┘    └──────────────────────┘    └──────┬───────────────┘
                                                       │
                                              ┌────────┴────────┐
                                              │                 │
                                              ▼                 ▼
                                    ┌──────────────┐  ┌──────────────┐
                                    │ Decision     │  │ Wants more   │
                                    │ made →       │  │ info →       │
                                    │ Click CTA in │  │ Click "Read  │
                                    │ verdict      │  │ Full Review" │
                                    │ section      │  │              │
                                    └──────┬───────┘  └──────┬───────┘
                                           │                 │
                                           ▼                 ▼
                                    ┌──────────────┐  ┌──────────────┐
                                    │ Retailer →   │  │ Review Page  │
                                    │ Purchase →   │  │ → Confirms   │
                                    │ Commission   │  │   decision → │
                                    │              │  │   CTA Click  │
                                    └──────────────┘  └──────────────┘

IMPORTANT UX ELEMENT:
- The "Winner Badge" and "Get X if... / Get Y if..." sections are designed to
  resolve decision paralysis — the #1 pain point for comparison shoppers.
- Always provide a clear recommendation, never "it depends" without guidance.
```

### 3.4 Gift Finder Quiz Flow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Entry:       │ →  │ Step 1:      │ →  │ Step 2:      │ →  │ Step 3:      │
│ Homepage CTA │    │ "Who are you │    │ "What's the  │    │ "What's your │
│ Nav link     │    │  buying for?"│    │  occasion?"  │    │  budget?"    │
│ Inline CTA   │    │              │    │              │    │              │
│ Comparison   │    │ Options:     │    │ Options:     │    │ Options:     │
│ page fallback│    │ Husband, Dad,│    │ Father's Day,│    │ Under $100,  │
│              │    │ Boyfriend,   │    │ Birthday,    │    │ $100–$200,   │
│              │    │ Son, Friend, │    │ Christmas,   │    │ $200–$500,   │
│              │    │ Myself       │    │ Valentine's, │    │ $500+        │
│              │    │              │    │ Anniversary, │    │              │
│              │    │              │    │ Graduation,  │    │              │
│              │    │              │    │ Just Because │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                    │
                                                                    ▼
                                                            ┌──────────────┐
                                                            │ Step 4:      │
                                                            │ "What's his  │
                                                            │  style?"     │
                                                            │              │
                                                            │ Classic/Dress│
                                                            │ Sporty/Active│
                                                            │ Modern/Minim │
                                                            │ Rugged/Outdor│
                                                            └──────┬───────┘
                                                                   │
                                                                   ▼
                                                            ┌──────────────┐
                                                            │ RESULTS PAGE │
                                                            │              │
                                                            │ Top Pick +   │
                                                            │ 2 Runner-Ups │
                                                            │              │
                                                            │ Each with:   │
                                                            │ • Why it fits│
                                                            │ • Gift Score │
                                                            │ • CTA button │
                                                            │ • Review link│
                                                            └──────┬───────┘
                                                                   │
                                                    ┌──────────────┼──────────────┐
                                                    │              │              │
                                                    ▼              ▼              ▼
                                             ┌───────────┐ ┌───────────┐ ┌───────────┐
                                             │ Click CTA │ │ Read Full │ │ Save &    │
                                             │ → Retailer│ │ Review    │ │ Subscribe │
                                             │ → Purchase│ │ → Then    │ │ (email    │
                                             │           │ │   CTA     │ │  capture) │
                                             └───────────┘ └───────────┘ └───────────┘

MATCHING LOGIC:
- Each watch in the database has tags: recipient[], occasion[], budget_tier, style
- Quiz answers filter watches, then sort by Gift-Worthiness Score (descending)
- Top 3 matches are displayed
- If no exact match, show "closest matches" with explanation
```

### 3.5 Return Visitor Seasonal Flow

```
SCENARIO: User visited in June (Father's Day), returns in November (Christmas)

FIRST VISIT (June):
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Searches     │ →  │ Reads guide, │ →  │ Clicks CTA,  │
│ "watch gift  │    │ clicks around│    │ purchases on  │
│ for dad"     │    │ 3 pages      │    │ Amazon        │
└──────────────┘    └──────────────┘    └──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Subscribes   │
                    │ to email     │
                    │ (footer or   │
                    │  inline CTA) │
                    └──────────────┘

BETWEEN VISITS:
- Receives nurture emails (welcome sequence)
- Receives occasional blog digest emails
- Stays engaged / remembers brand

RETURN VISIT (November):
┌──────────────┐    ┌──────────────────────┐    ┌──────────────┐
│ Receives     │ →  │ Lands on Christmas   │ →  │ Updated guide│
│ "Christmas   │    │ Gift Guide           │    │ with new     │
│ Watch Guide  │    │                      │    │ picks for    │
│ is Live!"    │    │ Announcement bar:    │    │ 2026         │
│ email        │    │ "🎄 Christmas Gift   │    │              │
│              │    │  Guide is Here!"     │    │              │
└──────────────┘    └──────────────────────┘    └──────┬───────┘
                                                       │
                                              ┌────────┴────────┐
                                              │                 │
                                              ▼                 ▼
                                    ┌──────────────┐  ┌──────────────┐
                                    │ Already      │  │ Browses new  │
                                    │ trusts site  │  │ picks,       │
                                    │ → Quick      │  │ comparison   │
                                    │   decision   │  │ pages        │
                                    │ → CTA Click  │  │ → CTA Click  │
                                    └──────────────┘  └──────────────┘

KEY UX ELEMENTS FOR RETURN VISITORS:
- Announcement bar swaps seasonally (automated or manual)
- "New for 2026" badges on updated product picks
- "Last updated: [date]" on guides signals freshness
- Email pre-warms them before they even visit
- Site remembers quiz results (localStorage) — "Welcome back! Your last pick was..."
```

---

## 4. Full Feature List

### 4.1 Must-Have Features (Launch)

| # | Feature | Category | Technical Requirement |
|---|---|---|---|
| 1 | **Mobile-first responsive design** | UX | CSS Grid/Flexbox, breakpoints at 375px, 768px, 1024px, 1280px |
| 2 | **Fast page load (<2.5s LCP)** | Performance | Static site generation (Next.js/Astro), image optimization (WebP, lazy loading, srcset), minimal JS |
| 3 | **Affiliate CTA buttons visible above fold** | Conversion | Gold (#C5A55A) buttons, 44px min-height, "Check Price on Amazon →" / "See Best Deal →" |
| 4 | **Pros/Cons for every product** | Content | Two-column layout, green ✅ / red ❌ icons, structured data |
| 5 | **Occasion + Budget + Recipient segmentation** | Architecture | Separate landing pages for each dimension, cross-linking between them |
| 6 | **Schema markup (Product, Review, FAQ, Breadcrumb, Article)** | SEO | JSON-LD structured data on every page type, validated via Google Rich Results Test |
| 7 | **Gift-Worthiness Score (branded)** | Differentiation | Custom 1–10 rating with 5 sub-categories (Presentation, Unboxing, Wow Factor, Versatility, Price-to-Value) |
| 8 | **Comparison tables** | Content | Responsive tables with sticky headers, "Winner" column, CTA in each row |
| 9 | **Email signup forms** | Email List | Footer, inline, quiz results page, exit-intent (non-aggressive); integrate with Mailchimp/ConvertKit |
| 10 | **Gift Finder Quiz** | Engagement | 4-step client-side quiz, matching logic, shareable results URL, email capture on results |
| 11 | **Breadcrumb navigation** | UX/SEO | On all pages except homepage, BreadcrumbList schema |
| 12 | **Internal linking system** | SEO | Every page links to 3–5 related pages, contextual anchor text |
| 13 | **Sticky sidebar (desktop)** | UX | Table of contents, Quick Pick card, email signup (not on mobile) |
| 14 | **Image optimization** | Performance | WebP format, lazy loading (`loading="lazy"`), responsive `srcset`, descriptive alt text |
| 15 | **Privacy Policy, Affiliate Disclosure, Terms** | Legal | Static pages, FTC-compliant affiliate disclosure, link in header/footer |
| 16 | **Affiliate link management** | Revenue | Centralized link management (ThirstyAffiliates or custom), `rel="nofollow sponsored"` on all affiliate links |
| 17 | **Analytics setup** | Tracking | Google Analytics 4 + Google Search Console, event tracking on CTA clicks |
| 18 | **XML Sitemap + robots.txt** | SEO | Auto-generated, submitted to Google Search Console |
| 19 | **Open Graph + Twitter Card meta tags** | Social | Dynamic OG images per page, title/description/image for all pages |
| 20 | **404 page** | UX | Custom branded 404 with search, popular guides links, and Gift Finder Quiz CTA |
| 21 | **Canonical URLs** | SEO | Self-referencing canonical tags on all pages |
| 22 | **Accessible design (WCAG 2.1 AA)** | Accessibility | Proper heading hierarchy, alt text, keyboard navigation, sufficient color contrast |

### 4.2 Nice-to-Have Features (Phase 2)

| # | Feature | Category | Technical Requirement |
|---|---|---|---|
| 1 | **Deal/Coupon tracker page** | Revenue | Price monitoring API (or manual), deal cards with expiry dates |
| 2 | **Display ads (Mediavine/Raptive)** | Revenue | Requires 50K+ sessions/month; ad slots pre-planned in layout |
| 3 | **Dark mode toggle** | UX | CSS custom properties, localStorage preference, system preference detection |
| 4 | **Search functionality** | UX | Client-side search (Pagefind/Algolia), autocomplete, search results page |
| 5 | **"Save for Later" / wishlist** | Engagement | localStorage-based, no account required |
| 6 | **Social sharing buttons** | Distribution | Share to Pinterest, Facebook, X/Twitter, copy link |
| 7 | **Comment system** | Engagement | Disqus or custom, moderated, on review and blog pages |
| 8 | **Price history charts** | Trust | Integration with CamelCamelCamel API or similar |
| 9 | **Video embeds** | Content | YouTube/Vimeo embed support on review pages, lazy-loaded |
| 10 | **Multi-language support** | Expansion | i18n framework, start with English only |
| 11 | **Push notifications** | Engagement | Web push for seasonal campaign launches and deal alerts |
| 12 | **A/B testing framework** | Optimization | CTA button text, placement, color variants |
| 13 | **Seasonal theme variants** | Branding | Auto-switching announcement bar + hero for Father's Day, Christmas, etc. |
| 14 | **Author pages** | E-E-A-T | `/author/{name}/` with bio, credentials, articles list |
| 15 | **Brand directory index** | SEO | `/brands/` listing all brand spotlight pages |

### 4.3 Non-Negotiables (Hard Requirements)

| # | Requirement | Details |
|---|---|---|
| 1 | **No aggressive pop-ups** | No full-screen modals on entry. Exit-intent only, max 1 per session, easy to dismiss |
| 2 | **No autoplay video** | All video is click-to-play only |
| 3 | **No cheap watches under $50** | Minimum price threshold is $50 for any featured watch |
| 4 | **No low-quality/low-trust brands** | Exclude brands known for poor quality or counterfeit concerns |
| 5 | **Mobile-first design** | Design for mobile first, enhance for desktop (not the other way around) |
| 6 | **Fast load speed** | Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| 7 | **Honest reviews** | No fake reviews, no misleading "sale" pricing, transparent methodology |
| 8 | **FTC compliance** | Clear affiliate disclosure on every page with affiliate links |
| 9 | **Schema on all pages** | Structured data for rich snippets — Product, Review, FAQ, Article, Breadcrumb |
| 10 | **Soft CTA approach** | "Check Price" not "Buy Now" — persuasive, not pushy |

### 4.4 Things to Explicitly Avoid

| # | Avoid | Reason |
|---|---|---|
| 1 | Full-screen popup modals on page load | Destroys UX, increases bounce rate |
| 2 | Autoplay video or audio | Annoying, slows page load |
| 3 | Cluttered layouts with too many ads | Reduces trust, hurts conversions |
| 4 | Hard-coded prices that go stale | Use "Check Price" links instead |
| 5 | Stock photos for product images | Use official brand images or original photography |
| 6 | Neon/bright colors | Conflicts with premium branding |
| 7 | Overly aggressive sales language | "BUY NOW!!!" — use "Check Price →" instead |
| 8 | Watches under $50 | Below quality threshold for gift recommendation |
| 9 | Brands with poor reputation | Daniel Wellington, MVMT, Invicta (controversial) — research before including |
| 10 | Infinite scroll on product listings | Use pagination or "Load More" — better for SEO |

### 4.5 Technical Stack Recommendation

| Layer | Recommendation | Reason |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) OR Astro 4+ | SSG for speed, React ecosystem, great SEO |
| **Styling** | Tailwind CSS | Utility-first, fast dev, consistent design tokens |
| **Hosting** | Vercel (Next.js) or Cloudflare Pages (Astro) | Edge CDN, fast deploys, free tier |
| **CMS** | Sanity.io or MDX files | Structured content for product data, flexible schemas |
| **Email** | ConvertKit or Mailchimp | Automation, segmentation, seasonal campaigns |
| **Analytics** | GA4 + Google Search Console + Plausible (optional) | Full tracking, privacy-friendly option |
| **Affiliate Links** | ThirstyAffiliates (WP) or custom redirect system | Centralized management, click tracking |
| **Images** | Cloudinary or Next.js Image component | Auto-optimization, WebP, responsive |
| **Schema** | next-seo or custom JSON-LD components | Automated structured data |
| **Fonts** | Google Fonts (Playfair Display + Inter) | Free, reliable CDN, good performance |

---

## Appendix: Page Priority Matrix

| Priority | Pages | Reason |
|---|---|---|
| **P0 — Launch Critical** | Homepage, 3 Occasion pages (Father's Day, Christmas, Birthday), 3 Budget pages (Under $100, $200, $500), Gift Finder Quiz, About, Privacy, Affiliate Disclosure | Core revenue pages + legal requirements |
| **P1 — Week 2–4** | Remaining 3 Occasion pages, 2 Budget pages, 5 Recipient pages, 10 Single Reviews | Full content coverage |
| **P2 — Month 2** | 6 Brand Spotlights, 5 Comparison pages, 10 Blog posts | Authority building + long-tail SEO |
| **P3 — Month 3+** | Deals page, additional reviews, additional blog posts, additional comparisons | Ongoing content growth |

---

*This document is ready for developer/designer handoff. All specifications are detailed enough for execution without additional clarification. Awaiting client confirmation before proceeding to Step 4: Content Planning.*
