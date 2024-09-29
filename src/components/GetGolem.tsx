import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { X } from "lucide-react";

export const GetGolem = () => {
  return (
    <div>
      <button
        onClick={() => useDisconnect()}
        className="bg-blue-500 hover:bg-blue-600 text-black font-mono font-semibold py-2 px-4 rounded-md transition-colors shadow-[0_0_5px_#0000ff]"
        title="Disconnect"
      >
        <span>Disconnect</span>
      </button>
    </div>
  );
};
