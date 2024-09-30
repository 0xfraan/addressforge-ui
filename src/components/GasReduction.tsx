import React from "react";

interface GasReductionProps {
  onChange: (value: number) => void;
}

export const GasReduction: React.FC<GasReductionProps> = ({ onChange }) => {
  const handleClick = (value: number) => {
    onChange(value);
  };

  const buttonStyle =
    "px-4 py-2 text-sm font-mono font-bold transition-colors bg-gray-700 text-blue-300 hover:bg-gray-600 border border-blue-500";

  return (
    <div className="items-center">
      <label
        htmlFor="gas-reduction"
        className="block text-blue-400 text-sm font-mono font-bold mb-2"
      >
        GAS REDUCTION:
      </label>
      <div className="flex">
        <button onClick={() => handleClick(2)} className={buttonStyle}>
          2
        </button>
        <button onClick={() => handleClick(4)} className={buttonStyle}>
          4
        </button>
        <button onClick={() => handleClick(8)} className={buttonStyle}>
          8
        </button>
      </div>
    </div>
  );
};
