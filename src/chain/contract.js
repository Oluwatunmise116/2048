// src/chain/contract.js
import { Contract, JsonRpcProvider, BrowserProvider } from "ethers";

export const CONTRACT_ADDRESS = "0xEF74FB27B832beE938D17192308BCdF91D3bB78c";

export const ABI = [
  "function season() view returns (uint256)",
  "function username(address) view returns (string)",
  "function setUsername(string name)",
  "function getMyBest() view returns (uint256)",
  "function submitScore(uint256 newScore)",
  "function getTop(uint256 seasonId) view returns (tuple(address player, uint256 score)[] out)",
  "event ScoreSubmitted(address indexed player, uint256 indexed season, uint256 newScore)"
];

// READ: no wallet needed
const publicProvider = new JsonRpcProvider("https://og-testnet-evm.itrocket.net");
export function getReadContract() {
  return new Contract(CONTRACT_ADDRESS, ABI, publicProvider);
}

// WRITE: from Web3Modal walletProvider
export async function getWriteContractFrom(walletProvider) {
  const provider = new BrowserProvider(walletProvider);
  const signer = await provider.getSigner();
  return new Contract(CONTRACT_ADDRESS, ABI, signer);
}
