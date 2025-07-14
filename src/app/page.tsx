// src/app/page.tsx
'use client';

import React from 'react';
import { Element } from 'react-scroll';
import dynamic from 'next/dynamic';

import AboutSection from '@/components/About';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import MediaShowcase from '@/components/MediaShowcase';
import VideoGrid from '@/components/VideoGrid';
import ImageGrid from '@/components/ImageGrid';
import Divider from '@/components/Base/SectionDivider/Divider';

// Dynamically import PDFGallery to prevent SSR issues
const PDFGallery = dynamic(() => import('@/components/PDFGallery'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-600">Loading PDF Gallery...</div>
    </div>
  ),
});

import beforeAfterData from '@/data/media/beforeAfterSlider.json';
import beforeAfterRationale from '@/data/content/beforeAfterRationale.json';
import mediaShowcaseData from '@/data/media/mediaShowcase.json';
import pdfGalleryData from '@/data/media/pdfGallery.json';
import documentDesignRationale from '@/data/content/documentDesignRationale.json';
import videoGridData from '@/data/media/videoGrid.json';
import videoGridRationale from '@/data/content/videoGridRationale.json';
import imageGridData from '@/data/media/imageGrid.json';
import imageGridRationale from '@/data/content/imageGridRationale.json';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* About & Skills Section */}
      <Element name="about" className="section-anchor" id="about">
        <section className="py-16 scroll-mt-24">
          <AboutSection />
        </section>
      </Element>
      <Divider />

      {/* Before & After Transformations */}
      <Element name="before-after" className="section-anchor" id="before-after">
        <section className="py-16 scroll-mt-24">
          <BeforeAfterSlider
            items={beforeAfterData}
            rationaleData={beforeAfterRationale}
          />
        </section>
      </Element>
      <Divider />

      {/* Media Showcase - Quick Look */}
      <Element name="media-showcase" className="section-anchor" id="media-showcase">
        <section className="py-16 scroll-mt-24">
          <MediaShowcase data={mediaShowcaseData} />
        </section>
      </Element>
      <Divider />

      {/* Document Design & PDF Gallery */}
      <Element name="documents" className="section-anchor" id="documents">
        <section className="py-16 scroll-mt-24">
          <PDFGallery
            documents={pdfGalleryData}
            rationaleData={documentDesignRationale}
          />
        </section>
      </Element>
      <Divider />

      {/* Video Content Showcase */}
      <Element name="video-content" className="section-anchor" id="video-content">
        <section className="py-16 scroll-mt-24">
          <VideoGrid
            data={videoGridData}
            rationaleData={videoGridRationale}
          />
        </section>
      </Element>
      <Divider />

      {/* Visual Content Gallery */}
      <Element name="image-gallery" className="section-anchor" id="image-gallery">
        <section className="py-16 scroll-mt-24">
          <ImageGrid
            images={imageGridData}
            rationaleData={imageGridRationale}
          />
        </section>
      </Element>
      <Divider />
    </div>
  );
}