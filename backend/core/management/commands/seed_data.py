from django.core.management.base import BaseCommand
from core.models import Category, MenuItem, Room, GalleryItem, Testimonial

class Command(BaseCommand):
    help = 'Seeds initial sample data for Pooja Garden'

    def handle(self, *args, **options):
        self.stdout.write("Seeding categories...")
        cat_data = [
            ("Indian", "indian", 1),
            ("Continental", "continental", 2),
            ("Chinese", "chinese", 3),
            ("Beverages", "beverages", 4),
            ("Starters", "starters", 5),
            ("Main Course", "main-course", 6),
            ("Desserts", "desserts", 7),
        ]
        categories = {}
        for name, slug, order in cat_data:
            cat, _ = Category.objects.get_or_create(
                slug=slug,
                defaults={'name': name, 'order': order}
            )
            categories[slug] = cat

        self.stdout.write("Seeding menu items...")
        menu_items = [
            # Specialties
            {
                "name": "Butter Chicken",
                "slug": "butter-chicken",
                "category": categories["indian"],
                "price": 280.00,
                "description": "Rich & creamy tomato gravy with tender clay-oven roasted chicken pieces and fresh butter garnish.",
                "image_url": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": False,
                "is_specialty": True,
                "spice_level": "Mild",
                "preparation_time": "20 mins"
            },
            {
                "name": "Paneer Tikka",
                "slug": "paneer-tikka",
                "category": categories["indian"],
                "price": 260.00,
                "description": "Char-grilled cottage cheese cubes marinated in aromatic spices and mustard oil with bell peppers.",
                "image_url": "https://images.unsplash.com/photo-1567184109411-b29f12df4975?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": True,
                "is_specialty": True,
                "spice_level": "Medium",
                "preparation_time": "15 mins"
            },
            {
                "name": "Grilled Fish Lemon Herb",
                "slug": "grilled-fish",
                "category": categories["continental"],
                "price": 340.00,
                "description": "Pan-seared river fish fillet served with zesty lemon herb butter sauce and roasted farm veggies.",
                "image_url": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": False,
                "is_specialty": True,
                "spice_level": "Mild",
                "preparation_time": "25 mins"
            },
            {
                "name": "Chocolate Lava Cake",
                "slug": "chocolate-lava-cake",
                "category": categories["desserts"],
                "price": 220.00,
                "description": "Warm Belgian chocolate cake with a molten dark chocolate center, served with vanilla bean ice cream.",
                "image_url": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": True,
                "is_specialty": True,
                "spice_level": "Mild",
                "preparation_time": "15 mins"
            },
            # Starters
            {
                "name": "Crispy Veg Spring Rolls",
                "slug": "crispy-veg-spring-rolls",
                "category": categories["chinese"],
                "price": 199.00,
                "description": "Golden crispy fried wrappers filled with shredded farm vegetables served with sweet chili sauce.",
                "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": True,
                "is_specialty": False,
                "spice_level": "Mild",
                "preparation_time": "12 mins"
            },
            {
                "name": "Crisp Spicy Chicken Wings",
                "slug": "spicy-chicken-wings",
                "category": categories["continental"],
                "price": 299.00,
                "description": "Crispy glazed chicken wings tossed in our signature smoky peri-peri & honey glaze.",
                "image_url": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": False,
                "is_specialty": False,
                "spice_level": "Spicy",
                "preparation_time": "18 mins"
            },
            # Main Course
            {
                "name": "Dal Makhani Royal",
                "slug": "dal-makhani-royal",
                "category": categories["indian"],
                "price": 240.00,
                "description": "Slow cooked black lentils simmered overnight with organic butter, cream, and Himalayan spices.",
                "image_url": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": True,
                "is_specialty": False,
                "spice_level": "Mild",
                "preparation_time": "15 mins"
            },
            {
                "name": "Paneer Butter Masala",
                "slug": "paneer-butter-masala",
                "category": categories["indian"],
                "price": 299.00,
                "description": "Tender paneer cubes cooked in a rich, mildly sweet and savory cashewnut and tomato sauce.",
                "image_url": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": True,
                "is_specialty": False,
                "spice_level": "Medium",
                "preparation_time": "20 mins"
            },
            {
                "name": "Hyderabadi Chicken Dum Biryani",
                "slug": "chicken-biryani",
                "category": categories["indian"],
                "price": 329.00,
                "description": "Long-grain basmati rice layered with spiced marinated chicken, saffron milk, caramelized onions and mint.",
                "image_url": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": False,
                "is_specialty": True,
                "spice_level": "Medium",
                "preparation_time": "25 mins"
            },
            # Desserts & Drinks
            {
                "name": "Shahi Gulab Jamun",
                "slug": "gulab-jamun",
                "category": categories["desserts"],
                "price": 149.00,
                "description": "Two soft golden dumplings soaked in warm rose and cardamom scented sugar syrup with pistachios.",
                "image_url": "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": True,
                "is_specialty": False,
                "spice_level": "Mild",
                "preparation_time": "10 mins"
            },
            {
                "name": "Fresh Mint Lime Cooler",
                "slug": "fresh-mint-lime",
                "category": categories["beverages"],
                "price": 140.00,
                "description": "Muddled garden mint leaves, fresh hand-pressed lime juice, soda and pink rock salt.",
                "image_url": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": True,
                "is_specialty": False,
                "spice_level": "Mild",
                "preparation_time": "8 mins"
            },
            {
                "name": "Special Masala Kadak Chai",
                "slug": "masala-kadak-chai",
                "category": categories["beverages"],
                "price": 90.00,
                "description": "Freshly brewed Assam whole leaf tea infused with ginger, green cardamom, cinnamon, and whole milk.",
                "image_url": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
                "is_vegetarian": True,
                "is_specialty": False,
                "spice_level": "Mild",
                "preparation_time": "10 mins"
            }
        ]

        for item in menu_items:
            MenuItem.objects.get_or_create(
                slug=item["slug"],
                defaults=item
            )

        self.stdout.write("Seeding rooms & suites...")
        rooms = [
            {
                "name": "Standard Room",
                "slug": "standard-room",
                "price_per_night": 2500.00,
                "description": "Warm, peaceful guest rooms facing lush garden flora. Equipped with custom oak furniture, premium bedding, and soundproof windows.",
                "image_url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
                "capacity_adults": 2,
                "capacity_children": 1,
                "bed_type": "Queen Bed",
                "size_sqft": 280,
                "view_type": "Garden Courtyard",
                "amenities": ["Free Wi-Fi", "Room Service 24/7", "Air Conditioning", "Rain Shower", "Electric Kettle", "Smart TV"],
                "is_featured": True
            },
            {
                "name": "Deluxe Mountain Room",
                "slug": "deluxe-room",
                "price_per_night": 3500.00,
                "description": "Elevated sanctuary offering majestic views of the surrounding hills, private sunrise balcony, and artisanal tea bar.",
                "image_url": "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
                "capacity_adults": 2,
                "capacity_children": 1,
                "bed_type": "King Bed",
                "size_sqft": 360,
                "view_type": "Valley & Mountain View",
                "amenities": ["Private Balcony", "Free Wi-Fi", "Mountain View", "Room Service 24/7", "Plush Bathrobes", "Espresso Machine"],
                "is_featured": True
            },
            {
                "name": "Premium Garden Suite",
                "slug": "premium-suite",
                "price_per_night": 4800.00,
                "description": "Spacious luxury suite with separate lounge area, garden walkout patio, oversized soaking tub and panoramic nature vistas.",
                "image_url": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
                "capacity_adults": 3,
                "capacity_children": 2,
                "bed_type": "Super King Bed",
                "size_sqft": 480,
                "view_type": "Botanical Garden & Pines",
                "amenities": ["Private Patio", "Soaking Bathtub", "Lounge Area", "High-Speed Wi-Fi", "Mini Bar", "Complimentary Breakfast"],
                "is_featured": True
            },
            {
                "name": "Family Cottage Room",
                "slug": "family-room",
                "price_per_night": 5600.00,
                "description": "Designed for families seeking tranquility and space. Features two queen beds, kids play nook, and dining terrace.",
                "image_url": "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
                "capacity_adults": 4,
                "capacity_children": 2,
                "bed_type": "2 Queen Beds",
                "size_sqft": 550,
                "view_type": "Garden & Forest Edge",
                "amenities": ["2 Queen Beds", "Family Dining Space", "Game Board Collection", "24/7 Room Service", "Private Parking"],
                "is_featured": False
            },
            {
                "name": "Luxury Penthouse Suite",
                "slug": "luxury-suite",
                "price_per_night": 7500.00,
                "description": "The crown jewel of Pooja Garden. Top-floor 360-degree views, heated indoor Jacuzzi, fireplace, and private butler service.",
                "image_url": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
                "capacity_adults": 2,
                "capacity_children": 2,
                "bed_type": "Grand Californian King",
                "size_sqft": 750,
                "view_type": "360 Panoramic Nature & Valley",
                "amenities": ["Private Jacuzzi", "Cozy Fireplace", "Personal Butler Service", "Complimentary High Tea", "VIP Parking"],
                "is_featured": True
            },
            {
                "name": "Honeymoon Rose Suite",
                "slug": "honeymoon-suite",
                "price_per_night": 6800.00,
                "description": "Curated for romantic escapes with candlelit mood lighting, four-poster bed, floral terrace overlooking the serene garden valley.",
                "image_url": "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
                "capacity_adults": 2,
                "capacity_children": 0,
                "bed_type": "Romantic Canopy King Bed",
                "size_sqft": 520,
                "view_type": "Rose Garden & Sunset Valley",
                "amenities": ["Canopy Bed", "Sunset Terrace", "Welcome Champagne & Berries", "Couples Aromatherapy Kit", "Late Checkout"],
                "is_featured": True
            }
        ]

        for room in rooms:
            Room.objects.get_or_create(
                slug=room["slug"],
                defaults=room
            )

        self.stdout.write("Seeding gallery items...")
        gallery_items = [
            ("Lush Garden Alfresco Dining", "restaurant", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", "Dining in our serene greenery", 1),
            ("Gourmet Table Setup", "restaurant", "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80", "Artisan tableware & candlelit ambiance", 2),
            ("Deluxe Mountain View Bedroom", "lodge", "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80", "Elegance and ultimate rest", 3),
            ("Lodge Exterior at Twilight", "lodge", "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80", "Warm golden glow in the mountains", 4),
            ("Morning Mist over Valley", "surroundings", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", "Breathtaking vistas right outside", 5),
            ("Wood Fire Garden Courtyard", "surroundings", "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80", "Starlit bonfire and crisp mountain breeze", 6),
            ("Chef's Specialty Platter", "restaurant", "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80", "Handcrafted signature flavors", 7),
            ("Luxury Penthouse Balcony", "lodge", "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80", "Unobstructed horizon views", 8),
            ("Pine Forest Pathway", "surroundings", "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80", "Private walking trails for guests", 9),
        ]

        for title, cat, url, caption, order in gallery_items:
            GalleryItem.objects.get_or_create(
                title=title,
                defaults={
                    "category": cat,
                    "image_url": url,
                    "caption": caption,
                    "order": order
                }
            )

        self.stdout.write("Seeding testimonials...")
        testimonials = [
            {
                "author": "Dr. Rohit & Shalini Sharma",
                "location": "Chandigarh",
                "rating": 5,
                "comment": "Pooja Garden exceeded every expectation! The Butter Chicken and hot garlic naan enjoyed on the garden terrace under fairy lights was unforgettable. Rooms were spotless and warm.",
                "stay_type": "Weekend Family Getaway"
            },
            {
                "author": "Priya Nair",
                "location": "Mumbai",
                "rating": 5,
                "comment": "A true sanctuary away from the hustle. The staff treats you like beloved family. Waking up to the mist over the hills from the Deluxe Suite was breathtaking.",
                "stay_type": "Nature Retreat"
            },
            {
                "author": "Marcus & Elena Vance",
                "location": "Berlin, Germany",
                "rating": 5,
                "comment": "Incredible culinary experience! The fusion of authentic spices and scenic tranquility makes Pooja Garden a hidden gem. Will definitely be returning next winter.",
                "stay_type": "Holiday Stay"
            }
        ]

        for t in testimonials:
            Testimonial.objects.get_or_create(
                author=t["author"],
                defaults=t
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded all Pooja Garden data!"))
