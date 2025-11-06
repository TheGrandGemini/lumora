// small client component mounted inside layout or provider
'use client';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useWalletStore } from './walletstore';

export function WalletSync() {
	const { address, isConnected } = useAccount();
	const { setConnectedWallet, clearWallet } = useWalletStore();

	useEffect(() => {
		if (isConnected && address) {
			setConnectedWallet(address);
		} else {
			// keep pasted wallet unless explicit disconnect: only clear if disconnected from wagmi and no pasted wallet desired.
			// If you want to auto-clear, call clearWallet();
		}
	}, [isConnected, address, setConnectedWallet, clearWallet]);

	return null;
}
