// src/components/About/index.tsx
'use client';

import React from 'react';
import Divider from '@/components/Base/SectionDivider/Divider';

// Import About sub-components
import Title from './Title';
import Tagline from './Tagline';
import About from './About';
import AboutSkills from './AboutSkills';
import AboutContact from './AboutContact';

// Import JSON data files
import aboutData from '@/data/content/about.json';
import skillsData from '@/data/content/skills.json';
import contactData from '@/data/content/contact.json';

// Import section-wide CSS
import './aboutsection.css';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-section-container">
        {/* Header: Title + Tagline */}
        <Title title={aboutData.title} />
        <Tagline tagline={aboutData.tagline} />

        {/* Contact information and links */}
        <AboutContact links={contactData.links} />

        {/* Visual separator */}
        <Divider />

        <div className="about-content-wrapper">
          {/* Two-column layout: 60% About | 40% Skills with horizontal divider */}
          <div className="about-main-content">
            <div className="about-intro-column">
              {/* Introduction paragraphs */}
              <About intro={aboutData.intro} />
            </div>
            
            {/* Horizontal divider between sections */}
            <div className="about-skills-divider"></div>
            
            <div className="about-skills-column">
              {/* Skills showcase */}
              <AboutSkills title={skillsData.title} skills={skillsData.skills} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}