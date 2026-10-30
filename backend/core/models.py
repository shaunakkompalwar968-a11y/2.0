from django.db import models
import uuid

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, related_name='items', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image_url = models.URLField(max_length=500, blank=True)
    is_vegetarian = models.BooleanField(default=True)
    is_specialty = models.BooleanField(default=False)
    spice_level = models.CharField(max_length=20, default='Mild', choices=[
        ('Mild', 'Mild'),
        ('Medium', 'Medium'),
        ('Spicy', 'Spicy')
    ])
    preparation_time = models.CharField(max_length=50, default='15-20 mins')
    available = models.BooleanField(default=True)

    class Meta:
        ordering = ['category', 'name']

    def __str__(self):
        return f"{self.name} (₹{self.price})"


class Room(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image_url = models.URLField(max_length=500)
    capacity_adults = models.PositiveIntegerField(default=2)
    capacity_children = models.PositiveIntegerField(default=1)
    bed_type = models.CharField(max_length=100, default='King Size Bed')
    size_sqft = models.PositiveIntegerField(default=350)
    view_type = models.CharField(max_length=100, default='Lush Garden & Mountain View')
    amenities = models.JSONField(default=list, blank=True)
    is_featured = models.BooleanField(default=False)
    available = models.BooleanField(default=True)

    class Meta:
        ordering = ['price_per_night']

    def __str__(self):
        return f"{self.name} - ₹{self.price_per_night}/night"


class TableBooking(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Confirmation'),
        ('CONFIRMED', 'Confirmed'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    booking_ref = models.CharField(max_length=30, unique=True, editable=False)
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    date = models.DateField()
    time = models.CharField(max_length=20)
    guests = models.PositiveIntegerField(default=2)
    seating_area = models.CharField(max_length=50, default='Garden Dining', choices=[
        ('Garden Dining', 'Garden Dining (Under the Stars / Green Lawns)'),
        ('Indoor Heritage Hall', 'Indoor Heritage Hall (Warm & Cozy)'),
        ('Scenic Terrace', 'Scenic Terrace (Valley View)'),
    ])
    special_requests = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='CONFIRMED')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.booking_ref:
            self.booking_ref = f"TBL-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.booking_ref} - {self.name} ({self.date} at {self.time})"


class RoomBooking(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Confirmation'),
        ('CONFIRMED', 'Confirmed'),
        ('CANCELLED', 'Cancelled'),
    ]

    booking_ref = models.CharField(max_length=30, unique=True, editable=False)
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, related_name='bookings')
    check_in = models.DateField()
    check_out = models.DateField()
    guests = models.PositiveIntegerField(default=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    special_requests = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='CONFIRMED')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.booking_ref:
            self.booking_ref = f"STY-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.booking_ref} - {self.name} ({self.room.name if self.room else 'Room'})"


class GalleryItem(models.Model):
    CATEGORY_CHOICES = [
        ('all', 'All'),
        ('restaurant', 'Restaurant'),
        ('lodge', 'Lodge'),
        ('surroundings', 'Surroundings'),
    ]

    title = models.CharField(max_length=150)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='restaurant')
    image_url = models.URLField(max_length=500)
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"[{self.category}] {self.title}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.email} ({self.created_at.strftime('%Y-%m-%d')})"


class Testimonial(models.Model):
    author = models.CharField(max_length=120)
    location = models.CharField(max_length=120, default='Guest')
    rating = models.PositiveIntegerField(default=5)
    comment = models.TextField()
    stay_type = models.CharField(max_length=100, default='Dining & Stay')
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.author} ({self.rating}★)"
