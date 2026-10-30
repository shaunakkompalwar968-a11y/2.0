import React from "react";
import { Sparkles, Bed, Mountain, HeartHandshake } from "lucide-react";

export default function FeaturesBar() {
  const features = [
    {
      icon: Sparkles,
      title: "Fresh Ingredients",
      subtitle: "Local & Seasonal",
    },
    {
      icon: Bed,
      title: "Cozy Rooms",
      subtitle: "Modern Comforts",
    },
    {
      icon: Mountain,
      title: "Scenic Views",
      subtitle: "Nature at its Best",
    },
    {
      icon: HeartHandshake,
      title: "Warm Hospitality",
      subtitle: "Always Here for You",
    },
  ];

  return (
    <section id="features" className="bg-[#FAF8F2] border-b border-[#E8E6DA] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] shrink-0 border border-[#5C7457]/15">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-[#22281F]">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5B6357]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
