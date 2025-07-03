import React from 'react';

interface CategoryBarProps {
  categories: { name: string; icon: React.ReactNode; color: string }[];
  selected: string | null;
  onSelect: (cat: string | null) => void;
}

export default function CategoryBar({ categories, selected, onSelect }: CategoryBarProps) {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-[64px] z-40">
      <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto scrollbar-hide py-2">
        {categories.map(cat => (
          <button
            key={cat.name}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow text-base whitespace-nowrap border transition-all duration-150 ${cat.color} ${selected === cat.name ? 'ring-2 ring-[#006D92] border-[#006D92] bg-[#E6F7FF]' : 'border-blue-100 hover:ring-1 hover:ring-[#006D92]'}`}
            onClick={() => onSelect(selected === cat.name ? null : cat.name)}
            aria-pressed={selected === cat.name}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
} 