from ninja import NinjaAPI, Schema
from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.db import connection
from .models import (
    Category, MenuItem, Room, TableBooking, RoomBooking,
    GalleryItem, ContactMessage, Testimonial
)

api = NinjaAPI(
    title="Pooja Garden REST API",
    version="1.0.0",
    description="Official REST API for Pooja Garden Restaurant & Lodge"
)

# -----------------
# Pydantic Schemas
# -----------------

class CategoryOut(Schema):
    id: int
    name: str
    slug: str
    order: int

class MenuItemOut(Schema):
    id: int
    name: str
    slug: str
    category_slug: str
    category_name: str
    description: str
    price: float
    image_url: str
    is_vegetarian: bool
    is_specialty: bool
    spice_level: str
    preparation_time: str
    available: bool

    @staticmethod
    def resolve_category_slug(obj):
        return obj.category.slug

    @staticmethod
    def resolve_category_name(obj):
        return obj.category.name

    @staticmethod
    def resolve_price(obj):
        return float(obj.price)

class RoomOut(Schema):
    id: int
    name: str
    slug: str
    price_per_night: float
    description: str
    image_url: str
    capacity_adults: int
    capacity_children: int
    bed_type: str
    size_sqft: int
    view_type: str
    amenities: List[str]
    is_featured: bool
    available: bool

    @staticmethod
    def resolve_price_per_night(obj):
        return float(obj.price_per_night)

class GalleryItemOut(Schema):
    id: int
    title: str
    category: str
    image_url: str
    caption: str
    order: int

class TestimonialOut(Schema):
    id: int
    author: str
    location: str
    rating: int
    comment: str
    stay_type: str

class TableBookingIn(Schema):
    name: str
    email: str
    phone: str
    date: date
    time: str
    guests: int = 2
    seating_area: str = "Garden Dining"
    special_requests: Optional[str] = ""

class TableBookingOut(Schema):
    success: bool
    booking_ref: str
    message: str
    name: str
    date: str
    time: str
    guests: int
    seating_area: str

class RoomBookingIn(Schema):
    room_id: int
    name: str
    email: str
    phone: str
    check_in: date
    check_out: date
    guests: int = 2
    special_requests: Optional[str] = ""

class RoomBookingOut(Schema):
    success: bool
    booking_ref: str
    message: str
    room_name: str
    check_in: str
    check_out: str
    total_nights: int
    total_price: float

class ContactIn(Schema):
    name: str
    email: str
    phone: Optional[str] = ""
    subject: Optional[str] = ""
    message: str

class ContactOut(Schema):
    success: bool
    message: str

class NewsletterIn(Schema):
    email: str

class NewsletterOut(Schema):
    success: bool
    message: str


# -----------------
# API Endpoints
# -----------------

@api.get("/health")
def health_check(request):
    db_engine = connection.settings_dict.get('ENGINE', 'unknown').split('.')[-1]
    return {
        "status": "healthy",
        "app": "Pooja Garden API",
        "database_backend": db_engine,
        "timestamp": datetime.now().isoformat()
    }


# Menu & Categories
@api.get("/menu/categories", response=List[CategoryOut])
def list_categories(request):
    return Category.objects.all().order_by('order', 'name')


@api.get("/menu/items", response=List[MenuItemOut])
def list_menu_items(
    request,
    category: Optional[str] = None,
    is_specialty: Optional[bool] = None,
    search: Optional[str] = None
):
    queryset = MenuItem.objects.filter(available=True).select_related('category')
    if category and category.lower() != 'all':
        queryset = queryset.filter(category__slug=category)
    if is_specialty is not None:
        queryset = queryset.filter(is_specialty=is_specialty)
    if search:
        queryset = queryset.filter(name__icontains=search)
    return list(queryset)


@api.get("/menu/items/{item_id}", response=MenuItemOut)
def get_menu_item(request, item_id: int):
    return get_object_or_404(MenuItem.objects.select_related('category'), id=item_id)


# Rooms & Accommodations
@api.get("/rooms", response=List[RoomOut])
def list_rooms(request, featured_only: Optional[bool] = None):
    queryset = Room.objects.filter(available=True)
    if featured_only is not None:
        queryset = queryset.filter(is_featured=featured_only)
    return list(queryset)


@api.get("/rooms/{room_id}", response=RoomOut)
def get_room(request, room_id: int):
    return get_object_or_404(Room, id=room_id)


# Gallery
@api.get("/gallery", response=List[GalleryItemOut])
def list_gallery(request, category: Optional[str] = None):
    queryset = GalleryItem.objects.all()
    if category and category.lower() != 'all':
        queryset = queryset.filter(category=category.lower())
    return list(queryset)


# Testimonials
@api.get("/testimonials", response=List[TestimonialOut])
def list_testimonials(request):
    return list(Testimonial.objects.all().order_by('-id')[:10])


# Table Reservations
@api.post("/bookings/table", response=TableBookingOut)
def create_table_booking(request, payload: TableBookingIn):
    booking = TableBooking.objects.create(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        date=payload.date,
        time=payload.time,
        guests=payload.guests,
        seating_area=payload.seating_area,
        special_requests=payload.special_requests or ""
    )
    return {
        "success": True,
        "booking_ref": booking.booking_ref,
        "message": f"Table reserved successfully at Pooja Garden for {payload.date} at {payload.time}.",
        "name": booking.name,
        "date": str(booking.date),
        "time": booking.time,
        "guests": booking.guests,
        "seating_area": booking.seating_area
    }


# Room Reservations
@api.post("/bookings/room", response=RoomBookingOut)
def create_room_booking(request, payload: RoomBookingIn):
    room = get_object_or_404(Room, id=payload.room_id)
    
    # Calculate nights
    delta = (payload.check_out - payload.check_in).days
    total_nights = max(1, delta)
    total_price = room.price_per_night * Decimal(total_nights)

    booking = RoomBooking.objects.create(
        room=room,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        check_in=payload.check_in,
        check_out=payload.check_out,
        guests=payload.guests,
        total_price=total_price,
        special_requests=payload.special_requests or ""
    )
    return {
        "success": True,
        "booking_ref": booking.booking_ref,
        "message": f"Your stay in {room.name} has been booked! We look forward to hosting you.",
        "room_name": room.name,
        "check_in": str(booking.check_in),
        "check_out": str(booking.check_out),
        "total_nights": total_nights,
        "total_price": float(total_price)
    }


# Contact Form
@api.post("/contact", response=ContactOut)
def submit_contact(request, payload: ContactIn):
    ContactMessage.objects.create(
        name=payload.name,
        email=payload.email,
        phone=payload.phone or "",
        subject=payload.subject or "Inquiry from Website",
        message=payload.message
    )
    return {
        "success": True,
        "message": "Thank you for reaching out to Pooja Garden! We have received your message and our team will get back to you shortly."
    }


# Newsletter Form
@api.post("/newsletter", response=NewsletterOut)
def subscribe_newsletter(request, payload: NewsletterIn):
    return {
        "success": True,
        "message": f"Thank you! {payload.email} has been subscribed to Pooja Garden culinary offers and stay updates."
    }
