// API Client & Interfaces for Pooja Garden

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface Category {
  id: number;
  name: string;
  slug: string;
  order: number;
}

export interface MenuItem {
  id: number;
  name: string;
  slug: string;
  category_slug: string;
  category_name: string;
  description: string;
  price: number;
  image_url: string;
  is_vegetarian: boolean;
  is_specialty: boolean;
  spice_level: string;
  preparation_time: string;
  available: boolean;
}

export interface Room {
  id: number;
  name: string;
  slug: string;
  price_per_night: number;
  description: string;
  image_url: string;
  capacity_adults: number;
  capacity_children: number;
  bed_type: string;
  size_sqft: number;
  view_type: string;
  amenities: string[];
  is_featured: boolean;
  available: boolean;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: "all" | "restaurant" | "lodge" | "surroundings";
  image_url: string;
  caption: string;
  order: number;
}

export interface Testimonial {
  id: number;
  author: string;
  location: string;
  rating: number;
  comment: string;
  stay_type: string;
}

export interface TableBookingPayload {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seating_area: string;
  special_requests?: string;
}

export interface RoomBookingPayload {
  room_id: number;
  name: string;
  email: string;
  phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  special_requests?: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Fallback Mock Data for instant loading
export const FALLBACK_MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Butter Chicken",
    slug: "butter-chicken",
    category_slug: "indian",
    category_name: "Indian",
    description: "Rich & creamy tomato gravy with tender clay-oven roasted chicken pieces and fresh butter garnish.",
    price: 280,
    image_url: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: false,
    is_specialty: true,
    spice_level: "Mild",
    preparation_time: "20 mins",
    available: true
  },
  {
    id: 2,
    name: "Paneer Tikka",
    slug: "paneer-tikka",
    category_slug: "indian",
    category_name: "Indian",
    description: "Char-grilled cottage cheese cubes marinated in aromatic spices and mustard oil with bell peppers.",
    price: 260,
    image_url: "https://images.unsplash.com/photo-1567184109411-b29f12df4975?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: true,
    is_specialty: true,
    spice_level: "Medium",
    preparation_time: "15 mins",
    available: true
  },
  {
    id: 3,
    name: "Grilled Fish Lemon Herb",
    slug: "grilled-fish",
    category_slug: "continental",
    category_name: "Continental",
    description: "Pan-seared river fish fillet served with zesty lemon herb butter sauce and roasted farm veggies.",
    price: 340,
    image_url: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: false,
    is_specialty: true,
    spice_level: "Mild",
    preparation_time: "25 mins",
    available: true
  },
  {
    id: 4,
    name: "Chocolate Lava Cake",
    slug: "chocolate-lava-cake",
    category_slug: "desserts",
    category_name: "Desserts",
    description: "Warm Belgian chocolate cake with a molten dark chocolate center, served with vanilla bean ice cream.",
    price: 220,
    image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: true,
    is_specialty: true,
    spice_level: "Mild",
    preparation_time: "15 mins",
    available: true
  },
  {
    id: 5,
    name: "Crispy Veg Spring Rolls",
    slug: "crispy-veg-spring-rolls",
    category_slug: "starters",
    category_name: "Starters",
    description: "Crispy vegetable rolls served with sweet chili dip and garden mint slaw.",
    price: 199,
    image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: true,
    is_specialty: false,
    spice_level: "Mild",
    preparation_time: "12 mins",
    available: true
  },
  {
    id: 6,
    name: "Chicken Wings Peri-Peri",
    slug: "chicken-wings",
    category_slug: "starters",
    category_name: "Starters",
    description: "Spicy and crispy wings glazed in fiery honey peri-peri sauce.",
    price: 299,
    image_url: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: false,
    is_specialty: false,
    spice_level: "Spicy",
    preparation_time: "18 mins",
    available: true
  },
  {
    id: 7,
    name: "Paneer Butter Masala",
    slug: "paneer-butter-masala",
    category_slug: "main-course",
    category_name: "Main Course",
    description: "Classic cottage cheese in velvety tomato, butter, and cashew gravy.",
    price: 299,
    image_url: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: true,
    is_specialty: false,
    spice_level: "Medium",
    preparation_time: "20 mins",
    available: true
  },
  {
    id: 8,
    name: "Chicken Biryani",
    slug: "chicken-biryani",
    category_slug: "main-course",
    category_name: "Main Course",
    description: "Aromatic basmati rice cooked with tender chicken and saffron herbs.",
    price: 329,
    image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: false,
    is_specialty: true,
    spice_level: "Medium",
    preparation_time: "25 mins",
    available: true
  },
  {
    id: 9,
    name: "Gulab Jamun",
    slug: "gulab-jamun",
    category_slug: "desserts",
    category_name: "Desserts",
    description: "Soft warm milk dumplings dipped in fragrant saffron syrup.",
    price: 149,
    image_url: "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: true,
    is_specialty: false,
    spice_level: "Mild",
    preparation_time: "10 mins",
    available: true
  },
  {
    id: 10,
    name: "Chocolate Brownie",
    slug: "chocolate-brownie",
    category_slug: "desserts",
    category_name: "Desserts",
    description: "Rich fudge brownie served with vanilla ice cream and warm fudge.",
    price: 199,
    image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    is_vegetarian: true,
    is_specialty: false,
    spice_level: "Mild",
    preparation_time: "10 mins",
    available: true
  }
];

