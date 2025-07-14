/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.json",
    "./src/styles/**/*.css",
  ],
  theme: {
    // Enhanced container with TBH system integration
    container: {
      center: true,
      padding: {
        DEFAULT: "var(--container-padding-xs, 1rem)",
        sm: "var(--container-padding-sm, 2rem)",
        md: "var(--container-padding-md, 3rem)",
        lg: "var(--container-padding-lg, 4rem)",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      // Enhanced colors mapping TBH variables to Tailwind utilities
      colors: {
        // Legacy compatibility
        bg: "var(--color-bg, var(--background-card))",
        fg: "var(--color-fg, var(--primary-text))",
        primary: "var(--color-primary, var(--color-accent))",
        secondary: "var(--color-secondary, var(--color-brand-gradient-primary))",
        muted: "var(--color-muted, var(--muted-text))",
        
        // TBH Brand Colors
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          light: "var(--color-accent-light)",
          medium: "var(--color-accent-medium)",
        },
        brand: {
          soft: "var(--color-soft-black)",
          white: "var(--color-off-white)",
          charcoal: "var(--color-dark-charcoal)",
          grey: "var(--color-light-grey)",
        },
        
        // Semantic colors
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",
        
        // Background system
        background: {
          DEFAULT: "var(--background)",
          card: "var(--background-card)",
          hero: "var(--background-hero)",
          light: "var(--background-light)",
          dark: "var(--background-dark)",
        },
        
        // Text contrast system
        text: {
          high: "var(--primary-text)",
          medium: "var(--secondary-text)",
          low: "var(--muted-text)",
        },
      },
      
      // Enhanced font family with TBH system
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-heading)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono, ui-monospace)", "SFMono-Regular", "Menlo"],
        brand: ["var(--font-brand)", "Impact", "sans-serif"],
        alt: ["var(--font-alt)", "Georgia", "serif"],
      },
      
      // Enhanced font sizes using TBH variables
      fontSize: {
        'h1': 'var(--font-size-h1)',
        'h2': 'var(--font-size-h2)',
        'h3': 'var(--font-size-h3)',
        'h4': 'var(--font-size-h4)',
        'h5': 'var(--font-size-h5)',
        'body': 'var(--font-size-body)',
        'small': 'var(--font-size-small)',
        'caption': 'var(--font-size-caption)',
        'xsm': 'var(--font-size-xsm)',
      },
      
      // Enhanced spacing using TBH variables
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        'xxl': 'var(--spacing-xxl)',
        'header': 'var(--header-height)',
        'section-sm': 'var(--section-padding-small)',
        'section-md': 'var(--section-padding-medium)',
        'section-lg': 'var(--section-padding-large)',
        'section-hero': 'var(--section-padding-hero)',
      },
      
      // Enhanced border radius using TBH variables
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'xxl': 'var(--radius-xxl)',
        'pill': 'var(--radius-pill)',
        'circle': 'var(--radius-circle)',
      },
      
      // Enhanced shadows using TBH variables
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'accent': 'var(--glow-accent)',
        'accent-hover': 'var(--glow-accent-hover)',
        'success': 'var(--glow-success)',
        'warning': 'var(--glow-warning)',
      },
      
      // Enhanced transitions using TBH variables
      transitionDuration: {
        'fast': 'var(--animation-duration-fast)',
        DEFAULT: 'var(--animation-duration-normal)',
        'slow': 'var(--animation-duration-slow)',
      },
      
      transitionTimingFunction: {
        'portfolio': 'var(--animation-easing)',
        'bounce': 'var(--animation-easing-bounce)',
      },
      
      // Portfolio-specific dimensions
      height: {
        'header': 'var(--header-height)',
        'hero': 'var(--hero-min-height)',
        'hero-lg': 'var(--hero-large-height)',
        'video-player': 'var(--video-player-height)',
        'pdf-viewer': 'var(--pdf-viewer-height)',
        'before-after': 'var(--before-after-height)',
        'thumbnail': 'var(--thumbnail-height)',
      },
      
      maxWidth: {
        'container': 'var(--container-max-width)',
        'content': 'var(--container-content-width)',
        'narrow': 'var(--container-narrow-width)',
      },
      
      // Z-index using TBH variables
      zIndex: {
        'low': 'var(--z-index-low)',
        'medium': 'var(--z-index-medium)',
        'high': 'var(--z-index-high)',
        'navigation': 'var(--z-index-navigation)',
        'dropdown': 'var(--z-index-dropdown)',
        'modal': 'var(--z-index-modal)',
        'tooltip': 'var(--z-index-tooltip)',
      },
      
      // Enhanced animations with TBH system
      animation: {
        // Legacy animations
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        
        // TBH Portfolio animations
        "portfolio-fade": "portfolioFadeIn var(--animation-duration-normal) var(--animation-easing)",
        "portfolio-slide": "portfolioSlideUp var(--animation-duration-normal) var(--animation-easing)",
        "portfolio-scale": "portfolioScale var(--animation-duration-fast) var(--animation-easing)",
        "shimmer": "shimmer 1.5s infinite",
        "hover-lift": "hoverLift var(--animation-duration-fast) var(--animation-easing)",
      },
      
      keyframes: {
        // Legacy keyframes
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        
        // TBH Portfolio keyframes
        portfolioFadeIn: {
          "from": { opacity: "0" },
          "to": { opacity: "1" },
        },
        portfolioSlideUp: {
          "from": { opacity: "0", transform: "translateY(20px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        portfolioScale: {
          "from": { transform: "scale(0.95)", opacity: "0" },
          "to": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        hoverLift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "var(--translate-y-sm)" },
        },
      },
      
      // Grid templates for portfolio layouts
      gridTemplateColumns: {
        'media': 'var(--media-grid-columns)',
        'images': 'var(--image-grid-columns)', 
        'videos': 'var(--video-grid-columns)',
      },
      
      gap: {
        'grid-sm': 'var(--grid-gap-small)',
        'grid-md': 'var(--grid-gap-medium)',
        'grid-lg': 'var(--grid-gap-large)',
      },
    },
  },
  plugins: [
    // Typography plugin for rich text content
    require("@tailwindcss/typography")({
      theme: {
        extend: {
          typography: {
            DEFAULT: {
              css: {
                fontFamily: 'var(--font-body)',
                color: 'var(--primary-text)',
                a: {
                  color: 'var(--color-accent)',
                  '&:hover': {
                    color: 'var(--color-accent-hover)',
                  },
                },
                h1: {
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h1)',
                  color: 'var(--primary-text)',
                },
                h2: {
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h2)',
                  color: 'var(--primary-text)',
                },
                h3: {
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--font-size-h3)',
                  color: 'var(--primary-text)',
                },
                code: {
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: 'var(--background-light)',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                },
                blockquote: {
                  borderLeftColor: 'var(--color-accent)',
                  backgroundColor: 'var(--background-light)',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                },
              },
            },
          },
        },
      },
    }),
    
    // Forms plugin for better form styling
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
    
    // Aspect ratio utilities
    require("@tailwindcss/aspect-ratio"),
    
    // Line clamp utilities
    require("@tailwindcss/line-clamp"),
    
    // Container queries for responsive design
    require("@tailwindcss/container-queries"),
  ],
};