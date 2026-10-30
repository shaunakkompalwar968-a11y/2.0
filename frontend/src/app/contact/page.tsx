import PageHeader from "@/components/PageHeader";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Get In Touch | Pooja Garden",
  description: "Contact Pooja Garden for restaurant table reservations, lodge room bookings, private celebrations and inquiries.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        badge="Connect With Us"
        title="Get In Touch"
        subtitle="We'd love to hear from you"
        bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
      />

      <ContactSection />
    </div>
  );
}
