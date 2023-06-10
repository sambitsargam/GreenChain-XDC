import React, {FC, PropsWithChildren, useEffect, useState} from "react";
import {GatewayProvider} from "@civic/ethereum-gateway-react";
import {useAccount} from "wagmi";
import {Wallet} from "ethers";

const UNIQUENESS_PASS = "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6";

export const CivicPassProvider: FC<PropsWithChildren> = ({ children }) => {
  const { connector } = useAccount();
  const [wallet, setWallet] = useState<Wallet>();
  useEffect(() => {
    if (!connector) return;
    connector.getSigner().then(setWallet);
  }, [connector]);

  return <GatewayProvider
    wallet={wallet}
    gatekeeperNetwork={UNIQUENESS_PASS}
  >
    {children}
  </GatewayProvider>;
}