# Project Setup and Database Guide

This guide provides instructions on how to set up the Flight Booking Prototype locally and understand the database architecture.

## 1. Local Development Setup

To run this project on your local machine, follow these steps:

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Installation
1. **Extract the ZIP file** you downloaded from Replit.
2. **Open your terminal** and navigate to the project directory.
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application
Since this is a frontend-focused prototype, you can run the development server using:
```bash
npm run dev
```
The app will typically be available at `http://localhost:5000`.

## 2. Database Architecture

As a prototype, this application currently uses **Zustand** for state management and **LocalStorage** for basic data persistence. This means:
- All data (bookings, users, flights) is stored in the browser's memory.
- No external database (like MySQL or PostgreSQL) is required to run the prototype.

### How to Transition to a Real Database (MySQL/PostgreSQL)
If you wish to convert this into a production-ready application with a persistent database, you will need to:

1. **Set up a Database Server**: Install MySQL or PostgreSQL.
2. **Define Schemas**: Create tables for `users`, `flights`, `bookings`, and `seats`.
3. **Implement a Backend API**: Create an Express.js server (or similar) to handle database queries.
4. **Connect Frontend to API**: Replace the current mock storage logic in `client/src/hooks/use-flights.ts` and `client/src/lib/storage.ts` with real `fetch` or `axios` calls to your new backend.

## 3. Project Structure
- `client/src/pages/`: Contains all the main views (Home, Booking, Admin, etc.)
- `client/src/components/`: Reusable UI elements (Navbar, Flight Card, Seat Map)
- `client/src/lib/`: Core logic, state management (Zustand), and mock data.
- `client/src/hooks/`: Custom React hooks for managing business logic.

## 4. Admin Credentials
To access the admin panel for testing:
- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `admin123`
