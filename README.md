# Music Wall

A desktop music wall built to run as a visual, interactive wallpaper, perfect for Wallpaper Engine or running as a standalone ambient display. It turns your desktop background into a clean, intentional grid of album-style tiles that look and feel like a curated "vinyl wall" rather than a generic media app.

## Features

* **Interactive Tiles:** Each tile represents a song or audio item. Click a tile to play it, click a different tile to switch tracks seamlessly, and click the active tile to pause.
* **Aesthetic Focus:** The look matters just as much as the function. Tiles use a square aspect ratio and perfect grid alignment.
* **Simple Setup:** Supply music and artwork locally via URLs, and organize everything directly from the UI without complex configuration files.
* **Persistent Layouts:** Your tile placements and global wall settings are saved securely using local storage, ensuring your wallpaper is exactly as you left it across restarts.
* **Editable Settings:** Easy-to-use modals for editing individual tile settings (Artist, Title, Artwork URL, Audio URL) and tweaking global layouts (Columns & Rows).

## Previews

*(Add screenshots or GIFs of your live Wall, Edit Modal, and Sources Top Bar here)*

## Installation & Running Locally

This project is built with **Vite**, **React**, **Tailwind CSS**, and **Zustand**.

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository_url>
   cd music-wall
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server:**
   \`\`\`bash
   npx vite
   \`\`\`
   Navigate to the local URL (usually `http://localhost:5173`) in your browser to view the wall.

4. **Build for production:**
   \`\`\`bash
   npm run build
   \`\`\`
   This will generate a `dist` folder, which can be deployed to a static host or imported into Wallpaper Engine as a web wallpaper.

## How to Use

* **Playing Audio:** Add a valid audio URL to a tile via the settings gear. Once added, clicking the tile anywhere will toggle play/pause for that track.
* **Editing a Tile:** Hover over a tile and click the gear icon in the top right to open the Tile Editor. Here you can add album art URLs, audio URLs, and track info.
* **Changing the Grid:** Click the main gear icon in the bottom right of the screen to change the overall grid dimensions. *Note: Changing grid dimensions will reset the current tile layout.*
* **Import Sources:** Hover near the top edge of the screen to reveal the 'IMPORT SOURCES' tab. Currently, only the manual source is active, but future integrations for streaming services (Spotify, Apple Music) will live here.
