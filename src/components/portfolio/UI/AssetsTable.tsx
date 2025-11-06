'use client';

import { usePortfolioStore } from '@/store/portfolioStore';
import Image from 'next/image';
import clsx from 'clsx';

export default function AssetTable() {
	const { tokens } = usePortfolioStore();

	return (
		<section className='mt-10 border border-border rounded-2xl overflow-hidden'>
			{/* Header */}
			<div className='px-4 py-6 border-b border-border flex justify-between items-center flex-wrap gap-2'>
				<h2 className='text-2xl sm:text-3xl font-bold text-primary'>Assets</h2>
				<p className='text-xs sm:text-sm text-muted'>Updated live</p>
			</div>

			{/* Table Wrapper */}
			<div className='w-full overflow-x-auto'>
				<table className='w-full border-collapse text-primary text-[13px] sm:text-[16px]'>
					<thead>
						<tr className='border-b border-border text-left font-semibold'>
							<th className='py-2.5 px-3 sm:py-3 sm:px-4 whitespace-nowrap'>
								Token
							</th>
							<th className='py-2.5 px-3 sm:py-3 sm:px-4 whitespace-nowrap'>
								Amount
							</th>
							<th className='py-2.5 px-3 sm:py-3 sm:px-4 whitespace-nowrap'>
								Value ($)
							</th>
							<th className='py-2.5 px-3 sm:py-3 sm:px-4 whitespace-nowrap hidden sm:table-cell'>
								Price ($)
							</th>
						</tr>
					</thead>

					<tbody>
						{tokens.map((token) => (
							<tr
								key={token.symbol}
								className='border-t border-border hover:bg-surface transition-colors duration-200'>
								{/* Token Name */}
								<td className='py-3 px-3 sm:py-4 sm:px-4 flex items-center gap-2 sm:gap-3'>
									<div className='relative w-5 h-5 sm:w-7 sm:h-7 shrink-0'>
										<Image
											src={token.icon}
											alt={token.name}
											fill
											className='rounded-full object-contain'
										/>
									</div>
									<span className='font-semibold truncate'>{token.name}</span>
								</td>

								{/* Amount */}
								<td className='py-3 px-3 sm:py-4 sm:px-4 font-medium'>
									{token.amount}
								</td>

								{/* Value */}
								<td className='py-3 px-3 sm:py-4 sm:px-4 font-medium'>
									{token.value.toLocaleString(undefined, {
										minimumFractionDigits: 2,
									})}
								</td>

								{/* Price + % change */}
								<td className='py-3 px-3 sm:py-4 sm:px-4 hidden sm:table-cell'>
									<div className='flex items-center gap-2 font-semibold'>
										<span>{token.price.toLocaleString()}</span>
										<span
											className={clsx(
												'text-xs sm:text-sm flex items-center gap-1',
												token.changePercent >= 0 ? 'text-success' : 'text-error'
											)}>
											{token.changePercent >= 0 ? '▲' : '▼'}
											{Math.abs(token.changePercent)}%
										</span>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
