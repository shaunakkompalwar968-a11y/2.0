import PageHeader from "@/components/PageHeader";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import ReservationBanner from "@/components/ReservationBanner";
import { getMenuItems } from "@/lib/api";
import { Sparkles, Leaf, Award, Utensils } from "lucide-react";

export const metadata = {
  title: "Our Restaurant | Pooja Garden",
  description: "Fresh Ingredients, Authentic Flavours, and Memorable Dining at Pooja Garden.",
};

export default async function RestaurantPage() {
  const menuItems = await getMenuItems();

  return (
    <div>
      <PageHeader
        badge="Culinary Experience"
        title="Our Restaurant"
        subtitle="Fresh Ingredients • Authentic Flavours • Memorable Dining"
        bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
      />

      {/* A Culinary Journey Section matching the reference screenshot */}
      <section className="py-20 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Story */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#5C7457] bg-[#5C7457]/10 px-3 py-1 rounded-full">
                Farm-to-Table Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#22281F]">
                A Culinary Journey
              </h2>

              <p className="text-base text-[#5B6357] leading-relaxed">
                Our restaurant offers a delightful mix of local and international cuisine, crafted with fresh, seasonal ingredients. Whether it&apos;s a family dinner, a romantic date, or a group celebration &mdash; we have the perfect setting for every occasion.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-4 bg-white rounded-xl border border-[#E8E6DA] text-center space-y-1">
                  <Leaf className="w-5 h-5 text-[#5C7457] mx-auto" />
                  <h4 className="font-serif text-sm font-bold text-[#22281F]">Local Produce</h4>
                  <p className="text-[11px] text-[#5B6357]">Harvested from regional organic hill farms</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E8E6DA] text-center space-y-1">
                  <Utensils className="w-5 h-5 text-[#C8693F] mx-auto" />
                  <h4 className="font-serif text-sm font-bold text-[#22281F]">Clay Tandoor</h4>
                  <p className="text-[11px] text-[#5B6357]">Authentic live charcoal slow cooking</p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E8E6DA] text-center space-y-1">
                  <Award className="w-5 h-5 text-[#5C7457] mx-auto" />
                  <h4 className="font-serif text-sm font-bold text-[#22281F]">Master Chefs</h4>
                  <p className="text-[11px] text-[#5B6357]">Over two decades of culinary mastery</p>
                </div>
              </div>
            </div>

            {/* Culinary Image Showcase */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#E8E6DA]">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                  alt="Culinary platter at Pooja Garden"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#5C7457] text-[#FAF8F2] p-5 rounded-2xl shadow-xl hidden sm:block max-w-xs">
                <p className="font-serif italic text-sm">
                  &ldquo;Every dish tells the story of Himachal spices and soulful hospitality.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <SpecialtiesSection initialItems={menuItems} />

      {/* Reservation Banner */}
      <ReservationBanner />
    </div>
  );
}
