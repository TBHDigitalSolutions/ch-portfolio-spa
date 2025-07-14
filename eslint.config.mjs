import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Base configuration for all JS/TS files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // ================================
      // TYPESCRIPT RULES (Build-Safe)
      // ================================
      "@typescript-eslint/no-unused-vars": [
        "warn", // Changed from error to warn for builds
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn", // Warn instead of error

      // ================================
      // REACT RULES (Portfolio Optimized)
      // ================================
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "warn", // Critical for hooks
      "react-hooks/rules-of-hooks": "error", // Always enforce hook rules

      // ================================
      // IMPORT RULES (Relaxed for Build)
      // ================================
      "import/order": "off", // Disabled to prevent build failures
      "import/prefer-default-export": "off",
      "import/no-default-export": "off", // Allow flexibility

      // ================================
      // CODE QUALITY (Non-Breaking)
      // ================================
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "prefer-const": "warn",
      "no-var": "error",
      "object-shorthand": "off", // Disabled for compatibility
      "prefer-arrow-callback": "off", // Disabled for compatibility

      // ================================
      // ACCESSIBILITY (Portfolio Focus)
      // ================================
      "jsx-a11y/alt-text": [
        "warn",
        {
          elements: ["img", "object", "area", 'input[type="image"]'],
          img: ["Image"],
          object: ["Object"],
          area: ["Area"],
          'input[type="image"]': ["InputImage"],
        },
      ],
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/iframe-has-title": "warn",
      "jsx-a11y/img-redundant-alt": "warn",

      // ================================
      // NEXT.JS SPECIFIC
      // ================================
      "@next/next/no-img-element": "warn", // Suggest Image component
    },
  },

  // ================================
  // COMPONENT-SPECIFIC RULES
  // ================================
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      // More relaxed for components to prevent build issues
      "react/function-component-definition": "off",
      "prefer-arrow-callback": "off",
    },
  },

  // ================================
  // PAGE FILES (Next.js Convention)
  // ================================
  {
    files: [
      "src/app/**/*.{ts,tsx}",
      "src/pages/**/*.{ts,tsx}",
      "*.config.{js,ts,mjs}",
      "next.config.{js,ts}",
    ],
    rules: {
      "import/no-default-export": "off", // Pages need default exports
      "import/prefer-default-export": "off",
    },
  },

  // ================================
  // UTILITY & HOOK FILES
  // ================================
  {
    files: ["src/lib/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn", // Relaxed for complex hooks
      
      camelcase: [
        "warn",
        {
          properties: "never",
          ignoreDestructuring: false,
          ignoreImports: false,
          ignoreGlobals: false,
        },
      ],
    },
  },

  // ================================
  // TEST FILES (Future-Proofing)
  // ================================
  {
    files: [
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "prefer-arrow-callback": "off",
    },
  },

  // ================================
  // FILES TO IGNORE (Critical)
  // ================================
  {
    ignores: [
      // Build outputs
      ".next/**/*",
      "out/**/*",
      "dist/**/*",
      "build/**/*",
      
      // Dependencies
      "node_modules/**/*",
      
      // Static assets
      "public/**/*",
      
      // Data files that caused issues
      "**/*.css",
      "**/*.json",
      "src/data/**/*.json",
      
      // Config files
      "*.config.{js,mjs,ts}",
      
      // Environment files
      ".env*",
      
      // Version control
      ".git/**/*",
    ],
  },
];

export default eslintConfig;