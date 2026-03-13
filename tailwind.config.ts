// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default <Partial<Config>>{
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    container: { 
      center: true, 
      padding: { DEFAULT: "1rem", md: "2rem" } 
    },
    extend: {
      colors: {
        // FleetSkipper Brand Colors
        navy: "#1e3a5f",           // Primary Navy Blue
        "navy-dark": "#142a45",     // Darker navy for depth
        "navy-light": "#2a4a6f",    // Lighter navy for hover states
        teal: "#00a8cc",            // Secondary Teal/Cyan
        "teal-dark": "#008fb3",     // Darker teal
        "teal-light": "#33b8d6",    // Lighter teal
        orange: "#ff6b35",          // Accent Safety Orange for CTAs
        "orange-dark": "#e65a2e",   // Darker orange for hover
        "orange-light": "#ff8557",  // Lighter orange
        "body-text": "#4B535D",     // Body text gray
        ink: "#0B132B",             // Very dark text
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        card: "0 8px 24px rgba(2,6,23,0.06)",
        "card-sm": "0 6px 18px rgba(2,6,23,0.05)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // Decorative gradients (as tokens to avoid inline hex)
        'gradient-hero': 'linear-gradient(115deg, #f0f9ff 28%, #e0f2fe 70%, #bfdbfe)',
        'gradient-glow': 'linear-gradient(145deg, #f0f9ff 28%, #e0f2fe 70%, #dbeafe)',
        'gradient-brand': 'linear-gradient(to right, #fff1be 28%, #ee87cb 70%, #b060ff)',
        'gradient-card-glow': 'radial-gradient(120% 80% at 50% 0%, rgba(14, 26, 43, 0.13) 0%, transparent 60%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'gradient-premium': 'linear-gradient(135deg, #c65d00 0%, #f97316 50%, #fb923c 100%)',
      },
    },
  },
  safelist: [
    // FleetSkipper brand tokens
    { pattern: /(bg|text|fill|stroke|ring|border)-(navy|teal|orange|ink|body-text)(-dark|-light)?/ },
    // neutral helpers we use on cards/sections
    { pattern: /(bg|text|ring|border)-(gray|slate)-(50|100|200|300|400|500|600|700|800|900)/ },
    // gradients/overlays
    { pattern: /(from|via|to)-(navy|teal|orange|white|black)/ },
    'shadow-sm','shadow-md','shadow-lg','ring-1','ring-2','rounded-xl','rounded-2xl','rounded-full'
  ],
  plugins: [typography],
};

// Token mapping guide for refactoring:
// #0E1A2B → navy
// #13263F → navy-light
// #0891B2 → sea-teal
// #F97316 → brand-orange
// #4a5f7a → legacy-blue (to be replaced)
// #5a7a8a → legacy-blue-light (to be replaced)