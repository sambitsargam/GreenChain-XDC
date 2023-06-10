import React from "react";
import { Navbar, MintProfile } from "../components";
import { CivicPassProvider } from "../context/CivicPass";
import { GatewayStatus, IdentityButton, useGateway } from "@civic/ethereum-gateway-react";
import {useAccount, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { hardhat } from 'wagmi/chains';
import { xdcTestnet } from '../context/xdc';


const Interface = () => {
  <div className="bg-gradient-to-b from-green-700 to-black">
    <Navbar />
    <MintProfile />
  </div>
}

const clientChains = [xdcTestnet, hardhat];
const { chains, provider } = configureChains(clientChains, [publicProvider()]);

const { wallets } = getDefaultWallets({ appName: 'Green Chain', chains });

const connectors = connectorsForWallets([
    ...wallets,
]);
const client = createClient({
    autoConnect: true,
    connectors,
    provider,
});

const Gateway = () => {
  const { gatewayStatus } = useGateway();
  const { address } = useAccount();
if (!address) return <div>Connect your wallet</div>;
  return ( 
    <div>
      <IdentityButton />
        { gatewayStatus !== GatewayStatus.ACTIVE && <div>Verify you are a unique person before entering</div>}
    </div>
    )
  }

function Create() {
  return (
    <WagmiConfig client={client}>
    <CivicPassProvider>
        <Gateway />
        <Interface />
    </CivicPassProvider>
    </WagmiConfig>
  );
}

export default Create;
