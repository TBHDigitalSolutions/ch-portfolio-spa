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
  
  // Custom rules for portfolio project
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // React specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "warn",

      // Import rules for clean organization
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external", 
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // General code quality rules
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-arrow-callback": "error",

      // Accessibility rules for portfolio
      "jsx-a11y/alt-text": [
        "error",
        {
          elements: ["img", "object", "area", 'input[type="image"]'],
          img: ["Image"],
          object: ["Object"],
          area: ["Area"],
          'input[type="image"]': ["InputImage"],
        },
      ],
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/iframe-has-title": "error",
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/no-access-key": "error",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
    },
  },

  // Specific rules for component files
  {
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      // Enforce proper component naming
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      
      // Ensure components are properly exported
      "import/prefer-default-export": "off",
      "import/no-default-export": "error",
    },
  },

  // Specific rules for page files (allow default exports)
  {
    files: [
      "src/app/**/*.{ts,tsx}",
      "*.config.{js,ts,mjs}",
      "next.config.{js,ts}",
    ],
    rules: {
      "import/no-default-export": "off",
      "import/prefer-default-export": "error",
    },
  },

  // Rules for utility and hook files
  {
    files: ["src/lib/**/*.{ts,tsx}", "src/hooks/**/*.{ts,tsx}"],
    rules: {
      // Enforce proper hook naming
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      
      // Utility function naming
      camelcase: [
        "error",
        {
          properties: "never",
          ignoreDestructuring: false,
          ignoreImports: false,
          ignoreGlobals: false,
        },
      ],
    },
  },

  // Rules for data files
  {
    files: ["src/data/**/*.json"],
    rules: {
      // JSON files don't need most rules
      "no-unused-expressions": "off",
    },
  },

  // Rules for CSS files
  {
    files: ["**/*.css"],
    rules: {
      // Disable JS rules for CSS files
      "import/no-default-export": "off",
    },
  },

  // Test files (if you add them later)
  {
    files: [
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
    rules: {
      // Relax some rules for test files
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
];

export default eslintConfig;