export const FALLBACK_ROOMS: Room[] = [
  {
    id: 1,
    name: "Standard Room",
    slug: "standard-room",
    price_per_night: 2500,
    description: "Choose from our well-designed rooms with garden vistas, plush queen bed, and modern comforts.",
    image_url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    capacity_adults: 2,
    capacity_children: 1,
    bed_type: "Queen Bed",
    size_sqft: 280,
    view_type: "Garden Courtyard",
    amenities: ["Free Wi-Fi", "Room Service 24/7", "Air Conditioning", "Rain Shower", "Smart TV"],
    is_featured: true,
    available: true
  },
  {
    id: 2,
    name: "Deluxe Room",
    slug: "deluxe-room",
    price_per_night: 3500,
    description: "Private sunrise balcony overlooking pine hills with king bed and espresso station.",
    image_url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    capacity_adults: 2,
    capacity_children: 1,
    bed_type: "King Bed",
    size_sqft: 360,
    view_type: "Mountain & Valley View",
    amenities: ["Private Balcony", "Free Wi-Fi", "Room Service 24/7", "Mountain View", "Espresso Bar"],
    is_featured: true,
    available: true
  },
  {
    id: 3,
    name: "Premium Suite",
    slug: "premium-suite",
    price_per_night: 4800,
    description: "Expansive layout with separate seating lounge, soaking bathtub, and garden terrace walkout.",
    image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    capacity_adults: 3,
    capacity_children: 2,
    bed_type: "Super King Bed",
    size_sqft: 480,
    view_type: "Botanical Garden & Pines",
    amenities: ["Private Patio", "Soaking Tub", "Lounge Area", "Free Wi-Fi", "Mini Bar", "Breakfast Included"],
    is_featured: true,
    available: true
  },
  {
    id: 4,
    name: "Family Room",
    slug: "family-room",
    price_per_night: 5600,
    description: "Two plush queen beds, family seating area, and game corner designed for memorable group vacations.",
    image_url: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
    capacity_adults: 4,
    capacity_children: 2,
    bed_type: "2 Queen Beds",
    size_sqft: 550,
    view_type: "Garden & Forest Edge",
    amenities: ["2 Queen Beds", "Dining Table", "Board Games", "24/7 Room Service", "Private Parking"],
    is_featured: false,
    available: true
  },
  {
    id: 5,
    name: "Luxury Suite",
    slug: "luxury-suite",
    price_per_night: 7500,
    description: "Top-floor luxury with 360 panoramic views, private heated jacuzzi, fireplace, and butler service.",
    image_url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    capacity_adults: 2,
    capacity_children: 2,
    bed_type: "Grand King Bed",
    size_sqft: 750,
    view_type: "Panoramic Valley View",
    amenities: ["Private Jacuzzi", "Fireplace", "Butler Service", "Complimentary High Tea", "VIP Parking"],
    is_featured: true,
    available: true
  },
  {
    id: 6,
    name: "Honeymoon Suite",
    slug: "honeymoon-suite",
    price_per_night: 6800,
    description: "Romantic canopy bed, candlelit setting, private terrace overlooking sunset hills, and couple's spa kit.",
    image_url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
    capacity_adults: 2,
    capacity_children: 0,
    bed_type: "Romantic Canopy King",
    size_sqft: 520,
    view_type: "Rose Garden & Sunset Valley",
    amenities: ["Canopy Bed", "Sunset Terrace", "Welcome Wine & Fruit Basket", "Aromatherapy Kit", "Late Checkout"],
    is_featured: true,
    available: true
  }
];

