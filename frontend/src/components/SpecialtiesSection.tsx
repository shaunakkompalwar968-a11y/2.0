"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Utensils, Sparkles, Flame, Clock } from "lucide-react";
import { MenuItem, FALLBACK_MENU_ITEMS } from "@/lib/api";
import ReservationModal from "./ReservationModal";

interface SpecialtiesSectionProps {
  initialItems?: MenuItem[];
  showHeading?: boolean;
}

export default function SpecialtiesSection({
  initialItems = FALLBACK_MENU_ITEMS,
  showHeading = true,
}: SpecialtiesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const categories = [
    { label: "All", value: "all" },
    { label: "Indian", value: "indian" },
    { label: "Continental", value: "continental" },
    { label: "Chinese", value: "chinese" },
    { label: "Desserts & Drinks", value: "desserts" },
  ];

  const filteredItems = initialItems.filter((item) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "desserts") {
      return item.category_slug === "desserts" || item.category_slug === "beverages";
    }
    return item.category_slug === activeCategory;
  });

  return (
    <>
      <section className="py-20 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showHeading && (
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5C7457]/10 text-[#5C7457] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chef&apos;s Signature Creations</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#22281F]">
                Our Specialities
              </h2>
              <p className="text-sm sm:text-base text-[#5B6357] mt-3">
                Each recipe is a harmonious blend of authentic Indian heritage and international culinary craft, prepared fresh to order.
              </p>
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? "bg-[#5C7457] text-[#FAF8F2] shadow-sm font-semibold scale-105"
                    : "bg-[#E8E6DA]/70 text-[#22281F] hover:bg-[#E8E6DA] hover:text-[#5C7457]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Food Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredItems.slice(0, 8).map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E8E6DA] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group card-hover"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E6DA]">
                  <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  {/* Veg / Non-veg Tag */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        dish.is_vegetarian ? "bg-emerald-600" : "bg-red-600"
                      }`}
                    />
                    <span className="text-[10px] font-semibold text-[#22281F]">
                      {dish.is_vegetarian ? "VEG" : "NON-VEG"}
                    </span>
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute bottom-3 right-3 bg-[#5C7457] text-[#FAF8F2] px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    ₹{Math.round(dish.price)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#8A9286] mb-1">
                      <span className="uppercase tracking-wider font-medium text-[#5C7457]">
                        {dish.category_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {dish.preparation_time}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#22281F] group-hover:text-[#5C7457] transition-colors">
                      {dish.name}
                    </h3>

                    <p className="text-xs text-[#5B6357] mt-2 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#E8E6DA]/60 flex items-center justify-between">
                    <span className="text-xs text-[#8A9286] flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#C8693F]" />
                      {dish.spice_level} Spice
                    </span>

                    <button
                      onClick={() => setModalOpen(true)}
                      className="text-xs font-semibold text-[#C8693F] hover:text-[#B35831] hover:underline cursor-pointer"
                    >
                      Taste This Dish &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Explore Full Menu Link */}
          <div className="text-center mt-12">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5C7457] hover:bg-[#465942] text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-md transition-all"
            >
              <Utensils className="w-4 h-4" />
              <span>Explore Full Restaurant Menu</span>
            </Link>
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
