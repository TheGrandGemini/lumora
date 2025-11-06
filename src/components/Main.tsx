'use client';

import { CustomConnectButton } from './UI/CustomConnectButton';
import { useWalletStore } from '@/store/walletstore';
import Portfolio from '@/components/portfolio/Portfolio';

export default function Main() {
	const { address } = useWalletStore();
	return (
		<main className='mt-4 h-fit'>
			<Portfolio />
			{/* {!address ? (
				<div className='flex flex-col items-center justify-center flex-1 w-full'>
					<CustomConnectButton />
					<p className='text-[16px] text-primary mt-3'>
						Please connect wallet or enter a wallet address to continue.
					</p>
				</div>
			) : (
				<Portfolio address={address}>
					<div className="flex-1" />
				</Portfolio>
			)} */}
		</main>
	);
}
