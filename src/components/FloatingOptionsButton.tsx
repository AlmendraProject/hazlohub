"use client";

import React from "react";

interface FloatingOptionsButtonProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

const FloatingOptionsButton: React.FC<FloatingOptionsButtonProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
          ¿Qué deseas hacer?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            Crear Post
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingOptionsButton;
