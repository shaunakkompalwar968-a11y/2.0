import PageHeader from "@/components/PageHeader";
import RoomsSection from "@/components/RoomsSection";
import { getRooms } from "@/lib/api";
import Link from "next/link";
import { BedDouble, Sparkles, Coffee, Shield } from "lucide-react";

export const metadata = {
  title: "Our Lodge & Suites | Pooja Garden",
  description: "Comfortable Stays, Modern Amenities, and Peaceful Surroundings in our mountain sanctuary.",
};

export default async function LodgePage() {
  const rooms = await getRooms();

  return (
    <div>
      <PageHeader
        badge="Botanical Retreat"
        title="Our Lodge"
        subtitle="Comfortable Stays • Modern Amenities • Peaceful Surroundings"
        bgImage="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Intro Experience */}
      <section className="py-16 bg-[#FAF8F2] border-b border-[#E8E6DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#5C7457] bg-[#5C7457]/10 px-3 py-1 rounded-full">
            Your Mountain Sanctuary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#22281F]">
            Designed for Rest, Reconnection, and Nature
          </h2>
          <p className="text-sm sm:text-base text-[#5B6357] leading-relaxed">
            Each room and suite at Pooja Garden is thoughtfully positioned to face private pine groves and blossoming flower corridors. Featuring handcrafted timber woodwork, organic linens, and contemporary en-suite amenities.
          </p>
        </div>
      </section>

      {/* Complete Rooms Grid */}
      <RoomsSection initialRooms={rooms} showHeading={false} />

      {/* Guest Perks & Booking Callout */}
      <section className="py-16 bg-[#5C7457] text-[#FAF8F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Planning a Weekend Retreat or Family Holiday?
            </h3>
            <p className="text-sm text-[#FAF8F2]/80 max-w-xl">
              Enjoy complimentary morning buffet breakfast, garden high-tea, and flexible cancellation when booking direct.
            </p>
          </div>

          <Link
            href="/book"
            className="px-8 py-3.5 bg-[#C8693F] hover:bg-[#B35831] text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-xl transition-all cursor-pointer whitespace-nowrap"
          >
            Check Room Availability
          </Link>
        </div>
      </section>
    </div>
  );
}
