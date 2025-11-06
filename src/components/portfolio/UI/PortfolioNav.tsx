'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface PortfolioNavProps {
	onTabChange: (tab: string) => void;
}

export default function PortfolioNav({ onTabChange }: PortfolioNavProps) {
	const [active, setActive] = useState('Tokens');
	const tabs = ['Tokens', 'NFTs', 'History'];

	const handleClick = (tab: string) => {
		setActive(tab);
		onTabChange(tab);
	};

	return (
		<nav className='flex justify-between gap-8 py-3  w-40'>
			{tabs.map((tab) => (
				<button
					key={tab}
					onClick={() => handleClick(tab)}
					className={clsx(
						'relative text-sm font-medium transition-colors duration-300 pb-2',
						active === tab ? 'text-secondary' : 'text-primary hover:text-hover'
					)}>
					{tab}
					<span
						className={clsx(
							'absolute -bottom-1 left-0 w-full h-[2px] bg-secondary rounded transition-transform duration-300 origin-left',
							active === tab ? 'scale-x-100' : 'scale-x-0'
						)}
					/>
				</button>
			))}
		</nav>
	);
}
