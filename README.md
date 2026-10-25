# Lumina Optical & Eyewear Clinic

A modern, responsive web application for an independent optometry practice and boutique eyewear atelier.

## Features

- **Prescription Glasses Catalog**: Handcrafted Japanese titanium and Italian Mazzucchelli acetate frames with live SVG vector renders and colorway switching.
- **Interactive Lens Configurator**: Single vision, free-form progressive, and blue-light screen defense with prescription input and upload.
- **Clinical Appointment Booking**: Scheduling engine for comprehensive exams, contact lens evaluations, and frame styling with `.ics` calendar export.
- **Clinic Information**: Weekly schedule with dynamic "Open Today" indicators, doctor credentials, address, and insurance networks accepted.
- **Patient Reviews & Testimonials**: Community feedback with star ratings and live review submission.
- **Vision Journal & Lens Care**: Doctor-authored eye health guides and interactive Pupillary Distance (PD) measurement tool.
- **Secure E-Commerce**: Shopping bag drawer, insurance reimbursement claim invoices, promo code support, and checkout receipt.
- **Dark & Light Mode**: Built-in toggle with optical compensation and local storage persistence.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started Locally

1. Clone or extract this repository:
   ```bash
   git clone <YOUR_REPO_URL>
   cd <YOUR_REPO_FOLDER>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` (or the port indicated in your terminal).

4. Build for production:
   ```bash
   npm run build
   ```
   The compiled static assets will be in the `dist` directory.

## Deploying to Vercel or Netlify

1. Push your repository to **GitHub**.
2. Connect your repository to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
3. Use the following build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add your custom domain under your project settings.
