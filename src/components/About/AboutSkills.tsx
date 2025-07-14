// src/components/About/AboutSkills.tsx
'use client';

import React from 'react';
import './aboutskills.css';

export type Skill = {
  id: string;
  label: string;
  description: string;
};

export type AboutSkillsProps = {
  title: string;
  skills: Skill[];
};

export default function AboutSkills({ title, skills }: AboutSkillsProps) {
  return (
    <div className="about-skills">
      <div className="skills-card">
        {/* Skills section title */}
        <h3 className="skills-title">{title}</h3>
        
        {/* Skills list with one-line format */}
        <ul className="skills-list">
          {skills.map((skill) => (
            <li 
              key={skill.id} 
              className="skill-item"
              tabIndex={0}
              role="listitem"
              aria-label={`${skill.label}: ${skill.description}`}
            >
              {/* Bullet point */}
              <span className="skill-bullet" aria-hidden="true">•</span>
              
              {/* One-line skill content with "skill : description" format */}
              <div className="skill-content">
                <p className="skill-text">
                  <span className="skill-label-inline">{skill.label}</span>
                  <span className="skill-separator">:</span>
                  {skill.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}