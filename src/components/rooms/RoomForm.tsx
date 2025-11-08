import React, { useEffect, useState } from "react";
import type { IRoom } from "../../types/form";
import { InputField } from "../common/InputField";

interface RoomFormProps {
  onSave: (room: IRoom) => void;
  editingRoom: IRoom | null;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSave, editingRoom }) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [errors, setErrors] = useState<{ name?: string; capacity?: string }>({});

  useEffect(() => {
    if (editingRoom) {
      setName(editingRoom.name);
      setCapacity(editingRoom.capacity.toString());
    } else {
      setName("");
      setCapacity("");
    }
  }, [editingRoom]);

  const validate = () => {
    const newErrors: { name?: string; capacity?: string } = {};
    if (!name.trim()) newErrors.name = "Room name is required.";
    if (!capacity.trim()) newErrors.capacity = "Capacity is required.";
    else if (isNaN(Number(capacity)) || Number(capacity) <= 0)
      newErrors.capacity = "Capacity must be a positive number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      id: editingRoom ? editingRoom.id : "",
      name: name.trim(),
      capacity: Number(capacity),
    });

    setName("");
    setCapacity("");
    setErrors({});
  };

  const handleClear = () => {
    setName("");
    setCapacity("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
    >
      {/* Room Name */}
      <div>
        <InputField
          label="Room Name"
          name="Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter room name"
          error={errors.name}
        />
      </div>

      {/* Capacity */}
      <div>
        <InputField
          label="Capacity"
          type="number"
          name="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Enter room capacity"
          error={errors.capacity}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 self-end md:self-auto md:mt-0"> 
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:opacity-90 transition"
        >
          {editingRoom ? "Update Room" : "Add Room"}
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-100 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default RoomForm;
