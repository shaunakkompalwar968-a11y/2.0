# 🌿 Pooja Garden - Restaurant & Nature Lodge Resort

A full-stack web application designed for **Pooja Garden**, a dining destination and scenic mountain lodge resort.

---

## 🎨 Color Palette & Design System

The application strictly adopts the required signature color scheme:

| Color Role | Hex Code | Preview / Description |
| :--- | :--- | :--- |
| **Primary** | `#5C7457` | Olive Forest Sage Green — used for headers, accents, botanical identity |
| **Accent** | `#C8693F` | Warm Terracotta Rust — used for buttons, CTAs, badges, highlights |
| **Surface** | `#FAF8F2` | Warm Ivory Linen Cream — primary backdrop across all pages |
| **Muted** | `#E8E6DA` | Soft Stone Beige — borders, dividing lines, pill chips, card strokes |
| **Text** | `#22281F` | Deep Dark Slate Slate — headlines, body text, high-contrast readability |

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations & Effects**: Framer Motion, Canvas Confetti
- **Icons**: Lucide Icons
- **Responsive Layout**: Desktop, Tablet, and Mobile-first layout with bottom application navigation bar.

### Backend
- **Framework**: Django 5.x
- **API**: Django Ninja (Fast, OpenAPI / Swagger documented REST API)
- **Static Asset Serving**: WhiteNoise
- **CORS Handling**: `django-cors-headers`
- **Database**: PostgreSQL with automatic fallback to SQLite (`db.sqlite3`)
- **Admin**: Django Admin for managing categories, dishes, rooms, bookings, and contact inquiries.

### Containerization
- **Docker**: Production-ready multi-stage Dockerfiles (`frontend/Dockerfile`, `backend/Dockerfile`)
- **Docker Compose**: Orchestrates Next.js, Django 5, and PostgreSQL 16.

---

## 📂 Project Structure

```
├── backend/
│   ├── config/             # Django settings, wsgi, urls
│   ├── core/               # Django models, ninja api, admin, seed_data
│   │   ├── api.py          # Django Ninja REST API endpoints & schemas
│   │   ├── models.py       # Category, MenuItem, Room, Bookings, Gallery, etc.
│   │   ├── admin.py        # Django Admin dashboard registrations
│   │   └── management/     # Seed command (python manage.py seed_data)
│   ├── Dockerfile          # Python 3.12 slim backend container
│   ├── entrypoint.sh       # Auto-migration & seeding entrypoint
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js App Router pages
│   │   │   ├── page.tsx            # Home (Hero, Pillars, Teaser, Specialties, Rooms, Banner)
│   │   │   ├── restaurant/page.tsx # Our Restaurant (Culinary Journey, Specialties, Banner)
│   │   │   ├── lodge/page.tsx      # Our Lodge (Rooms & Suites, Amenities)
│   │   │   ├── menu/page.tsx       # Full Menu (Starters, Main Course, Desserts, Veg Filter)
│   │   │   ├── gallery/page.tsx    # Filterable Gallery with Lightbox modal
│   │   │   ├── about/page.tsx      # Story, 3 Core Values & Heritage
│   │   │   ├── contact/page.tsx    # Contact Info, API Contact Form & Location Card
│   │   │   └── book/page.tsx       # Dedicated Room Stay & Table Reservation System
│   │   ├── components/     # Navbar, Footer, ReservationModal, MobileBottomNav, etc.
│   │   └── lib/api.ts      # API client & fallback datasets
│   ├── Dockerfile          # Next.js multi-stage container
│   └── package.json        # Frontend scripts & dependencies
│
├── docker-compose.yml      # Multi-container orchestration (DB + Backend + Frontend)
├── .env.example            # Environment variables blueprint
└── README.md
```

---

## ⚡ Quick Start

### Option 1: Running with Docker Compose (Recommended for Production)

Make sure Docker and Docker Compose are installed and running:

```bash
# 1. Clone repository & copy environment file
cp .env.example .env

# 2. Build and launch all services
docker compose up --build
```

- **Frontend**: [`http://localhost:3000`](http://localhost:3000)
- **Django Ninja API & Swagger Docs**: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)
- **Django Admin**: [http://localhost:8000/admin](http://localhost:8000/admin) *(Username: `admin`, Password: `admin1234`)*

---

### Option 2: Running Locally (Development Mode)

#### 1. Backend Setup (Django)

```bash
cd backend

# Create & activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations and seed sample data
python manage.py migrate
python manage.py seed_data

# Run server
python manage.py runserver 0.0.0.0:8000
```

#### 2. Frontend Setup (Next.js)

```bash
cd frontend

# Install packages
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🛡️ Django Admin Credentials

- **Username**: `admin`
- **Password**: `admin1234`
- **URL**: [http://localhost:8000/admin](http://localhost:8000/admin)

From the admin dashboard, you can:
- Add, update, and categorize menu items and prices
- Add new rooms, adjust nightly tariffs and photos
- View real-time table reservations and room booking requests
- Read contact messages and inquiries
- Manage photo gallery items

---

## 🔌 Django Ninja REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check & active database engine |
| `GET` | `/api/menu/categories` | List menu categories |
| `GET` | `/api/menu/items` | Filter menu items by category, specialty, search |
| `GET` | `/api/rooms` | List rooms and suites with pricing and amenities |
| `GET` | `/api/gallery` | Filter gallery by category (`all`, `restaurant`, `lodge`, `surroundings`) |
| `POST` | `/api/bookings/table` | Submit a table reservation |
| `POST` | `/api/bookings/room` | Submit a room stay reservation with night calculation |
| `POST` | `/api/contact` | Submit a contact inquiry form |
| `POST` | `/api/newsletter` | Join the newsletter subscription |
