import React, { useEffect, useState } from "react";
import type { IRoom } from "../../types/form";
import type { Booking } from "../../types/bookings";

interface BookingFormProps {
  rooms: IRoom[];
  onSave: (booking: Booking) => void;
  editingBooking: Booking | null;
  bookings: Booking[];
}

const BookingForm: React.FC<BookingFormProps> = ({
  rooms,
  onSave,
  editingBooking,
  bookings
}) => {
  const [form, setForm] = useState<Booking>({
    id: "",
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingBooking) setForm(editingBooking);
    else
      setForm({
        id: "",
        roomId: "",
        date: "",
        startTime: "",
        endTime: "",
        title: "",
        description: "",
      });
  }, [editingBooking]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.roomId) newErrors.roomId = "Please select a room.";
    if (!form.date) newErrors.date = "Please select a date.";
    if (!form.startTime) newErrors.startTime = "Start time is required.";
    if (!form.endTime) newErrors.endTime = "End time is required.";

    // Skip deeper validation if basic fields missing
    if (!form.roomId || !form.startTime || !form.endTime) {
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    const start = new Date(`${form.date}T${form.startTime}`);
    const end = new Date(`${form.date}T${form.endTime}`);

    // 🕒 Time order validation
    if (end <= start) {
      newErrors.endTime = "End time must be after start time.";
    }

    // 🕗 Business hours: 8:00 - 18:00
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = end.getHours() * 60 + end.getMinutes();
    const businessStart = 8 * 60;
    const businessEnd = 18 * 60;

    if (startMinutes < businessStart || endMinutes > businessEnd) {
      newErrors.startTime = "Bookings allowed only between 8:00 AM – 6:00 PM.";
    }

    // ⏱ Duration limits: 30 mins – 4 hrs
    const duration = (end.getTime() - start.getTime()) / (1000 * 60); // in minutes
    if (duration < 30) newErrors.endTime = "Minimum duration is 30 minutes.";
    else if (duration > 240) newErrors.endTime = "Maximum duration is 4 hours.";

    // ⚡ Conflict detection
    const conflict = bookings.some(
      (b) =>
        b.roomId === form.roomId &&
        b.date === form.date &&
        b.id !== editingBooking?.id &&
        !(
          end <= new Date(`${b.date}T${b.startTime}`) ||
          start >= new Date(`${b.date}T${b.endTime}`)
        )
    );

    if (conflict) {
      newErrors.startTime = "This room is already booked during that time.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    setForm({
      id: "",
      roomId: "",
      date: "",
      startTime: "",
      endTime: "",
      title: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-indigo-600 mb-3">
        {editingBooking ? "Edit Booking" : "Add New Booking"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meeting Room
          </label>
          <select
            name="roomId"
            value={form.roomId}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
          {errors.roomId && (
            <p className="text-red-500 text-sm">{errors.roomId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Time
          </label>
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm">{errors.startTime}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Time
          </label>
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
          {errors.endTime && (
            <p className="text-red-500 text-sm">{errors.endTime}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Meeting title (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          placeholder="Meeting description (optional)"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90 transition"
      >
        {editingBooking ? "Update Booking" : "Add Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
