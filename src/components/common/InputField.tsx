import React from "react";

interface IInputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export const InputField: React.FC<IInputFieldProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div>
    <label className="block text-sm font-semibold text-indigo-700 mb-1">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border-2 rounded-lg px-3 py-2 focus:outline-none transition-all duration-200 ${
        error
          ? "border-red-500 focus:ring-red-300"
          : "border-indigo-300 focus:ring-indigo-400"
      }`}
    />

    {/* Fixed height space for error message */}
    <div className="h-5 mt-1">
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  </div>
);
