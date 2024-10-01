import React, { useState } from "react";
import { InstructionsModal } from "./InstructionModal";
import { HelpCircle } from "lucide-react";

export const HelpIcon: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className=" w-[9rem] h-10  p-1 rounded-md bg-gray-700 border border-blue-500 flex items-center justify-center text-blue-400 hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={handleClick}
      >
        <HelpCircle className="mr-2"/>
        <span className="font-bold text-sm">How to use</span>
      </button>
      <InstructionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
