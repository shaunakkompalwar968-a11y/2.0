import PageHeader from "@/components/PageHeader";
import MenuSection from "@/components/MenuSection";
import { getMenuItems } from "@/lib/api";

export const metadata = {
  title: "Our Full Menu | Pooja Garden",
  description: "Explore our rich menu featuring authentic Indian clay-oven specialties, Continental delicacies, and refreshing drinks.",
};

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div>
      <PageHeader
        badge="Fresh • Handcrafted • Authentic"
        title="Our Menu"
        subtitle="Fresh Ingredients • Bold Flavours • Authentic Taste"
        bgImage="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=80"
      />

      <MenuSection initialItems={items} />
    </div>
  );
}
