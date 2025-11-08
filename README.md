# 🏢 Meeting Room Scheduler (Frontend Only)

A responsive **Meeting Room Scheduler** built using **React (Vite + TypeScript)** and **Tailwind CSS**.  
This app allows users to manage meeting rooms and bookings — including adding, editing, deleting, and filtering — with data stored in local state or `localStorage`.

---

## 🚀 Features

### 🏠 Room Management
- Display all available meeting rooms  
- Add new rooms with name and capacity  
- Edit and delete existing rooms  
- **Filter rooms by capacity**
- Persistent data (optional with `localStorage`)

### 📅 Booking System
- Create a new booking with:
  - Room selection (dropdown)
  - Date, Start Time, End Time
  - Meeting Title & Description (optional)
- View all bookings for a selected room
- Edit and delete existing bookings
- Validation Rules:
  - ❌ No overlapping bookings for the same room  
  - ⏰ Start time < End time  
  - 🕗 Business hours: **8:00 AM – 6:00 PM**  
  - ⌛ Duration: **Min 30 mins – Max 4 hours**

---

## 🧱 Tech Stack

- ⚛️ **React 18 + TypeScript**
- 🎨 **Tailwind CSS**
- 💾 React State (optionally `localStorage`)
- 🧩 Component-driven architecture (modular)

---