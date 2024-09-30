"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { polygon } from "viem/chains";

const config = createConfig(
  getDefaultConfig({
    chains: [polygon],
    walletConnectProjectId: "b8ffa896b5587f9afe49bb85b94ad319",
    appName: "addressforge",
    appDescription: "Create3 Vanity Address Salt Generator",
    appUrl: "https://addressforge.xyz",
    appIcon: "https://family.co/logo.png",
  })
);

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
