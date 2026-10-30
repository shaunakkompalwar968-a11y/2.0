"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowDown, Utensils, BedDouble } from "lucide-react";
import ReservationModal from "./ReservationModal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"table" | "room">("table");

  const openModal = (tab: "table" | "room") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const scrollToNext = () => {
    const el = document.getElementById("features");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#22281F] text-[#FAF8F2] overflow-hidden">
        {/* Background Image with Warm Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85')`,
          }}
        >
          {/* Gradients using brand palette: #22281F and #5C7457 */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#22281F] via-[#22281F]/70 to-[#5C7457]/50" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF8F2]/15 backdrop-blur-md border border-[#FAF8F2]/20 mb-6 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8693F]" />
            <span className="text-xs sm:text-sm uppercase tracking-widest font-medium text-[#FAF8F2]">
              Restaurant • Lodge
            </span>
          </div>

          {/* Grand Headline */}
          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-[#FAF8F2] drop-shadow-md">
            Pooja Garden
          </h1>

          <p className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F2]/90 mt-4 tracking-wide">
            Good Food, Great Stays.
          </p>

          <p className="text-sm sm:text-base text-[#FAF8F2]/80 mt-5 max-w-2xl mx-auto font-sans leading-relaxed">
            A perfect blend of taste & comfort in the heart of nature. Unwind with garden-fresh culinary delights and serene hillside stays.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/restaurant"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Utensils className="w-4 h-4" />
              Explore Restaurant
            </Link>

            <button
              onClick={() => openModal("room")}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF8F2]/10 hover:bg-[#FAF8F2]/20 text-[#FAF8F2] border border-[#FAF8F2]/30 rounded-full text-sm font-semibold tracking-wider uppercase backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <BedDouble className="w-4 h-4" />
              Book a Room
            </button>
          </div>

          {/* Scroll Down Indicator */}
          <button
            onClick={scrollToNext}
            aria-label="Scroll to features"
            className="mt-14 inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#FAF8F2]/30 text-[#FAF8F2]/80 hover:text-white hover:border-[#FAF8F2] hover:bg-white/10 transition-all cursor-pointer animate-bounce"
          >
            <ArrowDown className="w-5 h-5" />
          </button>
        </div>
      </section>

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
      />
    </>
  );
}
