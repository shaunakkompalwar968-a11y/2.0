import React from "react";
import { Star, Quote } from "lucide-react";
import { FALLBACK_TESTIMONIALS } from "@/lib/api";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#FAF8F2] border-t border-[#E8E6DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#5C7457] bg-[#5C7457]/10 px-3 py-1 rounded-full">
            Guest Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#22281F] mt-3">
            Words From Our Visitors
          </h2>
          <p className="text-sm sm:text-base text-[#5B6357] mt-3">
            Real stories and heartfelt reviews from travelers, food lovers, and families who made Pooja Garden their getaway.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FALLBACK_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 rounded-2xl border border-[#E8E6DA] shadow-sm flex flex-col justify-between relative group hover:shadow-lg transition-shadow card-hover"
            >
              <Quote className="w-10 h-10 text-[#5C7457]/20 mb-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-1 text-[#C8693F]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#22281F] leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E6DA] flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#22281F]">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#8A9286]">{item.location}</p>
                </div>
                <span className="text-[10px] uppercase font-semibold text-[#5C7457] bg-[#5C7457]/10 px-2.5 py-1 rounded-full">
                  {item.stay_type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
