// src/App.tsx
import React, { useState } from "react";
import "./app.css";
import RoomManagement from "./components/rooms/RoomManagement";
import type { IRoom } from "./types/form";
import BookingManagement from "./components/bookings/BookingSystem";

const App: React.FC = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-10">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">
          Meeting Room Scheduler
        </h1>

        <RoomManagement onRoomsChange={setRooms} />
        <BookingManagement rooms={rooms} />
      </div>
    </div>
  );
};

export default App;
