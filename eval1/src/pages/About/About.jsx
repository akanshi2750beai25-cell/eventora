import './About.css';
import React from 'react';
import { 
  Sparkles, Code, GraduationCap, ShieldCheck, 
  Users, CheckCircle2, Cpu, Award, BookOpen 
} from 'lucide-react';

export default function About() {
  const techStack = [
    { name: 'HTML5 Semantic Markup', desc: 'Accessible document structure with semantic header, nav, main, section, article, and footer elements.' },
    { name: 'CSS3 & Design Tokens', desc: 'CSS Box Model, Flexbox, Grid, custom properties (CSS variables), Dark/Light theme, and micro-animations.' },
    { name: 'JavaScript ES6+', desc: 'Modern arrow functions, destructuring, spread/rest syntax, async/await, and Promises in event service.' },
    { name: 'React 18 & Custom Hooks', desc: 'useState, useEffect for countdowns, useRef for autofocus, useMemo for filtering, useLocalStorage hook.' },
    { name: 'React Router v6', desc: 'Dynamic routing (/event/:id, /booking/:id, /ticket/:id), nested paths, and ProtectedRoute guards.' },
    { name: 'AI & ML Rule-Based Engine', desc: 'Rule-based recommendation engine scoring events on user favorite categories, ratings, and budgets.' }
  ];

  const teamMembers = [
    { name: 'Akanshi Sharma', role: 'Team Lead & Full Stack Developer', branch: 'B.E. CSE (AI & ML)' },
    { name: 'Project Collaborator', role: 'UI/UX & Component Architecture', branch: 'B.E. CSE (AI & ML)' },
    { name: 'Project Collaborator', role: 'State Management & Algorithm Design', branch: 'B.E. CSE (AI & ML)' }
  ];

  return (
    <div className="section-py" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={18} color="var(--primary-teal-light)" />
            <span className="section-eyebrow">Academic Capstone Project</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            About EVENTORA
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
            A modern, intelligent event management and booking ecosystem designed specifically for university students, campus clubs, and academic symposiums.
          </p>
        </div>

        {/* 1. MISSION & VISION */}
        <div className="card" style={{ marginBottom: '36px', background: 'var(--bg-glass-card)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '14px', color: 'var(--primary-teal-light)' }}>
            🎯 Project Mission & Problem Statement
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Traditional college event management suffers from fragmented Google Forms, manual cash collections, paper tickets, and lack of unified campus discovery. <strong>EVENTORA</strong> solves these challenges by providing a single responsive platform where students can discover verified campus events, book seats on interactive matrices, split tickets with friends, and enter venues using digital QR boarding passes.
          </p>
        </div>

        {/* 2. TECHNOLOGY STACK & VIVA DEMONSTRATIONS */}
        <div className="card" style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <Code size={22} color="var(--primary-purple)" />
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>Technology Stack & Evaluation Topics</h2>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            This project demonstrates key concepts from Computer Science & Web Engineering curriculum:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {techStack.map((tech, idx) => (
              <div key={idx} style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '0.95rem', color: 'var(--primary-teal-light)', display: 'block', marginBottom: '4px' }}>
                  {tech.name}
                </strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: 'block' }}>
                  {tech.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. B.E. CSE (AI & ML) PROJECT TEAM */}
        <div className="card" style={{ marginBottom: '36px', background: 'var(--bg-glass-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <GraduationCap size={22} color="var(--accent-gold)" />
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>B.E. CSE (AI & ML) Project Team</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {teamMembers.map((member, i) => (
              <div key={i} style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <strong style={{ fontSize: '1.05rem', display: 'block', color: 'var(--text-primary)' }}>{member.name}</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--primary-teal-light)', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                  {member.role}
                </span>
                <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'block', marginTop: '4px' }}>
                  {member.branch} • Batch 2026
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* 4. FINAL BRAND SLOGAN */}
        <div style={{ textAlign: 'center', padding: '24px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            EVENTORA — Discover. Connect. Book. Celebrate.
          </span>
        </div>
      </div>
    </div>
  );
}
