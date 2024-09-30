import React from "react";
import { ChevronDown } from "lucide-react";

interface DeployerSectionProps {
  address: string;
  glitchEffect: boolean;
  onEditClick: () => void;
  isDisabled: boolean;
}

const shortenAddress = (addr: string): string => {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const DeployerSection: React.FC<DeployerSectionProps> = ({
  address,
  glitchEffect,
  onEditClick,
  isDisabled,
}) => (
  <div className="items-center">
    <label
      htmlFor="deployer"
      className="block text-blue-400 text-sm font-mono font-bold mb-2"
    >
      DEPLOYER:
    </label>
    <button
      onClick={isDisabled ? undefined : onEditClick}
      className={`bg-gray-700 text-blue-300 text-sm font-medium py-2 px-4 rounded-md flex items-center space-x-2 transition-colors border border-blue-500 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
      }`}
      disabled={isDisabled}
    >
      <span className={glitchEffect ? "glitch" : ""}>
        {shortenAddress(address)}
      </span>
      <ChevronDown size={16} />
    </button>
  </div>
);
