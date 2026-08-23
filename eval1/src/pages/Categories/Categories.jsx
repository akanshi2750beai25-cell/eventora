import './Categories.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';
import { categories } from '../../data/categoriesData';
import { useEvents } from '../../context/EventContext';

export default function Categories() {
  const { events } = useEvents();

  return (
    <div className="section-py">
      <div className="container">
        {/* Header */}
        <div className="section-title-wrap">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Layers size={18} color="var(--primary-teal-light)" />
            <span className="section-eyebrow">Explore Topics & Domains</span>
          </div>
          <h1 className="section-title">Campus Event Categories</h1>
          <p className="section-subtitle">
            Find the right community, fest, or learning symposium that fits your passion.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid-3" style={{ gap: '28px' }}>
          {categories.map((cat) => {
            const count = events.filter((e) => e.category.toLowerCase() === cat.name.toLowerCase()).length;

            return (
              <div key={cat.id} className="card hover-lift" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Image Banner */}
                <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)' }}></div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>{cat.emoji}</span>
                    <h3 style={{ color: '#ffffff', margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>{cat.name}</h3>
                  </div>
                </div>

                {/* Body Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '12px' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {cat.description}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-teal-light)' }}>
                      {count} Events Available
                    </span>

                    <Link
                      to={`/explore?category=${encodeURIComponent(cat.name)}`}
                      className="btn btn-outline btn-sm"
                    >
                      <span>Explore</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
