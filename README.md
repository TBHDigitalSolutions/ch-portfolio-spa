# Portfolio SPA

A modern, responsive single-page application showcasing creative portfolio work including video editing, photo retouching, document design, and media production. Built with Next.js 15 and React 19, featuring optimized media handling and an interactive design system.

## 🌐 Live Site

**URL**: [https://content-portfolio.conorhovis.com/](https://content-portfolio.conorhovis.com/)

**Site Metadata**:
- **Title**: "Conor Hovis | Content Portfolio"
- **Description**: "Showcasing my work in photo editing, document design, media production, and more."
- **Author**: Conor Hovis
- **Creator**: TBH Digital Solutions

## 📍 Repository Information

- **Repository**: `ch-portfolio-spa`
- **GitHub Organization**: `TBHDigitalSolutions`
- **Remote URL (SSH)**: `git@github.com:TBHDigitalSolutions/ch-portfolio-spa.git`
- **Local Directory**: `/Users/conorhovis/portfolio-spa`
- **Branch**: `main`

### Quick Repository Setup

```bash
# Clone the repository
git clone git@github.com:TBHDigitalSolutions/ch-portfolio-spa.git
cd ch-portfolio-spa

# Or if you're working with the existing local directory
cd /Users/conorhovis/portfolio-spa

# Verify remote connection
git remote -v

# If remote needs to be added/updated
git remote add origin git@github.com:TBHDigitalSolutions/ch-portfolio-spa.git
# or
git remote set-url origin git@github.com:TBHDigitalSolutions/ch-portfolio-spa.git
```

## ☁️ Content Delivery & Storage

### Google Cloud Storage

All media assets are hosted on **Google Cloud Storage** for optimal performance and global CDN delivery.

**Project Information**:
- **Project Name**: CH-Portfolio-SPA
- **Project ID**: `ch-portfolio-spa`
- **Project Number**: 149339672740

**Storage Bucket**:
- **Bucket Name**: `ch-portfolio-spa-content-bucket`
- **Location**: `us-central1` (Iowa)
- **Storage Class**: Standard
- **Public Access**: Public to internet
- **Protection**: Soft Delete

### Asset Organization

```
ch-portfolio-spa-content-bucket/
└── assets/
    ├── before-after-slider/     # Before/after comparison images
    ├── image-grid/              # Portfolio gallery images
    ├── media-showcase/          # Audio/video showcase files
    ├── pdf-gallery/             # PDF documents and thumbnails
    └── video-grid/              # Video content by category
        ├── corporate/           # Corporate video content
        └── creative/            # Creative video content
```

### Content URLs

All media assets follow the pattern:
```
https://storage.googleapis.com/ch-portfolio-spa-content-bucket/assets/[category]/[filename]
```

**Example JSON Structure**:
```json
{
  "id": "encapsulation-before-and-after-music",
  "src": "https://storage.googleapis.com/ch-portfolio-spa-content-bucket/assets/video-grid/corporate/Encapsulation Before&After MUSIC.MP4",
  "thumbnail": "https://storage.googleapis.com/ch-portfolio-spa-content-bucket/assets/video-grid/corporate/encapsulation-before-and-after-music-thumb.png",
  "title": "Encapsulation Before & After Music",
  "category": "Corporate"
}
```

### Content Management Benefits

- **Global CDN**: Fast loading times worldwide
- **Scalability**: Handles high traffic and large files
- **Cost Effective**: Pay-as-you-go pricing model
- **Security**: Configurable access controls and permissions
- **Reliability**: 99.9% uptime SLA with automatic backups
- **Performance**: Optimized delivery with compression and caching

## 🚀 Features

- **Interactive Media Showcase** - Video.js powered video player with support for multiple formats
- **Before/After Photo Comparisons** - Slider-based image comparisons for photo retouching work
- **PDF Gallery** - Interactive PDF viewer with controls and thumbnails
- **Video Grid** - Organized video content with corporate and creative categories
- **Image Grid** - Masonry layout with lightbox functionality
- **Responsive Design** - Mobile-first approach with breakpoint-aware components
- **Performance Optimized** - Lazy loading, image optimization, and intersection observers
- **Accessibility First** - ARIA labels, keyboard navigation, and reduced motion support

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5 (App Router)
- **Frontend**: React 19, TypeScript 5
- **Styling**: Tailwind CSS 4.1.11 with custom design system
- **Media**: Video.js 8.23.3 with YouTube support
- **PDF Viewer**: @react-pdf-viewer/core 3.12.0
- **Image Comparisons**: react-compare-slider 3.1.0
- **Layouts**: react-masonry-css 1.0.16
- **Modals**: react-modal 3.16.3
- **Navigation**: react-scroll 1.9.3
- **Build Tools**: Turbopack (dev), PostCSS, Autoprefixer

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main home page
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   ├── About/              # About section components
│   ├── Base/               # Navigation and layout components
│   ├── BeforeAfterSlider/  # Image comparison components
│   ├── Footer/             # Footer components
│   ├── ImageGrid/          # Image gallery with lightbox
│   ├── MediaShowcase/      # Audio/video player components
│   ├── PDFGallery/         # PDF viewer components
│   ├── SectionRationale/   # Content explanation components
│   └── VideoGrid/          # Video gallery components
├── data/
│   ├── content/            # JSON content for copy and rationale
│   └── media/              # JSON arrays of media items
├── lib/
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
└── styles/
    ├── root.css            # CSS custom properties (design system)
    ├── globals.css         # Global imports and resets
    └── _fonts.css          # Font declarations
```

## 🎨 Design System

The project uses a comprehensive design system defined in `styles/root.css`:

- **Color Palette** - Consistent color variables (`--color-accent`, `--color-soft-black`)
- **Typography** - Font families, sizes, and line heights
- **Spacing** - Standardized spacing scale (`--spacing-sm`, `--section-padding-*`)
- **Grid Systems** - Responsive grid templates for different content types
- **Breakpoints** - Mobile-first responsive design breakpoints
- **Animations** - Smooth transitions and hover effects

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone git@github.com:TBHDigitalSolutions/ch-portfolio-spa.git
cd ch-portfolio-spa

# Or navigate to existing local directory
cd /Users/conorhovis/portfolio-spa

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Workflow

```bash
# Check current status
git status

# Stage all changes
git add --all

# Commit changes
git commit -m "🛠 Update: describe your changes"

# Push to GitHub
git push origin main

# Check last commit
git log --oneline -n 1

# Force push if needed (use with caution)
git push origin main --force
```

### Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📊 Content Management

Content is managed through JSON files in the `src/data/` directory:

### Media JSON Structure

```typescript
// Video items
interface VideoItem {
  id: string;
  src: string;
  thumbnail: string;
  title: string;
  category: 'Corporate' | 'Creative';
}

// Image items
interface ImageItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  priority?: boolean;
}

