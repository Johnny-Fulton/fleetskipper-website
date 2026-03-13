module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    // Web Anchor Mode Rules
    "no-console": ["error", { allow: ["warn", "error"] }], // No console.log in production
    "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }], // Page size limit
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    
    // Enforce no raw hex colors - custom rule would go here
    // For now, use grep in CI to check for hex colors
  },
  overrides: [
    {
      // Stricter rules for components
      files: ["src/components/**/*.{ts,tsx}"],
      rules: { 
        "max-lines": ["error", { max: 200, skipBlankLines: true, skipComments: true }] // Component size limit
      },
    },
    {
      // Allow console in server-side code
      files: ["src/lib/actions/**/*.{ts,tsx}", "src/lib/services/**/*.{ts,tsx}"],
      rules: {
        "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      },
    },
  ],
};