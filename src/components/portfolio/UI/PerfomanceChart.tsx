'use client';

import { useState } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	ResponsiveContainer,
} from 'recharts';
import clsx from 'clsx';
import { Info } from 'lucide-react';
import { usePortfolioStore } from '@/store/portfolioStore';
import BalanceChange from '@/components/UI/BalanceChange';

const generateChartData = (balance: number) => {
	return Array.from({ length: 15 }, (_, i) => ({
		name: `${i + 1}`,
		value: Math.round(balance * (0.5 + Math.random() * 1.5)),
	}));
};

const timeframes = ['1HR', '1D', '1W', '1M'] as const;
type Timeframe = (typeof timeframes)[number];

export default function PerformanceChart() {
	const { balance } = usePortfolioStore();
	const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1M');

	const data = generateChartData(balance);

	return (
		<div className='bg-surface rounded-2xl p-6 border border-base w-[90vw] md:w-[70vw] animate-fade'>
			<h2 className='text-primary text-3xl mb-6'>Performance Chart</h2>

			<p className='text-[12px] text-secondary mb-4 flex items-center gap-2'>
				<Info
					size={14}
					className='text-secondary'
				/>
				Chart inactive — awaiting API access for past wallet balances.
			</p>

			{/* Balance + Change */}
			<BalanceChange />

			{/* Chart */}
			<div className='w-full min-w-[300px] h-64 mb-6'>
				<ResponsiveContainer
					width='100%'
					height='100%'>
					<LineChart
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid
							strokeDasharray='3 3'
							stroke='rgb(var(--color-border))'
						/>
						<XAxis
							dataKey='name'
							hide
						/>
						<YAxis
							domain={[
								Math.min(...data.map((d) => d.value)) * 0.9,
								Math.max(...data.map((d) => d.value)) * 1.1,
							]}
							tick={{ fill: 'rgb(var(--color-secondary))', fontSize: 12 }}
							tickFormatter={(value) => `$${value.toLocaleString()}`}
							axisLine={false}
							tickLine={false}
						/>
						<Line
							type='monotone'
							dataKey='value'
							stroke='rgb(var(--color-accent))'
							strokeWidth={2}
							dot={false}
							activeDot={{ r: 6, stroke: 'rgb(var(--color-accent))' }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			{/* Timeframe Buttons */}
			<div className='ml-10 flex justify-start gap-2'>
				{timeframes.map((tf) => (
					<button
						key={tf}
						onClick={() => setSelectedTimeframe(tf)}
						className={clsx(
							'px-4 py-2 rounded-lg text-sm font-medium transition-all',
							selectedTimeframe === tf
								? 'bg-[rgb(var(--color-accent))] text-[rgb(var(--color-primary))]'
								: 'text-secondary hover:bg-[rgb(var(--color-hover))]'
						)}>
						{tf}
					</button>
				))}
			</div>
		</div>
	);
}
