from django.contrib import admin
from .models import (
    Category, MenuItem, Room, TableBooking,
    RoomBooking, GalleryItem, ContactMessage, Testimonial
)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_vegetarian', 'is_specialty', 'available')
    list_filter = ('category', 'is_vegetarian', 'is_specialty', 'available')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'price_per_night', 'capacity_adults', 'bed_type', 'is_featured', 'available')
    list_filter = ('is_featured', 'available')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(TableBooking)
class TableBookingAdmin(admin.ModelAdmin):
    list_display = ('booking_ref', 'name', 'phone', 'date', 'time', 'guests', 'seating_area', 'status')
    list_filter = ('status', 'date', 'seating_area')
    search_fields = ('booking_ref', 'name', 'email', 'phone')
    readonly_fields = ('booking_ref', 'created_at')

@admin.register(RoomBooking)
class RoomBookingAdmin(admin.ModelAdmin):
    list_display = ('booking_ref', 'name', 'room', 'check_in', 'check_out', 'guests', 'total_price', 'status')
    list_filter = ('status', 'check_in')
    search_fields = ('booking_ref', 'name', 'email', 'phone')
    readonly_fields = ('booking_ref', 'created_at')

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'order')
    list_filter = ('category',)
    search_fields = ('title', 'caption')

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'message')

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author', 'location', 'rating', 'stay_type', 'created_at')
