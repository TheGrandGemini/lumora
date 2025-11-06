'use client';
import BalanceChange from '@/components/UI/BalanceChange';

export default function PortfolioHeader() {
	return (
		<div className='py-4 text-center flex flex-col items-start justify-center'>
			<h2 className='text-primary text-xl font-semibold mb-1'>
				Total Portfolio Value
			</h2>
			<BalanceChange size='sm' />
		</div>
	);
}
