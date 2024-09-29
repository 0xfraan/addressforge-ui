import { ChevronDown } from "lucide-react";

interface DeployerSectionProps {
  address: string;
  glitchEffect: boolean;
  onEditClick: () => void;
}

const shortenAddress = (addr: string): string => {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
};

export const DeployerSection: React.FC<DeployerSectionProps> = ({
  address,
  glitchEffect,
  onEditClick,
}) => (
  <div className="flex items-center justify-between">
    <span className="text-blue-400 text-sm font-bold">DEPLOYER:</span>
    <button
      onClick={onEditClick}
      className="bg-gray-700 text-blue-300 text-sm font-medium py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-gray-600 transition-colors border border-blue-500 shadow-[0_0_5px_#0000ff]"
    >
      <span className={glitchEffect ? "glitch" : ""}>
        {shortenAddress(address)}
      </span>
      <ChevronDown size={16} />
    </button>
  </div>
);
