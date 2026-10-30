import PageHeader from "@/components/PageHeader";
import GalleryView from "@/components/GalleryView";
import { getGallery } from "@/lib/api";

export const metadata = {
  title: "Photo Gallery | Pooja Garden",
  description: "Explore photography of our garden restaurant, boutique lodge suites, and scenic valley surroundings.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <div>
      <PageHeader
        badge="Visual Journey"
        title="Gallery"
        subtitle="Moments that speak for themselves"
        bgImage="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="py-16 bg-[#FAF8F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryView initialItems={items} />
        </div>
      </section>
    </div>
  );
}
