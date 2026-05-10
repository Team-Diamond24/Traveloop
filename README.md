# Traveloop ✈️

Traveloop is a personalized travel planning application designed to take the friction out of organizing multi-city adventures. Unlike modern flat interfaces, Traveloop uses a tactile, skeuomorphic design to make planning feel as satisfying as the trip itself.

## Why Traveloop?

Most travel apps feel like spreadsheets. Traveloop feels like a travel journal. We’ve built a platform that combines powerful logistics—budget tracking, packing lists, and multi-stop itineraries—with a design language that celebrates the physical nature of travel.

### Key Features

- **Tactile Itinerary Builder**: Plan multi-city trips with an interface that feels real. Add stops, pick activities, and organize your days effortlessly.
- **Smart Budgeting**: Keep your finances in check with real-time budget breakdowns and over-spending alerts.
- **Interactive Packing Checklist**: A dedicated space to manage your gear, categorized and interactive.
- **Public Sharing**: Found a perfect route? Generate a shareable link to show off your itinerary to friends or the community without them needing an account.
- **Admin Mission Control**: A comprehensive dashboard for platform analytics, user management, and activity moderation.
- **Skeuomorphic UI**: Custom-built "soft" UI components (buttons, cards, and inputs) that provide a unique, tactile user experience.

---

## Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS + Framer Motion for animations
- **Visualization**: Recharts for budget and analytics tracking
- **State/Data**: Axios, React Context API, React Hook Form
- **UI Components**: Custom skeuomorphic primitives

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: PostgreSQL (node-postgres)
- **Authentication**: JWT (Access + Refresh tokens)
- **Validation**: Zod
- **Storage**: Multer for local file uploads

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or hosted)

### 1. Database Setup
1. Create a new PostgreSQL database named `traveloop`.
2. Run the SQL scripts found in `Backend/sqlquery/` in order:
   - `01_schema.sql` (Tables and relationships)
   - `02_seed_data.sql` (Initial cities and activities)
   - `03_views_and_queries.sql` (Analytics views)

### 2. Backend Configuration
1. Navigate to the `Backend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your database credentials and JWT secrets.
5. Start the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Configuration
1. Navigate to the `Frontend/frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Project Structure

```text
.
├── Backend/               # Express API, DB scripts, and logic
│   ├── sqlquery/          # Database initialization scripts (Schema & Seed)
│   ├── src/               # Application source code (Controllers, Routes, Middleware)
│   └── ...
└── Frontend/              # React application
    └── frontend/          # Vite project root
        ├── src/           # Components, Pages, and Hooks
        │   ├── components/ # Skeuomorphic UI primitives
        │   ├── pages/     # Main application views (Itinerary, Budget, etc.)
        │   └── services/  # API integration layer
        └── ...
```

## API Documentation
For a full list of endpoints and response formats, see the [Backend README](Backend/README.md). You can also find a Postman collection in the `Backend/` folder for quick testing.

## Testing
Quality is a priority. You can verify the application using:
- **Postman**: Import the `traveloop.postman_collection.json` found in the `Backend/` folder.
- **Manual Checklist**: Refer to the [Manual Testing Checklist](Backend/manual_testing_checklist.md) for a step-by-step guide on verifying core features.

---

*Traveloop — because the planning should be as fun as the destination.*
