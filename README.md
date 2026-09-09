# Bramblewood Books — refreshed GitHub Pages website

This is the complete replacement website, based on Bramblewood_Books_Website_V3 (1).zip. Plain HTML, CSS and JavaScript; no installation or build step required.

## Upload to GitHub Pages

1. Keep a backup of your current repository.
2. Unzip Bramblewood_Books_Refreshed.zip.
3. Upload the contents into the existing repository root, replacing matching files. index.html should stay at the root, not inside another folder.
4. Keep the existing GitHub Pages publishing settings and custom domain. The included CNAME remains bramblewoodbooks.com.
5. After GitHub Pages finishes publishing, refresh the live site and check the contact form.

## Source files

- index.html — home
- books.html — Finn and the upcoming Harry book
- friends.html — final Finn/Olive spread and four character introductions
- explore.html — final map, zoom controls, keyboard/scroll/touch navigation and full-size link
- about.html — complete Meet Bethany page without a photo placeholder
- contact.html — existing FormSubmit contact form
- thanks.html — contact confirmation page
- styles.css — all responsive styling; local system fonts, no font downloads
- script.js — accessible mobile menu and progressively enhanced map viewer
- CNAME and .nojekyll — GitHub Pages configuration

## Artwork

The supplied images are copied without alteration:
- final Front cover.png → finn-cover.png (1254 × 1254)
- Page 15.png → friends.png (1774 × 887)
- Page 02.png → bramblewood-map.png (1774 × 887)

Only the three supplied final artworks are included. The unused original olive.png has been removed. The homepage displays the illustrated right half of the Finn/Olive spread through CSS; the Friends page and its full-size link preserve the entire spread.

## Content and services

The existing biography, book descriptions, character introductions, tagline and page routes are preserved. The author-photo placeholder is removed. No Amazon URL was supplied, so the Books page states that the purchase link is coming soon. Replace that availability paragraph with a link when the URL is ready.

The contact form retains its original FormSubmit destination and thank-you redirect. FormSubmit may require an activation email to be confirmed by Bethany. No test message was sent. The optional updates checkbox records interest in the message; it does not enrol anyone in an automated mailing list. The address remains visible in the HTML form action, as in V3.

## Validation

- Inspected every original HTML/CSS/JS file and all four original artworks.
- Seven pages checked in a browser at widths of 390, 430, 768, 1024 and 1440 CSS pixels: no horizontal page overflow found.
- Images rendered without broken-asset errors; 85 internal link/asset references checked against files and anchors.
- Mobile menu opens/closes and supports Escape; desktop navigation remains visible.
- Map Whole map, Read labels, zoom in/out and keyboard scrolling checked at 390px. Read labels displays the original 1774px-wide artwork within a bounded scrolling region.
- Contact email validity, required fields and 16px input text checked without submitting.
- JavaScript syntax checked; no browser console errors observed.

These are browser viewport checks, not physical-device tests. External form delivery and GitHub deployment must be checked after upload. No live website or repository was changed.
