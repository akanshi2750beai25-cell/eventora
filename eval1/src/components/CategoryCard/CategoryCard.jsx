import './CategoryCard.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Music, Trophy, GraduationCap, Wrench, Palette, 
  TrendingUp, Film, Sparkles, Folder 
} from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Music: Music,
  Trophy: Trophy,
  GraduationCap: GraduationCap,
  Wrench: Wrench,
  Palette: Palette,
  TrendingUp: TrendingUp,
  Film: Film,
  Sparkles: Sparkles
};

export default function CategoryCard({ category, eventCount = 0 }) {
  const IconComponent = iconMap[category.icon] || Folder;

  return (
    <Link
      to={`/explore?category=${encodeURIComponent(category.name)}`}
      className="category-card"
      aria-label={`Explore ${category.name} events`}
    >
      <div className="category-card-icon" style={{ borderColor: category.color }}>
        <IconComponent size={28} />
      </div>
      <h3 className="category-card-title">{category.name}</h3>
      <span className="category-card-count">{eventCount} Events</span>
    </Link>
  );
}
