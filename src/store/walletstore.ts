import { create } from 'zustand';

interface WalletState {
	address: string | null; // The active wallet address
	isConnected: boolean; // True if Wagmi-connected
	setConnectedWallet: (address: string) => void;
	setPastedWallet: (address: string) => void;
	clearWallet: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
	address: null,
	isConnected: false,

	setConnectedWallet: (address) =>
		set(() => ({
			address,
			isConnected: true,
		})),

	setPastedWallet: (address) =>
		set(() => ({
			address,
			isConnected: false,
		})),

	clearWallet: () =>
		set(() => ({
			address: null,
			isConnected: false,
		})),
}));
