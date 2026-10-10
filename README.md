# 🌾 Agri Nature AI

**Ancient Wisdom × Modern Science × Intelligent Agriculture**

A source-first agriculture platform combining Tamil traditional farming knowledge, agricultural engineering, machinery, seeds, fertilizers, nature protection, public awareness and AI-assisted farm technology design.

## What is included

- A–Z agriculture knowledge explorer
- Tamil traditional farming / Indigenous Technical Knowledge section
- Traditional → Science → Technology bridge
- Agricultural machinery explorer with operation, purpose and official source links
- Fertilizer and seed knowledge framework
- Land-photo AI concept workflow
- “Build Technology for My Land” prototype
- Nature protection and public-awareness workflow
- Step-by-step learning model
- Official source library
- Responsive mobile-first UI

## Evidence policy

The platform deliberately separates:

1. **Documented traditional knowledge** — practices recorded by TNAU/ICAR or other credible repositories.
2. **Scientific/engineering evidence** — current recommendations from universities, ICAR and government portals.
3. **Farmer observation / local practice** — useful context but not automatically treated as scientific fact.
4. **AI-generated concepts** — clearly labelled as concepts that require field validation.

A land photograph is not a soil laboratory test. The AI workflow should never invent soil chemistry, disease diagnosis, fertilizer/pesticide dosage or machine suitability from an image alone.

## Core official sources

- TNAU Agritech — Indigenous Technical Knowledge: https://agritech.tnau.ac.in/itk/IndigenousTechKnowledge_Intro01.html
- TNAU Agritech — Indigenous farm tools: https://agritech.tnau.ac.in/agricultural_engineering/agriengg_indigenous_tools.html
- TNAU Agritech — Traditional rice varieties: https://agritech.tnau.ac.in/itk/IndigenousTechKnowledge_Crop_Rice1.html
- ICAR — Traditional Knowledge in Agriculture: https://www.icar.gov.in/index.php/en/ITK
- ICAR — Natural Resource Management: https://icar.gov.in/en/natural-resource-management-division-1
- ICAR — Agricultural Engineering: https://www.icar.gov.in/en/overview-4
- ICAR — Landmark Technologies: https://www.icar.gov.in/index.php/en/landmark-technologies
- ICAR — Landmark Varieties: https://www.icar.gov.in/en/landmark-varieties
- Government of India — Farm Mechanization Portal: https://agrimachinery.nic.in/
- eNAM — live/market price dashboards: https://www.enam.gov.in/web/dashboard/live_price

## Planned production integrations

1. Gemini/vision API for image-assisted observation, with explicit uncertainty and evidence citations.
2. Supabase/PostgreSQL for machinery, seed, fertilizer, crop and source records.
3. Live weather + official agro-advisories.
4. eNAM/AGMARKNET market data where legally and technically available.
5. GIS farm mapping and field boundaries.
6. ESP32/IoT dashboard for soil moisture, temperature, humidity and water control.
7. Admin panel for maintaining source-backed records and update dates.
8. Tamil + English content management.
9. Search, filters, source freshness and evidence labels.

## Design principle

> Technology should work with nature, not replace it.

The platform should help people **observe → learn → compare → design → implement → measure → improve**.

## Deployment

This is a static web build and can be deployed directly to GitHub Pages, Vercel or any static hosting service. Future AI/data integrations should use server-side secrets and API routes rather than exposing keys in the browser.
