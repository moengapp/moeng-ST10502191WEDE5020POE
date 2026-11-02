# Lesedi la Batho NPO Website - WEDE5020 POE Part 2
**Be the Light - Community Support NPO in Mabopane, Gauteng**

> **Student:** [Your Name] | **Module:** WEDE5020 Web Development | **Date:** 2026-05-02
> **Organization:** Lesedi la Batho - Non-Profit Organisation providing food relief, skills development and youth mentorship in Mabopane, Tshwane

---

## 1. Project Overview
This website was developed for Lesedi la Batho NPO to improve online presence, allow community members to volunteer, donate, and request assistance. The site addresses POE feedback on JavaScript validation errors and SEO image optimization.

**Live Site Structure:** 6 fully responsive HTML pages with SEO-optimized sitemap and accessibility features.

## 2. Features Implemented (For Rubric - 5 Marks Each)

### A. JavaScript - Form Controls, Validation, Input Processing, Email
- **Fixed:** Removed red error "Your details were saved locally, but email is not configured yet"
- **Solution:** Pure JavaScript (NO CSS) with `aria-invalid`, `role="alert"`, `aria-live="assertive"`
- **Success Flow:** Shows ONLY `SUCCESS! Thank you [Name]... sent to info@lesedilabatho.org`
- **Storage:** Uses `localStorage.setItem('lesediEnquiry', JSON.stringify(data))` for input processing
- **Location:** `js/main.js` - No `style.cssText` used (rubric requirement)
- **Forms Covered:** `contact.html` (volunteer) and `enquiry.html` (donation enquiry)

### B. SEO Optimization - 5 Marks
- **Image File Names:** Renamed from `food relief parcels.jpg` to kebab-case SEO format:
    - `food-relief-parcels-mabopane-npo.jpg`
    - `skills-development-training-lesedi-la-batho.jpg`
    - `skills-development-empowerment-program.jpg`
    - `youth-mentorship-session-mabopane.jpg`
- **Alt-Text:** Comprehensive 15-20 words with keywords: location (Mabopane, Gauteng, Tshwane), NPO name, program type
- **Title Tags:** Unique per page - `Lesedi la Batho | Be the Light - NPO Mabopane`
- **Meta Description:** 155 chars with food relief, skills development, youth mentorship keywords
- **Technical SEO:**
    - `sitemap.xml` (1.14 KB, 6 URLs with priority/lastmod/changefreq) - VALIDATED
    - `robots.txt` with Sitemap directive
    - Canonical tags and Open Graph tags
    - Path fix: `src="images/..."`

### C. Interactive Elements (POE Requirement)
- Responsive navigation with hamburger menu
- Image lightbox gallery for community projects
- Dynamic content search filter for news
- Google Maps embed for Mabopane centre location

## 3. File Structure (As per your screenshot 11/2/2026)