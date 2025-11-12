'use client';

import { CustomConnectButton } from '../components/UI/CustomConnectButton';
import { useWalletStore } from '@/store/walletstore';
import Portfolio from '@/components/portfolio/Portfolio';
import Notice from '@/components/UI/Notice';

export default function Home() {
	const { address } = useWalletStore();
	return (
		<main className='bg-base min-h-screen  flex flex-col lg:ml-56 mt-4 h-fit'>
			{!address ? (
				<div className='flex flex-col items-center justify-center flex-1 w-full'>
					<CustomConnectButton />
					<p className='text-base text-center px-4  text-primary mt-3'>
						Please connect wallet or enter a wallet address to continue.
					</p>
				</div>
			) : (
				<Portfolio />
			)}
			<Notice />
		</main>
	);
}
