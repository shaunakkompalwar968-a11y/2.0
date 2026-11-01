# 🚀 Deploying Pooja Garden on Render (Complete Guide)

This guide provides step-by-step instructions to comfortably deploy the entire **Pooja Garden** application (Next.js Frontend + Django 5 Backend + PostgreSQL Database) on [Render](https://render.com).

---

## 🌟 Method 1: One-Click Blueprint Deployment (Recommended)

Render provides **Blueprints (`render.yaml`)**, which automatically provisions the Managed PostgreSQL database, Django backend, and Next.js frontend with all environment variables connected in a single click.

### Steps:
1. **Push your code to GitHub / GitLab**.
2. Go to your [Render Dashboard](https://dashboard.render.com).
3. Click the **"New +"** button in the top right and select **"Blueprint"**.
4. Connect your **Pooja Garden** repository.
5. Render will automatically detect `render.yaml` and show:
   - **Database**: `pooja-garden-db` (PostgreSQL)
   - **Backend Web Service**: `pooja-garden-backend` (Python)
   - **Frontend Web Service**: `pooja-garden-frontend` (Node)
6. Click **"Apply"**.
7. Render will automatically:
   - Provision the PostgreSQL database.
   - Run `backend/build.sh` (installs packages, runs migrations, seeds initial resort & restaurant data, creates admin user).
   - Start the backend Gunicorn server on `https://pooja-garden-backend.onrender.com`.
   - Build and start the Next.js frontend on `https://pooja-garden-frontend.onrender.com`.

---

## 🛠️ Method 2: Manual Dashboard Deployment (Step-by-Step)

If you prefer configuring services individually in the Render UI:

### Step 1: Create PostgreSQL Database
1. In Render Dashboard, click **New +** &rarr; **PostgreSQL**.
2. **Name**: `pooja-garden-db`
3. **Database**: `poojagarden_db`
4. **User**: `poojagarden_user`
5. **Plan**: Free
6. Click **Create Database**.
7. Once created, copy the **Internal Database URL** (e.g., `postgres://poojagarden_user:...@dpg-...-a/poojagarden_db`).

---

### Step 2: Create Django Backend Web Service
1. Click **New +** &rarr; **Web Service**.
2. Select your repository.
3. Configure the service:
   - **Name**: `pooja-garden-backend`
   - **Language**: `Python`
   - **Root Directory**: `backend`
   - **Region**: Same as database (e.g., Oregon)
   - **Branch**: `main` (or your active branch)
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 2`
   - **Plan**: Free
4. Add **Environment Variables** under the "Environment" tab:
   | Key | Value | Notes |
   | :--- | :--- | :--- |
   | `PYTHON_VERSION` | `3.12.8` | Recommended Python version |
   | `DJANGO_DEBUG` | `False` | Production security |
   | `DJANGO_SECRET_KEY` | *(Click "Generate" or enter random string)* | Secret key |
   | `DATABASE_URL` | *(Paste Internal Database URL from Step 1)* | Database connection |
   | `ALLOWED_HOSTS` | `*` | Or `.onrender.com` |
   | `CORS_ALLOW_ALL_ORIGINS` | `True` | Or your frontend Render URL |
5. Click **Create Web Service**.
6. When the build completes, copy your backend URL (e.g., `https://pooja-garden-backend.onrender.com`).

---

### Step 3: Create Next.js Frontend Web Service
1. Click **New +** &rarr; **Web Service**.
2. Select your repository.
3. Configure the service:
   - **Name**: `pooja-garden-frontend`
   - **Language**: `Node`
   - **Root Directory**: `frontend`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. Add **Environment Variables**:
   | Key | Value | Notes |
   | :--- | :--- | :--- |
   | `NODE_VERSION` | `20.18.0` | Node.js version |
   | `NEXT_PUBLIC_API_URL` | `https://pooja-garden-backend.onrender.com/api` | *(Your actual backend URL from Step 2 + `/api`)* |
5. Click **Create Web Service**.

---

## 🔑 Post-Deployment Verification

### 1. Verify Backend API Health
Visit: `https://<your-backend>.onrender.com/api/health`
Expected response:
```json
{
  "status": "healthy",
  "app": "Pooja Garden API",
  "database_backend": "postgresql",
  "timestamp": "..."
}
```

### 2. Verify Interactive Swagger / OpenAPI Documentation
Visit: `https://<your-backend>.onrender.com/api/docs`
You can test submitting table reservations, room stays, or contact messages directly in the interactive UI.

### 3. Log In to Django Admin
Visit: `https://<your-backend>.onrender.com/admin`
- **Username**: `admin`
- **Password**: `admin1234`
*(You can change this password immediately in the admin panel or via Django shell).*

### 4. Open the Next.js Frontend
Visit: `https://<your-frontend>.onrender.com`
- Test the Hero section and navigation.
- Browse **Our Restaurant** and filter specialties by category.
- Browse **Our Lodge** and view rooms & suites.
- Click **"Book Now"** or **"Reserve a Table"** to make a reservation with instant reference code generation.
- Submit a message on the **Get In Touch** page.

---

## 💡 Render Best Practices & Troubleshooting

### Free Tier Spin-Down
Render's free tier spins down services after 15 minutes of inactivity. When a new visitor accesses the site, the service automatically spins up within ~30–50 seconds.
- The Next.js frontend has built-in graceful fallbacks in `src/lib/api.ts`, meaning even while the backend is waking up, the frontend displays rich pre-seeded resort content without crashing or showing blank pages!

### Updating Initial Data
If you ever want to re-seed or reload the sample menu dishes, rooms, and gallery items:
1. Open your backend service on Render.
2. Go to the **"Shell"** tab.
3. Run: `python manage.py seed_data`
