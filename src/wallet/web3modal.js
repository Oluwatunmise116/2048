import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

// 0G Labs Testnet (EVM)
const zeroG = {
  chainId: 16601,
  name: '0G Labs Testnet',
  currency: 'OG',
  rpcUrl: 'https://og-testnet-evm.itrocket.net',
  explorerUrl: 'https://explorer.0g.ai'
};

// Metadata shown in wallet UIs
const metadata = {
  name: 'MemeCoin 2048',
  description: 'Onchain 2048 on 0G Labs',
  url: window.location.origin,
  icons: ['https://avatars.githubusercontent.com/u/107149822?s=200'] // any small icon
};

const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: zeroG.chainId
});

const projectId = process.env.REACT_APP_WC_PROJECT_ID;

// init once (registers <w3m-button/> globally)
createWeb3Modal({
  ethersConfig,
  chains: [zeroG],
  projectId,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#7F5AF0',
    '--w3m-border-radius': '12px'
  }
});

export function Web3ModalProvider({ children }) {
  return children; // nothing to render, just ensures module loads
}
