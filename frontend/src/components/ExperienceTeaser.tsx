import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles } from "lucide-react";

export default function ExperienceTeaser() {
  return (
    <section className="py-20 bg-[#FAF8F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5C7457]/10 text-[#5C7457] text-xs font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Unforgettable Escapes</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#22281F] leading-tight">
              More Than Just a Stay, It&apos;s an Experience
            </h2>

            <p className="text-base sm:text-lg text-[#5B6357] leading-relaxed">
              Savor delightful cuisine, unwind in our cozy lodge, and enjoy breathtaking views &mdash; all in one tranquil haven. At Pooja Garden, we celebrate the slower pace of mountain life where handcrafted food meets pure hill station air.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-[#5C7457] pl-4">
                <span className="font-serif text-2xl font-bold text-[#5C7457]">100%</span>
                <p className="text-xs text-[#5B6357] mt-0.5">Farm Fresh Ingredients & Herbs</p>
              </div>
              <div className="border-l-2 border-[#C8693F] pl-4">
                <span className="font-serif text-2xl font-bold text-[#C8693F]">24/7</span>
                <p className="text-xs text-[#5B6357] mt-0.5">Dedicated Guest Hospitality</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="px-7 py-3 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-full text-sm font-semibold tracking-wider uppercase shadow-md transition-all inline-flex items-center gap-2 group"
              >
                <span>Discover More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/restaurant"
                className="px-7 py-3 border border-[#5C7457] text-[#5C7457] hover:bg-[#5C7457] hover:text-white rounded-full text-sm font-semibold tracking-wider uppercase transition-all"
              >
                View Culinary Philosophy
              </Link>
            </div>
          </div>

          {/* Right Column Images Grid */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-[#E8E6DA] aspect-[4/5] relative group">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                  alt="Fine dining table setting at Pooja Garden"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm p-2.5 rounded-xl text-white text-xs">
                  <p className="font-medium">Garden Dining</p>
                  <p className="text-[10px] text-white/80">Candlelit evenings under pines</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-[#E8E6DA] aspect-[4/5] relative group">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                  alt="Cozy suite bedroom at Pooja Garden"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm p-2.5 rounded-xl text-white text-xs">
                  <p className="font-medium">Mountain Rooms</p>
                  <p className="text-[10px] text-white/80">Ultimate comfort & serenity</p>
                </div>
              </div>
            </div>

            {/* Decorative Floating Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#5C7457] text-[#FAF8F2] p-4 rounded-full shadow-2xl border-4 border-[#FAF8F2] hidden sm:flex flex-col items-center justify-center text-center w-28 h-28">
              <Sparkles className="w-5 h-5 text-[#C8693F] mb-0.5" />
              <span className="font-serif text-xs font-bold leading-tight">Since</span>
              <span className="font-serif text-lg font-bold leading-tight">2012</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
