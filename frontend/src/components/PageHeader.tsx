import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
  bgImage?: string;
}

export default function PageHeader({
  title,
  subtitle,
  badge,
  bgImage = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80",
}: PageHeaderProps) {
  return (
    <div className="relative py-24 sm:py-32 bg-[#22281F] text-[#FAF8F2] overflow-hidden text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#22281F] via-[#22281F]/80 to-[#5C7457]/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F2]/15 backdrop-blur-md text-[#FAF8F2] text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8693F]" />
            <span>{badge}</span>
          </div>
        )}

        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FAF8F2]">
          {title}
        </h1>

        <p className="font-serif italic text-base sm:text-xl text-[#FAF8F2]/85 mt-3 max-w-2xl mx-auto tracking-wide">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
