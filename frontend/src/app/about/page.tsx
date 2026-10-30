import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Smile, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us | Pooja Garden",
  description: "Our Story, Our Values, and Our Commitment to exceptional food and hospitality.",
};

export default function AboutPage() {
  const values = [
    {
      icon: Sparkles,
      title: "Quality Food",
      desc: "We source only organic seasonal produce, freshly ground spices, and cold-pressed oils. Every dish is cooked fresh upon order.",
    },
    {
      icon: ShieldCheck,
      title: "Comfortable Stays",
      desc: "Your peaceful rest is our top priority. Soundproofed rooms, plush orthopedic bedding, and mountain-facing balconies.",
    },
    {
      icon: Smile,
      title: "Warm Hospitality",
      desc: "We treat every guest like family. Attentive 24/7 care, local hiking guidance, and heartfelt personalized service.",
    },
  ];

  return (
    <div>
      <PageHeader
        badge="Heritage & Warmth"
        title="About Us"
        subtitle="Our Story • Our Values • Our Commitment"
        bgImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Our Story Section matching screenshot */}
      <section className="py-20 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story text */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#5C7457] bg-[#5C7457]/10 px-3 py-1 rounded-full">
                Born From A Passion
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#22281F]">
                Our Story
              </h2>

              <p className="text-base text-[#5B6357] leading-relaxed">
                Pooja Garden started with a simple vision &mdash; to create a place where great food and comfortable stays come together. What began as a small restaurant and modest roadside garden lodge has now blossomed into a cherished destination for travelers, families, and discerning food connoisseurs from across India and abroad.
              </p>

              <p className="text-sm text-[#5B6357] leading-relaxed">
                Surrounded by pine-scented hills, our kitchens honor old clay-oven traditions while embracing contemporary culinary innovations. Every flower in our botanical courtyard is nurtured by hand, offering guests a sanctuary from modern city fatigue.
              </p>
            </div>

            {/* Lodge Exterior / Garden Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#E8E6DA]">
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                  alt="Pooja Garden Lodge Heritage"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3 Values matching screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-[#E8E6DA]">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-[#E8E6DA] text-center space-y-3 shadow-sm card-hover"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#5C7457]/10 flex items-center justify-center text-[#5C7457] mx-auto border border-[#5C7457]/15">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#22281F]">
                    {v.title}
                  </h3>
                  <p className="text-xs text-[#5B6357] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Experience Banner matching screenshot */}
      <section className="relative py-24 bg-[#22281F] text-[#FAF8F2] overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#22281F]/90 via-[#22281F]/80 to-[#5C7457]/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F2]">
            More Than Just a Stay, It&apos;s an Experience
          </h2>
          <p className="text-sm sm:text-base text-[#FAF8F2]/80 max-w-xl mx-auto">
            Join us for an afternoon high-tea, a tranquil weekend, or a milestone family celebration among the pine groves.
          </p>
          <div className="pt-4 flex justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl transition-all inline-flex items-center gap-2"
            >
              <span>Learn More & Contact</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
