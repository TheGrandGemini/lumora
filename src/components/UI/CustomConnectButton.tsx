'use client';

import { ConnectKitButton } from 'connectkit';

export function CustomConnectButton() {
	return (
		<ConnectKitButton.Custom>
			{({ isConnected, show, truncatedAddress, ensName }) => {
				return (
					<button
						onClick={show}
						className='px-4 py-2 rounded-xl font-semibold text-white bg-accent hover:bg-accent/80 transition-all duration-200 shadow-md'>
						{isConnected ? (
							<span>{ensName ?? truncatedAddress}</span>
						) : (
							<span>Connect Wallet</span>
						)}
					</button>
				);
			}}
		</ConnectKitButton.Custom>
	);
}
