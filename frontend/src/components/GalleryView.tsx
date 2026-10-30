"use client";

import React, { useState } from "react";
import { X, ZoomIn, Image as ImageIcon } from "lucide-react";
import { GalleryItem, FALLBACK_GALLERY } from "@/lib/api";

interface GalleryViewProps {
  initialItems?: GalleryItem[];
}

export default function GalleryView({ initialItems = FALLBACK_GALLERY }: GalleryViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { label: "All", value: "all" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Lodge", value: "lodge" },
    { label: "Surroundings", value: "surroundings" },
  ];

  const filteredItems = initialItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <>
      <div className="space-y-10">
        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                activeFilter === cat.value
                  ? "bg-[#5C7457] text-[#FAF8F2] shadow-sm font-semibold scale-105"
                  : "bg-[#E8E6DA]/70 text-[#22281F] hover:bg-[#E8E6DA] hover:text-[#5C7457]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#E8E6DA] bg-white cursor-pointer group card-hover"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8693F] mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold">{item.title}</h4>
                <p className="text-xs text-white/80 mt-1 line-clamp-1">{item.caption}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/90">
                  <ZoomIn className="w-4 h-4 text-[#C8693F]" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#22281F] text-[#FAF8F2] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C8693F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxItem.image_url}
                alt={lightboxItem.title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 bg-[#22281F] border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#C8693F]">
                  {lightboxItem.category}
                </span>
                <h3 className="font-serif text-2xl font-bold mt-0.5">{lightboxItem.title}</h3>
                <p className="text-sm text-[#FAF8F2]/75 mt-1">{lightboxItem.caption}</p>
              </div>
              <button
                onClick={() => setLightboxItem(null)}
                className="px-5 py-2 bg-[#5C7457] hover:bg-[#465942] text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
