'use client';

import { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import Sidebar from './Sidebar';
import ThemeSwitchButton from '../UI/ThemeSwitchButton';
import { useWalletStore } from '@/store/walletstore';

export default function Header() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [input, setInput] = useState('');
	const { setPastedWallet } = useWalletStore();

	const handlePasteWallet = () => {
		const address = input.trim();
		if (address.startsWith('0x') && address.length === 42) {
			setPastedWallet(address);
			setInput('');
			alert(`Wallet ${address} loaded successfully.`);
		} else if (address.endsWith('.eth')) {
			setPastedWallet(address);
			setInput('');
			alert(`ENS ${address} loaded successfully.`);
		} else {
			alert('Invalid wallet or ENS address.');
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') handlePasteWallet();
	};

	return (
		<>
			{/* Sidebar Drawer */}
			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>

			<header className='flex items-center justify-between px-4 py-3 border-b border-border bg-base relative z-40'>
				{/* Left: Hamburger (mobile only) */}
				<button
					onClick={() => setIsSidebarOpen(true)}
					className='lg:hidden p-2 hover:bg-hover rounded-xl transition'>
					<Menu size={24} />
				</button>

				{/* Center: Search Input */}
				<div className='flex items-center bg-transparent border border-border px-3 py-2 rounded-full w-[70%] sm:w-[60%] lg:w-[45%]'>
					<Search
						className='mr-2 text-secondary hover:text-primary cursor-pointer'
						size={18}
						onClick={handlePasteWallet}
					/>
					<input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Search or paste wallet address / ENS...'
						className='bg-transparent outline-none text-sm flex-1 text-primary placeholder:text-secondary'
					/>
					{input && (
						<button
							onClick={handlePasteWallet}
							className='text-accent text-sm font-medium hover:underline ml-2'>
							Load
						</button>
					)}
				</div>

				{/* Right: Theme Toggle (hide Connect on mobile) */}
				<div className='flex items-center gap-3'>
					<ThemeSwitchButton />
				</div>
			</header>
		</>
	);
}
