# Radiometrically Agnostic SegFormer for SAR Water Segmentation

A high-performance, interactive portfolio website showcasing a deep learning framework for extracting water bodies from C-Band Synthetic Aperture Radar (SAR) imagery.

![Project Banner](https://img.shields.io/badge/Framework-React%20%2B%20Vite-cyan) ![Style](https://img.shields.io/badge/Styling-TailwindCSS-38bdf8) ![Status](https://img.shields.io/badge/Status-Production%20Ready-green)

## 🌊 Algorithmic Overview

This project implements a visual explanation and interactive demo of the **SegFormer (MiT-B0)** adaptation for remote sensing.

### Key Technical Contributions:
1.  **Multi-Modal Input**: Accepts a 4-channel stack (`SAR VV`, `SAR VH`, `DEM`, `Slope`) instead of standard RGB.
2.  **Radiometric Agnosticism**: Utilizes a per-scene normalization strategy that allows the model to perform robustly regardless of whether the input is Sigma Naught, Beta Naught, or Gamma Naught.
3.  **Architecture**:
    *   **Backbone**: Mix-Vision Transformer (MiT-B0) - Lightweight and efficient.
    *   **Decoder**: All-MLP decoder for aggregating multi-scale features.
    *   **Performance**: Achieves **0.958 Water IoU** while being **48% faster** than the larger B1 variant.

## 🛠️ Web Architecture

The portfolio is built as a Single Page Application (SPA) using modern frontend technologies to ensure high performance and interactivity.

*   **Core**: React 18 with TypeScript for type safety.
*   **Build System**: Vite for extremely fast HMR and optimized production bundles.
*   **Styling**: Tailwind CSS for a responsive, dark-themed UI using a Slate/Cyan palette.
*   **Visualizations**:
    *   `recharts` for radar and bar charts comparing model metrics.
    *   HTML5 Canvas for the "Neural Network" particle background.
    *   CSS Clip-paths for the interactive image comparison sliders.

## 📂 Asset Structure

To run this project effectively, ensure you have the following folder structure in your `public` directory:

```
public/
└── assets/
    ├── fig3_sar.png    # Raw SAR input (Figure 3 from ATBD)
    ├── fig3_mask.png   # Prediction mask (Figure 3 from ATBD)
    ├── fig5_sar.png    # Raw SAR input (Figure 5 from ATBD)
    ├── fig5_mask.png   # Prediction mask (Figure 5 from ATBD)
    └── ATBD.pdf        # The full PDF document
```

## 🚀 Installation & Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
To start the development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
To compile the TypeScript and bundle the assets:
```bash
npm run build
```
The output will be in the `dist/` directory.

### 4. Deploy to GitHub Pages
The project is configured to deploy specifically to GitHub Pages.

1.  Ensure your `git` remote is set up.
2.  Run the deploy script:
```bash
npm run deploy
```
This command builds the project and pushes the `dist` folder to a `gh-pages` branch on your repository.

## 📄 License
[Insert License Here]

---
*Developed by the Water Resources Group (WRG), National Remote Sensing Centre.*
