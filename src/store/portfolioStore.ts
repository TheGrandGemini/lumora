// stores/portfolioStore.ts
import { create } from 'zustand';

interface Token {
	name: string;
	symbol: string;
	icon: string; // local path or imported icon
	amount: number;
	value: number;
	price: number;
	changePercent: number;
}

interface NFT {
	name: string;
	image: string; // local path or IPFS/URL
	collection: string;
	estValue: number; // estimated value in USD
}

interface PortfolioState {
	tokens: Token[];
	nfts: NFT[];
	balance: number;
	change: number;
	changePercent: number;
	setTokens: (tokens: Token[]) => void;
	setNFTs: (nfts: NFT[]) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
	tokens: [
		{
			name: 'Bitcoin',
			symbol: 'BTC',
			icon: '/Tokens/BTC.png',
			amount: 0.2,
			value: 21460.98,
			price: 107304.9,
			changePercent: 5.7,
		},
		{
			name: 'Ethereum',
			symbol: 'ETH',
			icon: '/Tokens/ETH.png',
			amount: 2,
			value: 7535.78,
			price: 3762.89,
			changePercent: -24,
		},
		{
			name: 'BNB',
			symbol: 'BNB',
			icon: '/Tokens/DAI.png',
			amount: 2000,
			value: 2144,
			price: 1.08,
			changePercent: 0.15,
		},
	],
	nfts: [
		{
			name: 'Alpha Surge #213',
			image: '/nfts/alpha.png',
			collection: 'Volt Guardians',
			estValue: 9200,
		},
		{
			name: 'Thunder Bolt',
			image: '/nfts/bolt.png',
			collection: 'Volt Guardians',
			estValue: 8700,
		},
		{
			name: 'Nova Pulse',
			image: '/nfts/nova.png',
			collection: 'Volt Guardians',
			estValue: 6300,
		},
		{
			name: 'Shadow Pulse',
			image: '/nfts/shadow.png',
			collection: 'Volt Guardians',
			estValue: 8400,
		},
	],
	balance: 31140.76 + 32600,
	change: 5100.55,
	changePercent: 9.7,
	setTokens: (tokens) => set({ tokens }),
	setNFTs: (nfts) => set({ nfts }),
}));
