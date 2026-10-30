"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, CalendarCheck, Phone, BedDouble } from "lucide-react";
import ReservationModal from "./ReservationModal";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F2]/95 backdrop-blur-md border-t border-[#E8E6DA] py-2 px-6 flex items-center justify-between lg:hidden shadow-lg">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === "/" ? "text-[#5C7457] font-bold" : "text-[#5B6357]"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/menu"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === "/menu" ? "text-[#5C7457] font-bold" : "text-[#5B6357]"
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span>Menu</span>
        </Link>

        <button
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-full bg-[#C8693F] text-white shadow-lg cursor-pointer transform active:scale-95 transition-transform"
          aria-label="Quick Reserve"
        >
          <CalendarCheck className="w-6 h-6" />
        </button>

        <Link
          href="/lodge"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === "/lodge" ? "text-[#5C7457] font-bold" : "text-[#5B6357]"
          }`}
        >
          <BedDouble className="w-5 h-5" />
          <span>Stay</span>
        </Link>

        <Link
          href="/contact"
          className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
            pathname === "/contact" ? "text-[#5C7457] font-bold" : "text-[#5B6357]"
          }`}
        >
          <Phone className="w-5 h-5" />
          <span>Contact</span>
        </Link>
      </div>

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab="table"
      />
    </>
  );
}
