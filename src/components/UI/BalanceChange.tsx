'use client';

import clsx from 'clsx';
import { usePortfolioStore } from '@/store/portfolioStore';

export default function BalanceChange({ size = 'lg' }: { size?: 'sm' | 'lg' }) {
	const { balance, change, changePercent } = usePortfolioStore();
	const isPositive = change >= 0;

	return (
		<div
			className={clsx(
				size === 'lg' ? 'mb-8' : '',
				'flex flex-col items-start'
			)}>
			{/* Balance */}
			<div
				className={clsx(
					size === 'lg'
						? 'text-3xl font-bold font-number text-primary'
						: 'text-2xl font-bold font-number text-primary'
				)}>
				${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
			</div>

			{/* % Change and Price */}
			<div
				className={clsx(
					'flex flex-wrap justify-center sm:justify-start items-center gap-1 text-sm font-medium mt-1',
					isPositive
						? 'text-[rgb(var(--color-success))]'
						: 'text-[rgb(var(--color-error))]'
				)}>
				<svg
					className='w-4 h-4'
					fill='currentColor'
					viewBox='0 0 20 20'>
					<path
						fillRule='evenodd'
						d={
							isPositive
								? 'M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
								: 'M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'
						}
						clipRule='evenodd'
					/>
				</svg>

				<span>
					{changePercent}% ({isPositive ? '+' : '-'}$
					{Math.abs(change).toLocaleString()})
				</span>
			</div>
		</div>
	);
}
