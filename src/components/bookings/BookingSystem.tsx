import React, { useState } from "react";
import BookingForm from "./BookingForm";
import BookingTable from "./BookingTable";
import { v4 as uuidv4 } from "uuid";
import type { IRoom } from "../../types/form";
import type { Booking } from "../../types/bookings";

interface BookingManagementProps {
  rooms: IRoom[];
}

const BookingManagement: React.FC<BookingManagementProps> = ({ rooms }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  const handleSave = (booking: Booking) => {
    if (editingBooking) {
      setBookings((prev) =>
        prev.map((b) => (b.id === editingBooking.id ? { ...booking, id: b.id } : b))
      );
      setEditingBooking(null);
    } else {
      setBookings([...bookings, { ...booking, id: uuidv4() }]);
    }
  };

  const handleDelete = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <div className="mt-10 space-y-8 border rounded p-5">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Booking Management
      </h2>
      <BookingForm
        rooms={rooms}
        bookings={bookings}
        onSave={handleSave}
        editingBooking={editingBooking}
      />
      <BookingTable
        bookings={bookings}
        rooms={rooms}
        onEdit={setEditingBooking}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default BookingManagement;
