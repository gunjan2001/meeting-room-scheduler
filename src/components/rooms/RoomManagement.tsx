import React, { useEffect, useState } from "react";
import type { IRoom } from "../../types/form";
import { RoomTable } from "./RoomTable";
import RoomForm from "./RoomForm";

interface RoomManagementProps {
  onRoomsChange?: (rooms: IRoom[]) => void;
}

const RoomManagement: React.FC<RoomManagementProps> = ({ onRoomsChange }) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [editingRoom, setEditingRoom] = useState<IRoom | null>(null);
  const [filterCapacity, setFilterCapacity] = useState("");


  // Load rooms from localStorage on mount
  useEffect(() => {
    const storedRooms = localStorage.getItem("rooms");
    if (storedRooms) {
      const parsed = JSON.parse(storedRooms);
      setRooms(parsed);
      onRoomsChange?.(parsed);
    }
  }, []);

  // Persist rooms and notify parent when they change
  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
    onRoomsChange?.(rooms);
  }, [rooms, onRoomsChange]);

  // Handle adding or editing a room
  const handleSaveRoom = (room: IRoom) => {
    if (editingRoom) {
      setRooms((prev) =>
        prev.map((r) => (r.id === room.id ? { ...r, ...room } : r))
      );
      setEditingRoom(null);
    } else {
      setRooms((prev) => [...prev, { ...room, id: Date.now().toString() }]);
    }
  };

  // Handle delete
  const handleDeleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section className="max-w-6xl mx-auto mt-10 border rounded p-5">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Room Management
      </h2>

      {/* Room Form */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <RoomForm onSave={handleSaveRoom} editingRoom={editingRoom} />
      </div>

      {/* Room Table */}
      <RoomTable
        rooms={
          filterCapacity
            ? rooms.filter((r) => r.capacity >= Number(filterCapacity))
            : rooms
        }
        onEdit={setEditingRoom}
        onDelete={handleDeleteRoom}
        setFilterCapacity={setFilterCapacity}
        filterCapacity={filterCapacity}
      />
    </section>
  );
};

export default RoomManagement;
