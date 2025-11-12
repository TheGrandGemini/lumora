'use client';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type Token = {
	symbol: string;
	name: string;
	logo: string;
};

const TOKENS: Token[] = [
	{ symbol: 'ETH', name: 'Ethereum', logo: '/Tokens/ETH.png' },
	{ symbol: 'USDC', name: 'USD Coin', logo: '/Tokens/USDC.png' },
	{ symbol: 'DAI', name: 'Dai', logo: '/Tokens/DAI.png' },
	{ symbol: 'WBTC', name: 'Wrapped BTC', logo: '/Tokens/BTC.png' },
];

export default function TokenSelector({
	selected,
	onSelect,
	disabledToken,
}: {
	selected: Token | null;
	onSelect: (token: Token) => void;
	disabledToken?: string;
}) {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div
			ref={dropdownRef}
			className='relative'>
			<button
				onClick={() => setOpen(!open)}
				className='flex items-center justify-between text-primary w-32 sm:w-36 bg-base border border-border  px-3 py-2 rounded-xl text-sm font-medium hover:bg-[#2A3244] transition-all'>
				<div className='flex items-center gap-2'>
					{selected ? (
						<>
							<Image
								src={selected.logo}
								alt={selected.symbol}
								width={20}
								height={20}
							/>
							<span>{selected.symbol}</span>
						</>
					) : (
						<span className='text-primary'>Select Token</span>
					)}
				</div>
				<ChevronDown
					size={16}
					className='text-primary'
				/>
			</button>

			{open && (
				<div className='absolute mt-2 w-36 bg-surface border border-border rounded-xl shadow-lg z-10 overflow-hidden'>
					{TOKENS.map((t) => {
						const disabled = t.symbol === disabledToken;
						return (
							<button
								key={t.symbol}
								disabled={disabled}
								onClick={() => {
									onSelect(t);
									setOpen(false);
								}}
								className={`flex items-center gap-2 w-full px-3 py-2 text-sm text-secondary transition-all ${
									disabled
										? 'opacity-40 cursor-not-allowed'
										: 'hover:bg-[#2A3244]'
								}`}>
								<Image
									src={t.logo}
									alt={t.symbol}
									width={18}
									height={18}
								/>
								<span>{t.symbol}</span>
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