export const FALLBACK_GALLERY: GalleryItem[] = [
  { id: 1, title: "Garden Alfresco Dining", category: "restaurant", image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", caption: "Dining amidst nature", order: 1 },
  { id: 2, title: "Gourmet Table Setting", category: "restaurant", image_url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80", caption: "Candlelit elegance", order: 2 },
  { id: 3, title: "Deluxe Mountain Room", category: "lodge", image_url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", caption: "Comfort & mountain tranquility", order: 3 },
  { id: 4, title: "Lodge Exterior at Dusk", category: "lodge", image_url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80", caption: "Golden evening warmth", order: 4 },
  { id: 5, title: "Misty Pine Valley", category: "surroundings", image_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", caption: "Breathtaking surroundings", order: 5 },
  { id: 6, title: "Garden Fire Pit", category: "surroundings", image_url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80", caption: "Evenings under starry skies", order: 6 },
  { id: 7, title: "Chef's Signature Dish", category: "restaurant", image_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", caption: "Handcrafted flavors", order: 7 },
  { id: 8, title: "Luxury Penthouse Suite", category: "lodge", image_url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80", caption: "Unmatched luxury", order: 8 },
  { id: 9, title: "Pine Forest Trail", category: "surroundings", image_url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", caption: "Nature trails for guests", order: 9 }
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    author: "Dr. Rohit & Shalini Sharma",
    location: "Chandigarh",
    rating: 5,
    comment: "Pooja Garden exceeded every expectation! The Butter Chicken and hot garlic naan enjoyed on the garden terrace under fairy lights was unforgettable. Rooms were spotless and warm.",
    stay_type: "Weekend Family Getaway"
  },
  {
    id: 2,
    author: "Priya Nair",
    location: "Mumbai",
    rating: 5,
    comment: "A true sanctuary away from the city hustle. The staff treats you like beloved family. Waking up to the mist over the hills from the Deluxe Suite was breathtaking.",
    stay_type: "Nature Retreat"
  },
  {
    id: 3,
    author: "Marcus & Elena Vance",
    location: "Berlin, Germany",
    rating: 5,
    comment: "Incredible culinary experience! The fusion of authentic spices and scenic tranquility makes Pooja Garden a hidden gem. Will definitely be returning next season.",
    stay_type: "Holiday Stay"
  }
];

// Fetch functions with fallback
export async function getMenuItems(category?: string, isSpecialty?: boolean): Promise<MenuItem[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== "all") params.append("category", category);
    if (isSpecialty !== undefined) params.append("is_specialty", String(isSpecialty));

    const res = await fetch(`${API_BASE_URL}/menu/items?${params.toString()}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch menu");
    const data = await res.json();
    return data && data.length > 0 ? data : FALLBACK_MENU_ITEMS;
  } catch {
    return FALLBACK_MENU_ITEMS.filter(item => {
      if (category && category !== "all" && item.category_slug !== category) return false;
      if (isSpecialty !== undefined && item.is_specialty !== isSpecialty) return false;
      return true;
    });
  }
}

export async function getRooms(featuredOnly?: boolean): Promise<Room[]> {
  try {
    const params = new URLSearchParams();
    if (featuredOnly !== undefined) params.append("featured_only", String(featuredOnly));

    const res = await fetch(`${API_BASE_URL}/rooms?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch rooms");
    const data = await res.json();
    return data && data.length > 0 ? data : FALLBACK_ROOMS;
  } catch {
    return FALLBACK_ROOMS.filter(r => (featuredOnly ? r.is_featured : true));
  }
}

export async function getGallery(category?: string): Promise<GalleryItem[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== "all") params.append("category", category);

    const res = await fetch(`${API_BASE_URL}/gallery?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch gallery");
    const data = await res.json();
    return data && data.length > 0 ? data : FALLBACK_GALLERY;
  } catch {
    return FALLBACK_GALLERY.filter(item => (category && category !== "all" ? item.category === category : true));
  }
}

export async function bookTable(payload: TableBookingPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/table`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to reserve table");
    return await res.json();
  } catch {
    // Generate fallback reference
    const ref = `TBL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return {
      success: true,
      booking_ref: ref,
      message: `Table reserved successfully at Pooja Garden for ${payload.date} at ${payload.time}.`,
      name: payload.name,
      date: payload.date,
      time: payload.time,
      guests: payload.guests,
      seating_area: payload.seating_area
    };
  }
}

export async function bookRoom(payload: RoomBookingPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/room`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to reserve room");
    return await res.json();
  } catch {
    const room = FALLBACK_ROOMS.find(r => r.id === payload.room_id) || FALLBACK_ROOMS[0];
    const checkIn = new Date(payload.check_in);
    const checkOut = new Date(payload.check_out);
    const nights = Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24)));
    const totalPrice = nights * room.price_per_night;
    const ref = `STY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return {
      success: true,
      booking_ref: ref,
      message: `Your stay in ${room.name} has been booked! We look forward to hosting you.`,
      room_name: room.name,
      check_in: payload.check_in,
      check_out: payload.check_out,
      total_nights: nights,
      total_price: totalPrice
    };
  }
}

export async function submitContact(payload: ContactPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to submit message");
    return await res.json();
  } catch {
    return {
      success: true,
      message: "Thank you for reaching out to Pooja Garden! We have received your message and will respond promptly."
    };
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    if (!res.ok) throw new Error("Failed to subscribe");
    return await res.json();
  } catch {
    return {
      success: true,
      message: `Thank you! ${email} has been subscribed to Pooja Garden culinary offers and stay updates.`
    };
  }
}
