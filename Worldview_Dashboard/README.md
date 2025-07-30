# 4K Real-Time Earth Visualization Dashboard

This document outlines the design for a high resolution dashboard targeted at amateur radio operators and global observers. The interface is intended for large HDMI displays and should function well at resolutions up to 4K.

## Core Technologies

- **Visualization Engine**: [CesiumJS](https://cesium.com/platform/cesiumjs/) for a 3‑D globe capable of rendering at 4K.
- **Web Framework**: Node.js with Express serves the static dashboard and provides API endpoints. WebSockets (via `socket.io`) deliver real-time updates.
- **Mapping Framework**: Cesium imagery layers combined with optional Leaflet 2‑D overlays for simpler map views.
- **Data Aggregation**: Background worker scripts collect external data feeds such as propagation or satellite positions and cache them for rapid display.
- **Display Hardware**: Any 4K‑capable HDMI monitor or TV driven by a small computer (Raspberry Pi 4, mini‑PC, etc.) running a modern browser in full‑screen/kiosk mode.

## Major Features

1. **Live DX Propagation**
    - Refresh band‑by‑band propagation every 10 minutes.
    - Data sources can include VOACAP online predictions or community DX clusters.
2. **Call Sign & ADIF Log Display**
    - ADIF log files uploaded through the web UI.
    - Recent contacts appear in a table overlaid on the map with selectable font and color.
3. **MUF Visualizations**
    - Option to view topographic or heat map modes showing Maximum Usable Frequency data.
4. **Maidenhead Grid Overlays**
    - The map can show grid lines to aid contesting and geographic awareness.
5. **Solar Weather & Aurora Activity**
    - Integrate current solar indices (sunspot number, Kp index, etc.) and display aurora probability around polar regions.
6. **AMSAT Satellite Tracking**
    - Selectable satellite footprints with real‑time positions.

## Environmental and Global Overlays (Optional)

- Live global weather layers: precipitation, wind, pressure, temperature and cloud cover.
- Commercial aviation tracker visualizing up to 500 flights at once.
- COVID‑19 statistics on a country level (updated daily).
- ISS and additional satellite locations for over 400 tracked objects.

## Display Customization

- **Mapsets**: Greyscale, topographic, ham‑radio focused and other thematic styles. Five mapsets come pre‑loaded with lifetime updates.
- **Location Pins**: Up to 16 customizable pins with local time display.
- **Dynamic & Static Layers**: Earth at night overlay, shipping routes, undersea cables, and more.
- **Premium Layers**: Earthquake and volcano locations, atmospheric pollutant measurements.
- **Display Modes**: Real‑time view, time‑lapse simulation (e.g. 1 year in 15 seconds) and automatic cycling of layers.

## Directory Layout

```
Worldview_Dashboard/
├── README.md             # This design document
├── server.js             # Express server with WebSocket support (skeleton)
└── public/
    ├── index.html        # Front-end entry point running CesiumJS
    └── js/
        └── main.js       # Client-side logic for fetching and displaying data
```

## Setup Outline

1. Install Node.js (`>=16`).
2. Install dependencies:
   ```bash
   npm install express socket.io
   ```
3. Run the server:
   ```bash
   node server.js
   ```
4. Open `http://localhost:3000` in a Chromium-based browser set to kiosk mode for best 4K display results.

---
This document provides an overall blueprint. Individual features will require integration with third-party APIs or data feeds and additional security considerations.
