import React, { useState } from "react";
import { InstructionsModal } from "./InstructionModal";

export const HelpIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className=" w-16 h-16 rounded-md bg-gray-700 border border-blue-500 flex items-center justify-center text-blue-400 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={handleClick}
      >
        <span className="font-bold text-sm">How to use</span>
      </button>
      <InstructionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
