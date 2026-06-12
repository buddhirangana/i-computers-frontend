# 💻 IONIX Computers Frontend Application

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF.svg?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.1-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com)

Welcome to the frontend application repository of **IONIX Computers**, Sri Lanka's leading smart technology partner. This codebase delivers a premium, highly responsive, and high-performance e-commerce user interface tailored for computer hardware, custom gaming rigs, and tech accessories.

## 🎨 Design Philosophy & Aesthetics

IONIX Computers is built with a state-of-the-art tech aesthetic:
*   **Deep Dark Mode Palette**: Styled with curated harmonious dark shades (`#030712`, `#02040a`) accented with vibrant blue and tech glows.
*   **Fluid Interactions & Animations**: Rich micro-animations, hover scaling, and interactive glassmorphic cards to drive user engagement.
*   **Modern Typography**: Integrated with the premium **Mona Sans** font for a clean, futuristic reading experience.
*   **Fully Responsive**: Optimally crafted for mobile, tablet, and desktop viewports, with a specialized mobile navigation system.

## 🚀 Key Features

### 🛒 E-Commerce & Customer Journey
*   **Landing Page**: Interactive slideshows, featured brands, categories, and real-time trending products.
*   **Interactive Store**: Responsive product list with advanced search, tags, dynamic filtering, and detailed page listings.
*   **Product Overview**: Detailed specifications sheets, warranty options, and high-fidelity product modals.
*   **Cart & Checkout Pipeline**: Seamless state-managed shopping cart with checkout wizard, price calculations, and confirmation details.
*   **Customer Profiles**: Order tracking interface (`/my-orders`) detailing order stages, order items, and shipping status.

### 🔐 Authentication & Security
*   **OAuth Integration**: Full Google Sign-In support via `@react-oauth/google`.
*   **Local Accounts**: Account creation, authentication flow, and forgotten password recovery layouts.

### 🛠️ Admin Control Dashboard
*   **Inventory Management**: Dedicated layout to inspect products, add items, configure metadata, and delete assets with safety confirmations.
*   **Order Review**: Administrative view of incoming client requests, dispatch statuses, and details.

## 🛠️ Technology Stack

*   **Core Framework**: [React 19](https://react.dev/) (Functional Components, Hooks, Contexts)
*   **Build Tool & Dev Server**: [Vite 7](https://vite.dev/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS
*   **Routing**: [React Router DOM v7](https://reactrouter.com/)
*   **API Client**: [Axios](https://axios-http.com/)
*   **State / Notifications**: [React Hot Toast](https://react-hot-toast.com/)
*   **Database / Auth Integration**: [Supabase JS Client](https://supabase.com/) & Google OAuth

## 📁 Project Directory Structure

```text
i-computers-frontend/
├── public/                # Static public assets (images, logos, favicon)
├── src/
│   ├── assets/            # Local asset files (stylesheets, fonts)
│   ├── components/        # Reusable global UI widgets & layout wrappers
│   │   ├── footer.jsx     # Tech-accented footer with brand info
│   │   ├── header.jsx     # Navigation bar with responsive links & user dropdown
│   │   └── ...            # Modals, sliders, cards, loading animations
│   ├── pages/             # Page view containers for Router
│   │   ├── admin/         # Sub-views for admin panels
│   │   ├── homePage.jsx   # Core content container
│   │   ├── productsPage.jsx# Grid list & sidebar queries
│   │   └── ...            # About, Contact, FAQ, Terms, Cart, Checkout
│   ├── utils/             # Helper libraries & APIs
│   │   ├── api.js         # Base Axios client instance
│   │   ├── cart.js        # Cart helpers
│   │   └── ...            # Price formatters & media uploading utilities
│   ├── App.css            # Component-level styles
│   ├── App.jsx            # Router setup & Google OAuth Context wrapper
│   ├── index.css          # Tailwind CSS layer definitions & color variables
│   └── main.jsx           # React app entrypoint
├── index.html             # HTML Shell with Mona Sans font import
├── vite.config.js         # Vite compilation preferences
├── package.json           # Declared dependencies and scripts
└── LICENSE                # Apache 2.0 license file
```

## ⚙️ Getting Started

### 📋 Prerequisites
*   [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
*   [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### 🔧 Installation

1.  Clone the repository and navigate to the directory:
    ```bash
    git clone https://github.com/buddhirangana/i-computers-frontend.git
    cd i-computers-frontend
    ```

2.  Install the package dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the root directory and specify the backend API URL:
    ```env
    VITE_API_URL="http://localhost:3000/api"
    ```

### 💻 Running Locally
To launch the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
By default, the application will run at [http://localhost:5173](http://localhost:5173).

### 🏗️ Building for Production
To generate a compiled production-ready bundle inside the `dist/` directory:
```bash
npm run build
```

## 📄 License

This project is licensed under the **Apache License, Version 2.0**. For details, please see the [LICENSE](LICENSE) file in the root directory.

```text
Copyright 2026 Buddhi Rangana

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