// PDF items
interface PDFItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  pages: number;
  fileSize: string;
  category: string;
  tags: string[];
}
```

### Content JSON Structure

```typescript
// Section rationale
interface SectionRationale {
  sectionTitle: string;
  description: string[];
  why: { title: string; text: string }[];
  finalInfo: { label: string; value: string }[];
}

// About content
interface AboutContent {
  title: string;
  intro: string[];
  // ... other fields
}
```

## 🎥 Media Components

### Video Grid

Displays categorized video content with:
- Corporate and Creative categories
- Video.js player with quality controls
- Thumbnail previews
- Responsive grid layout

### Image Grid

Features three layout variants:
- **Instagram**: Fixed-height grid with variable column spans
- **Masonry**: Dynamic column layout
- **Portfolio**: Optimized for portfolio showcase

### Before/After Slider

Interactive comparison slider for photo retouching work:
- Smooth sliding animation
- Thumbnail navigation
- Mobile-optimized touch controls

### PDF Gallery

Interactive PDF viewer with:
- Page navigation controls
- Zoom functionality
- Thumbnail preview
- Fullscreen mode

## 🎯 Performance Optimization

- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Lazy Loading**: Intersection Observer for offscreen content
- **Dynamic Imports**: Code splitting for heavy libraries
- **Media Optimization**: Automatic format selection and compression
- **Caching**: Browser caching for static assets

## ♿ Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader support for interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user motion preferences
- **High Contrast**: Supports high contrast mode

## 🌐 SEO & Metadata

Comprehensive SEO optimization including:
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data markup
- Semantic HTML structure
- Optimized images with alt text

## 🔧 Configuration

### Tailwind CSS

Custom configuration extends the default theme to work with CSS variables:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/data/**/*.json',
  ],
  theme: {
    extend: {
      colors: {
        'soft-black': 'var(--color-soft-black)',
        'accent': 'var(--color-accent)',
        // ... other custom colors
      },
      // ... other theme extensions
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
```

