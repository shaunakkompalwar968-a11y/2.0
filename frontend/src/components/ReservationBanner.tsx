"use client";

import React, { useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import ReservationModal from "./ReservationModal";

export default function ReservationBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-20 bg-[#22281F] text-[#FAF8F2] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#22281F]/90 via-[#22281F]/80 to-[#5C7457]/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="font-serif italic text-base sm:text-lg text-[#C8693F] block mb-2">
            Warm Mountain Hospitality
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF8F2]">
            Good Food Brings People Together
          </h2>

          <p className="text-sm sm:text-base text-[#FAF8F2]/80 mt-3 tracking-widest uppercase font-medium">
            Dine • Celebrate • Create Memories
          </p>

          <p className="text-sm text-[#FAF8F2]/70 mt-4 max-w-xl mx-auto leading-relaxed">
            Whether it&apos;s a candlelit anniversary dinner, a hearty family feast, or an intimate gathering with mountain vistas, we set the stage for cherished moments.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-3.5 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
          </div>
        </div>
      </section>

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab="table"
      />
    </>
  );
}
