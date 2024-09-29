import React from "react";
import Image from "next/image";
import { useAccount, useBalance } from "wagmi";
import GlmIcon from "@/images/glm.svg";

const GLM_CONTRACT_ADDRESS = "0x7DD9c5Cba05E151C895FDe1CF355C9A1D5DA6429";

export const GolemBalance: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { data, isLoading, error } = useBalance({
    address,
    token: GLM_CONTRACT_ADDRESS,
  });

  return (
    <div className="flex items-center text-blue-500 font-mono">
      <Image src={GlmIcon} alt="Golem Network Token" width={24} height={24} />
      <span className="ml-2">
        {isLoading
          ? "0.00"
          : data?.formatted
          ? parseFloat(data.formatted).toFixed(2)
          : "0.00"}
      </span>
      <span className="ml-2">GLM</span>
    </div>
  );
};
