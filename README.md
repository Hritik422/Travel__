# One Travel Expert — Full Stack Travel App

A complete, production-ready travel booking web application built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

---

## 🗂 Project Structure

```
onetripexpert/
├── server/          ← Node.js + Express API
│   ├── config/
│   │   ├── db.js         MongoDB connection
│   │   └── seed.js       Database seeder
│   ├── controllers/
│   │   └── travelController.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Destination.js
│   │   ├── Itinerary.js
│   │   ├── Query.js
│   │   └── Review.js
│   ├── routes/
│   │   └── api.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── client/          ← React + Vite frontend
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── home/     (Hero, DestinationsMarquee, TravelStyles, FeaturedPackages, WhyUs, Reviews, CTABanner)
    │   │   └── layout/   (Navbar, Footer)
    │   ├── hooks/
    │   │   └── useDebounce.js
    │   ├── pages/        (HomePage, DestinationsPage, PackageDetailPage, ContactPage, AboutPage, NotFoundPage)
    │   ├── services/
    │   │   └── api.js
    │   ├── store/
    │   │   ├── slices/travelSlice.js
    │   │   └── index.js
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚡ Quick Start

### 1. Setup the Backend

```bash
cd server

# Install dependencies
npm install

# Create your .env file
cp .env.example .env
# Edit .env and add your MongoDB URI:
# MONGO_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/onetripexpert

# Seed the database with sample data (10 destinations, categories, reviews)
npm run seed

# Start the dev server
npm run dev
# → API running at http://localhost:5000
```

### 2. Setup the Frontend

```bash
cd client

# Install dependencies
npm install

# The .env already points to http://localhost:5000
# Change VITE_API_URL if your backend is on a different port

# Start the dev server
npm run dev
# → App running at http://localhost:5173
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/travel` | All destinations |
| GET | `/api/travel/:id` | Single destination |
| GET | `/api/itinerary?id=:id` | Itinerary for a destination |
| GET | `/api/search?location=:q` | Search destinations |
| GET | `/api/reviews` | All reviews |
| POST | `/api/query` | Submit contact form |
| GET | `/api/bycategory` | Travel categories |

---

## 🎨 Design System

- **Display font:** Libre Baskerville (serif, editorial)
- **Body font:** Outfit (clean, modern)
- **Primary palette:** Warm ivory `#FAF8F4` + deep brown `#0E0C0A` + gold `#B8965E`
- **Animations:** Framer Motion throughout — staggered reveals, marquee, hover states

---

## 📦 Tech Stack

**Frontend**
- React 18 + Vite 5
- Redux Toolkit + React Redux
- React Router v6
- Framer Motion
- Tailwind CSS v4
- Lucide React icons
- Axios

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- Helmet (security headers)
- CORS, Compression, Rate limiting
- Morgan (logging)

---

## 🚀 Production Build

```bash
# Build frontend
cd client && npm run build

# Start backend in production
cd server && NODE_ENV=production npm start
```

---

## 📝 Environment Variables

### Server (`server/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Client (`client/.env`)
```
VITE_API_URL=http://localhost:5000
```
