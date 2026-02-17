
# FData — Dataset Listing Website

A sleek, modern website inspired by the trae.ai design aesthetic — dark theme, bold gradients, smooth animations, and a clean layout — tailored for a dataset listing platform.

---

## Page 1: Landing Page (Hero + Features)

### Hero Section
- Full-width dark gradient background with subtle animated glow effects (similar to trae.ai's aurora-style visuals)
- Bold headline: "Discover & Access Datasets for Any Use Case"
- Subheadline explaining FData's value proposition
- CTA button: "Explore Datasets" that scrolls/navigates to the catalog
- Optional secondary CTA: "Learn More"

### Features Section
- Grid of 3-4 feature cards with icons highlighting key benefits:
  - 🔍 Powerful Search — Find datasets by category, format, or keyword
  - 📊 Rich Previews — See dataset details before downloading
  - 🏷️ Organized Categories — Browse by domain (Health, Finance, NLP, etc.)
  - ⚡ Fast Access — Quick download links and API references

### How It Works Section
- 3-step visual flow: Browse → Preview → Access
- Clean iconography with brief descriptions

### Footer
- FData branding, navigation links, and social/contact info

---

## Page 2: Dataset Catalog

### Search & Filter Bar
- Prominent search input at the top
- Filter chips/dropdowns for: Category, Format (CSV, JSON, Parquet, etc.), Size, License type

### Dataset Grid/List
- Card-based layout showing each dataset with:
  - Dataset name and short description
  - Category badge (e.g., "Finance", "Healthcare", "NLP")
  - Format tags (CSV, JSON, etc.)
  - Size indicator
  - Row/record count
  - "View Details" button
- Pagination at the bottom

### Dataset Detail Modal/Panel
- Expanded view when clicking a dataset card:
  - Full description
  - Sample data preview (table)
  - Metadata (source, last updated, license, size, rows)
  - Download/access button

---

## Design System
- **Dark theme** as default, matching the trae.ai aesthetic
- Gradient accent colors (purple/blue/teal glows)
- Smooth scroll animations and hover effects
- Modern sans-serif typography
- Glassmorphism-style cards with subtle borders

---

## Technical Notes
- All data will be hardcoded/mock data (no backend needed)
- ~15-20 sample datasets across various categories
- Fully responsive design (mobile + desktop)
- Two routes: `/` (landing) and `/datasets` (catalog)
