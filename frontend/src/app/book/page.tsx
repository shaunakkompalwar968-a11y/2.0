import PageHeader from "@/components/PageHeader";
import BookingSection from "@/components/BookingSection";

export const metadata = {
  title: "Book Your Stay & Table | Pooja Garden",
  description: "Reserve your room, suite, or dining table directly at Pooja Garden with instant confirmation.",
};

export default function BookPage() {
  return (
    <div>
      <PageHeader
        badge="Instant Direct Reservation"
        title="Book Your Stay"
        subtitle="Comfortable Rooms • Unforgettable Experiences"
        bgImage="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=80"
      />

      <BookingSection />
    </div>
  );
}
