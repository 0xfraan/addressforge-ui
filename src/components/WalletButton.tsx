import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

export const WalletButton = () => {
  const { address, isConnected } = useAccount();

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
                className="ml-2 hover:text-gray-300 transition-colors"
                title="Disconnect"
              >
                <div className="bg-blue-500 hover:bg-blue-600 text-black font-mono font-semibold py-2 px-4 rounded-md transition-colors shadow-[0_0_5px_#0000ff] flex items-center space-x-2">
                  <span>{ensName || truncateAddress(address)}</span>
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
