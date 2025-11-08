import React from "react";
import { InputField } from "../common/InputField";

interface IRoomTable {
  rooms: {
    id: string;
    name: string;
    capacity: number;
  }[];
  onEdit: (room: { id: string; name: string; capacity: number }) => void;
  onDelete: (id: string) => void;
  filterCapacity: string;
  setFilterCapacity: React.Dispatch<React.SetStateAction<string>>;
}
export const RoomTable: React.FC<IRoomTable> = ({
  rooms,
  onEdit,
  onDelete,
  filterCapacity,
  setFilterCapacity,
}) => (
  <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
    <h2 className="text-lg font-semibold px-4 pt-4 text-indigo-800">
      Available Rooms
    </h2>

    <div className="flex gap-3 justify-end px-4 my-4">
      <div className="w-32">
        <InputField
          label="Filter by Capacity"
          type="number"
          name="filterCapacity"
          value={filterCapacity}
          onChange={(e) => setFilterCapacity(e.target.value)}
          placeholder="e.g., 10"
        />
      </div>
      <div>
        <button
          onClick={() => setFilterCapacity("")}
          className="text-sm px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition text-gray-600 h-fit mt-6"
          disabled={!filterCapacity}
        >
          Clear
        </button>
      </div>
    </div>
    {rooms.length === 0 ? (
      <p className="p-4 text-sm text-gray-500">No rooms added yet.</p>
    ) : (
      <table className="w-full border-t text-sm">
        <thead className="bg-indigo-100 text-indigo-800">
          <tr>
            <th className="p-3 text-left font-semibold">Name</th>
            <th className="p-3 text-left font-semibold">Capacity</th>
            <th className="p-3 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr
              key={room.id}
              className="even:bg-indigo-50 hover:bg-indigo-100 transition"
            >
              <td className="p-3">{room.name}</td>
              <td className="p-3">{room.capacity}</td>
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => onEdit(room)}
                  className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(room.id)}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
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
