import React from "react";
import Image from "next/image";
import GlmIcon from "@/images/glm.svg";

interface Props {
  data: any;
  isLoading: boolean;
}
export const GolemBalance = ({ data, isLoading }: Props) => {
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