### Next.js

Optimized configuration for portfolio assets with Google Cloud Storage integration:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/ch-portfolio-spa-content-bucket/**',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      'video.js': 'video.js/dist/video.min.js',
    },
  },
}
```

### Content Security Policy

The application includes CSP headers for Google Cloud Storage:

```typescript
// Content Security Policy includes:
'img-src': ['https://storage.googleapis.com'],
'media-src': ['https://storage.googleapis.com'],
'object-src': ['https://storage.googleapis.com'],
```

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first CSS approach
- Breakpoint-specific layouts
- Touch-optimized interactions
- Flexible grid systems
- Scalable typography

## 🔄 Development Workflow

1. **Component Development**: Each component has its own directory with TypeScript file and CSS
2. **Data-Driven**: Content managed through JSON files for easy updates
3. **Type Safety**: Full TypeScript support with strict type checking
4. **Performance Monitoring**: Built-in performance optimizations and monitoring

## 🔧 Repository Management

### Git Commands Reference

| Action | Command |
|--------|---------|
| Check status | `git status` |
| Check remote | `git remote -v` |
| Add remote | `git remote add origin git@github.com:TBHDigitalSolutions/ch-portfolio-spa.git` |
| Remove remote | `git remote remove origin` |
| Stage all changes | `git add --all` |
| Commit changes | `git commit -m "📝 Your commit message"` |
| Push to main | `git push origin main` |
| View last commit | `git log --oneline -n 1` |
| Open project in Finder | `open .` |
| Check .gitignore | `git check-ignore -v <filename>` |

### Repository Structure

```
/Users/conorhovis/portfolio-spa/
├── .git/                   # Git repository data
├── .gitignore             # Git ignore rules
├── .next/                 # Next.js build output (ignored)
├── node_modules/          # Dependencies (ignored)
├── public/                # Static assets
├── src/                   # Source code
├── README.md              # This file
├── package.json           # Dependencies and scripts
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

### Deployment

The application is configured for deployment on:
- **Vercel** (recommended for Next.js) - Auto-deploys from main branch
- **Netlify** - Can be configured with build command `npm run build`
- **GitHub Pages** - Static export possible with `next export`

**Live Site**: [https://content-portfolio.conorhovis.com/](https://content-portfolio.conorhovis.com/)

```bash
# Build for production
npm run build

# Test production build locally
npm run start
```

### Environment Variables

For local development, create a `.env.local` file:

```bash
# Google Cloud Storage Configuration
NEXT_PUBLIC_GCS_BUCKET_URL=https://storage.googleapis.com/ch-portfolio-spa-content-bucket
NEXT_PUBLIC_SITE_URL=https://content-portfolio.conorhovis.com
```

## 📱 Live Demo

🌐 **Production Site**: [https://content-portfolio.conorhovis.com/](https://content-portfolio.conorhovis.com/)  
🔗 **GitHub Repository**: [https://github.com/TBHDigitalSolutions/ch-portfolio-spa](https://github.com/TBHDigitalSolutions/ch-portfolio-spa)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "✨ Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Contact

**Developer**: Conor Hovis  
**Organization**: TBH Digital Solutions  
**Repository**: [ch-portfolio-spa](https://github.com/TBHDigitalSolutions/ch-portfolio-spa)

For questions or support, please open an issue in the GitHub repository.