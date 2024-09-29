import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { X } from "lucide-react";

export const WalletButton = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const truncateAddress = (address?: `0x${string}`) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        return (
          <div>
            {isConnected ? (
              <button
                onClick={show}
                className="bg-blue-500 hover:bg-blue-600 text-black font-mono font-semibold py-2 px-4 rounded-md transition-colors shadow-[0_0_5px_#0000ff] flex items-center space-x-2"
                title="Manage Connection"
              >
                <span>{ensName || truncateAddress(address)}</span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    disconnect();
                  }}
                  className="ml-2 p-1 hover:bg-red-500 rounded transition-colors text-white"
                  title="Disconnect"
                >
                  <X size={16} />
                </div>
              </button>
            ) : (
              <button
                onClick={show}
                className="bg-blue-500 hover:bg-blue-600 text-black font-mono font-semibold py-2 px-4 rounded-md transition-colors shadow-[0_0_5px_#0000ff] flex items-center space-x-2"
              >
                CONNECT
              </button>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};
