import React from "react";
import { Navbar, MintProfile } from "../components";
import { CivicPassProvider } from "../context/CivicPass";
import {
  GatewayStatus,
  IdentityButton,
  useGateway,
} from "@civic/ethereum-gateway-react";
import { useAccount, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider, ConnectButton,
} from "@rainbow-me/rainbowkit";
import { hardhat } from "wagmi/chains";
import { xdcTestnet } from "../context/xdc";

const clientChains = [xdcTestnet, hardhat];
const { chains, provider } = configureChains(clientChains, [publicProvider()]);

const { wallets } = getDefaultWallets({ appName: "Green Chain", chains });

const connectors = connectorsForWallets([...wallets]);
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Gateway = () => {
  const { gatewayStatus } = useGateway();
  return (
    <div className="object-center" >
      <IdentityButton />
      {gatewayStatus !== GatewayStatus.ACTIVE && (
        <div>Verify you are a unique person before entering</div>
      )}
    </div>
  );
};

function Create() {
  return (
    <div className="bg-gradient-to-b from-green-700 to-black">
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={clientChains} modalSize="compact">
          <CivicPassProvider>
            <Navbar />
            <button className="text-black font-semibold bg-green-300 py-5 px-20 mx-14 rounded-full cursor-pointer hover:bg-green-800 hover:text-white">
            <ConnectButton
  accountStatus={{
    smallScreen: 'avatar',
    largeScreen: 'full',
  }}
/>           </button> <Gateway />
            <MintProfile />
          </CivicPassProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default Create;
