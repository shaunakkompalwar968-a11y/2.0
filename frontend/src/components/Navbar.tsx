"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu as MenuIcon, X, CalendarCheck, UtensilsCrossed } from "lucide-react";
import ReservationModal from "./ReservationModal";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"table" | "room">("table");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Restaurant", href: "/restaurant" },
    { name: "Lodge", href: "/lodge" },
    { name: "Menu", href: "/menu" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const openReservation = (tab: "table" | "room" = "table") => {
    setModalTab(tab);
    setIsModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#5C7457]/95 backdrop-blur-md shadow-md py-3 text-[#FAF8F2]"
            : "bg-[#5C7457] py-4 text-[#FAF8F2]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#FAF8F2]/40 flex items-center justify-center text-[#FAF8F2] group-hover:bg-[#FAF8F2]/10 transition-colors">
              <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 20l9-12 9 12M5 20l7-9 7 9M9 20l3-4 3 4" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF8F2] block leading-none">
                Pooja Garden
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#FAF8F2]/80 font-medium">
                Restaurant • Lodge
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#FAF8F2]/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C8693F] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-xs font-medium text-[#FAF8F2]/90 hover:text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#FAF8F2]/15 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>+91 98765 43210</span>
            </a>

            <button
              onClick={() => openReservation("table")}
              className="px-4 py-2 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              Book Now
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => openReservation("table")}
              className="px-3 py-1.5 bg-[#C8693F] text-white rounded-full text-xs font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FAF8F2] hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#465942] border-t border-[#FAF8F2]/10 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === link.href
                      ? "bg-[#FAF8F2]/20 text-white font-semibold"
                      : "text-[#FAF8F2]/80 hover:bg-[#FAF8F2]/10 text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-[#FAF8F2]/10 flex flex-col gap-2">
              <button
                onClick={() => openReservation("table")}
                className="w-full py-2.5 bg-[#C8693F] text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Reserve a Table
              </button>
              <button
                onClick={() => openReservation("room")}
                className="w-full py-2.5 bg-[#FAF8F2]/20 text-white rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Room Stay
              </button>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 py-2 text-xs text-[#FAF8F2]/90"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Universal Modal */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
      />
    </>
  );
}
