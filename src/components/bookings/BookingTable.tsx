import React from "react";
import type { IRoom } from "../../types/form";
import type { Booking } from "../../types/bookings";

interface BookingTableProps {
  bookings: Booking[];
  rooms: IRoom[];
  onEdit: (booking: Booking) => void;
  onDelete: (id: string) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({
  bookings,
  rooms,
  onEdit,
  onDelete,
}) => {
  const getRoomName = (id: string) =>
    rooms.find((r) => r.id === id)?.name || "Unknown Room";

  return (
    <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
      <h2 className="text-lg font-semibold px-4 pt-4 text-indigo-800">
        Avaiable Bookings
      </h2>
      {bookings.length === 0 ? (
        <p className="p-4 text-sm text-gray-500">No bookings yet.</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse bg-white rounded-xl shadow-md">
          <thead className="bg-linear-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="p-3">Room</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Title</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t hover:bg-purple-50 transition">
                <td className="p-3">{getRoomName(b.roomId)}</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3">
                  {b.startTime} - {b.endTime}
                </td>
                <td className="p-3">{b.title || "—"}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => onEdit(b)}
                    className="text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(b.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingTable;
