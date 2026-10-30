"use client";

import React, { useState } from "react";
import { Utensils, Flame, Sparkles, Filter } from "lucide-react";
import { MenuItem, FALLBACK_MENU_ITEMS } from "@/lib/api";
import ReservationModal from "./ReservationModal";

interface MenuSectionProps {
  initialItems?: MenuItem[];
}

export default function MenuSection({ initialItems = FALLBACK_MENU_ITEMS }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [vegOnly, setVegOnly] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const tabs = [
    { label: "All Items", value: "all" },
    { label: "Starters", value: "starters" },
    { label: "Main Course", value: "main-course" },
    { label: "Desserts", value: "desserts" },
    { label: "Beverages", value: "beverages" },
    { label: "Indian Specialties", value: "indian" },
  ];

  const filteredItems = initialItems.filter((item) => {
    if (vegOnly && !item.is_vegetarian) return false;
    if (activeTab === "all") return true;
    if (activeTab === "starters") return item.category_slug === "starters" || item.category_slug === "chinese";
    if (activeTab === "main-course") return item.category_slug === "main-course" || item.category_slug === "continental";
    return item.category_slug === activeTab;
  });

  return (
    <>
      <section className="py-12 bg-[#FAF8F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Controls Bar: Category tabs + Veg Only Switch */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-[#E8E6DA]">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                    activeTab === tab.value
                      ? "bg-[#5C7457] text-[#FAF8F2] shadow-sm font-semibold"
                      : "bg-[#E8E6DA]/60 text-[#22281F] hover:bg-[#E8E6DA]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Veg filter toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                vegOnly
                  ? "bg-emerald-800 text-white border-emerald-900"
                  : "bg-white text-[#22281F] border-[#E8E6DA] hover:border-emerald-600"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${vegOnly ? "bg-white" : "bg-emerald-600"}`} />
              <span>{vegOnly ? "Showing Veg Only" : "Filter: Vegetarian Only"}</span>
            </button>
          </div>

          {/* Menu Items List matching the screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="bg-white p-5 rounded-2xl border border-[#E8E6DA] shadow-sm hover:shadow-md transition-shadow flex items-center gap-4 group"
              >
                {/* Left Description & Pricing */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          dish.is_vegetarian ? "bg-emerald-600" : "bg-red-600"
                        }`}
                      />
                      <h4 className="font-serif text-lg font-bold text-[#22281F] group-hover:text-[#5C7457] transition-colors">
                        {dish.name}
                      </h4>
                    </div>
                    <span className="font-serif text-lg font-bold text-[#C8693F] shrink-0">
                      ₹{Math.round(dish.price)}
                    </span>
                  </div>

                  <p className="text-xs text-[#5B6357] mt-2 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>

                  <div className="flex items-center gap-3 mt-3 text-[11px] text-[#8A9286]">
                    <span className="px-2 py-0.5 bg-[#FAF8F2] rounded text-[#5C7457] font-medium uppercase tracking-wider text-[10px]">
                      {dish.category_name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#C8693F]" />
                      {dish.spice_level}
                    </span>
                    <span className="text-[#8A9286]">• {dish.preparation_time}</span>
                  </div>
                </div>

                {/* Right Dish Thumbnail */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-[#E8E6DA] border border-[#E8E6DA]">
                  <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Table Booking CTA */}
          <div className="mt-16 bg-[#5C7457] text-[#FAF8F2] rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <Sparkles className="w-8 h-8 text-[#FAF8F2] mx-auto opacity-80" />
              <h3 className="font-serif text-3xl font-bold">
                Experience These Dishes Fresh From the Clay Oven
              </h3>
              <p className="text-sm text-[#FAF8F2]/85">
                Reserve your garden table in advance and let our master chefs prepare your dining banquet.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 px-8 py-3 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Reserve a Dining Table
              </button>
            </div>
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
