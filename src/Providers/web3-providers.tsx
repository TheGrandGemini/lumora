// providers/Web3Provider.tsx
'use client';

import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { WagmiProvider, createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, bsc } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const config = createConfig(
	getDefaultConfig({
		appName: 'Lumora',
		walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
		chains: [mainnet, polygon, arbitrum, bsc],
	})
);

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider
					theme='midnight' // or "auto" / "minimal" / "rounded"
					mode='auto'>
					{children}
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}
