// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@next/next/recommended" // ✅ ADD THIS LINE
  ),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // ✅ FIXED: Add Next.js specific rules
      "@next/next/no-img-element": "warn",
      
      // React Hooks rules (critical)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_" 
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Console rules (warn instead of error for development)
      "no-console": "warn",
      
      // Import rules
      "import/no-unused-modules": "off",
      
      // JSX accessibility
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
  {
    // Development overrides
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules/**", ".next/**", "out/**"],
  },
];

export default eslintConfig;