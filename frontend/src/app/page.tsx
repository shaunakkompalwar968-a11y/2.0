import HeroSection from "@/components/HeroSection";
import FeaturesBar from "@/components/FeaturesBar";
import ExperienceTeaser from "@/components/ExperienceTeaser";
import SpecialtiesSection from "@/components/SpecialtiesSection";
import ReservationBanner from "@/components/ReservationBanner";
import RoomsSection from "@/components/RoomsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getMenuItems, getRooms } from "@/lib/api";

export default async function HomePage() {
  const [menuItems, rooms] = await Promise.all([
    getMenuItems(),
    getRooms(true),
  ]);

  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturesBar />
      <ExperienceTeaser />
      <SpecialtiesSection initialItems={menuItems} />
      <ReservationBanner />
      <RoomsSection initialRooms={rooms} />
      <TestimonialsSection />
    </div>
  );
}
