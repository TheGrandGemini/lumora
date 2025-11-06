'use client';

import Image from 'next/image';
import { useHistoryStore } from '@/store/historyStore';
import { ArrowDownCircle, ArrowUpCircle, RefreshCcw } from 'lucide-react';
import clsx from 'clsx';

export default function HistoryTable() {
	const { history } = useHistoryStore();

	// Group history by date
	const grouped = history.reduce((acc, item) => {
		if (!acc[item.date]) acc[item.date] = [];
		acc[item.date].push(item);
		return acc;
	}, {} as Record<string, typeof history>);

	const renderIcon = (type: string) => {
		switch (type) {
			case 'Receive':
				return (
					<ArrowDownCircle className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500' />
				);
			case 'Send':
				return (
					<ArrowUpCircle className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500' />
				);
			case 'Trade':
				return (
					<RefreshCcw className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white' />
				);
			default:
				return null;
		}
	};

	const renderTypeColor = (type: string) => {
		if (type === 'Receive') return 'text-green-500';
		if (type === 'Send') return 'text-red-500';
		return 'text-white';
	};

	return (
		<div className='w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-10'>
			<h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-primary mb-6'>
				History
			</h2>

			{Object.entries(grouped).map(([date, items]) => (
				<div
					key={date}
					className='mb-8 sm:mb-10'>
					<p className='text-secondary text-[15px] sm:text-[17px] md:text-[19px] mb-4'>
						{date}
					</p>

					<div className='overflow-x-auto rounded-2xl border border-border bg-base backdrop-blur-sm'>
						<table className='w-full text-left text-primary text-[15px] sm:text-[17px] md:text-[18px]'>
							<thead className='uppercase border-b border-secondary text-secondary text-[12px] sm:text-[14px] md:text-[15px]'>
								<tr>
									<th className='px-4 sm:px-6 md:px-8 py-4'>Type</th>
									<th className='px-4 sm:px-6 md:px-8 py-4'>Asset</th>
									<th className='px-4 sm:px-6 md:px-8 py-4'></th>
									<th className='px-4 sm:px-6 md:px-8 py-4 text-right'></th>
								</tr>
							</thead>

							<tbody>
								{items.map((item) => (
									<tr
										key={item.id}
										className='border-b border-secondary hover:bg-secondary/30 transition'>
										{/* TYPE */}
										<td className='px-4 sm:px-6 md:px-8 py-5 flex items-center gap-3 md:gap-4'>
											{renderIcon(item.type)}
											<div>
												<p className='font-medium text-[15px] sm:text-[17px] md:text-[18px]'>
													{item.type}
												</p>
												<p className='text-[12px] sm:text-[14px] md:text-[15px] text-secondary'>
													{item.time}
												</p>
											</div>
										</td>

										{/* ASSET */}
										<td className='px-4 sm:px-6 md:px-8 py-5'>
											<div className='flex items-center gap-3 md:gap-4'>
												<Image
													src={item.tokenIcon}
													alt={item.token}
													width={34}
													height={34}
													className='sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full'
												/>
												<div className='flex flex-col gap-1'>
													<p
														className={clsx(
															'font-semibold',
															'text-[15px] sm:text-[17px] md:text-[18px]',
															renderTypeColor(item.type)
														)}>
														{item.type === 'Receive' ? '+' : ''}
														{item.amount.toFixed(4)} {item.token}
													</p>
													<p className='text-[12px] sm:text-[14px] md:text-[15px] text-secondary'>
														${item.value.toLocaleString()}
													</p>
												</div>
											</div>
										</td>

										{/* "TO" FOR TRADES */}
										<td className='px-4 sm:px-6 md:px-8 py-5 text-[14px] sm:text-[16px] md:text-[17px]'>
											{item.type === 'Trade' && <p>To</p>}
										</td>

										{/* TRADE TARGET ASSET */}
										<td className='px-4 sm:px-6 md:px-8 py-5'>
											{item.type === 'Trade' && (
												<div className='flex items-center gap-3 md:gap-4 text-secondary text-[14px] sm:text-[16px] md:text-[17px]'>
													<Image
														src={item.toTokenIcon || '/placeholder-token.png'}
														alt={item.toToken || 'Token'}
														width={34}
														height={34}
														className='sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full'
													/>
													<div className='flex flex-col'>
														<p className='font-semibold text-primary'>
															{item.toAmount} {item.toToken}
														</p>
														<p className='text-[12px] sm:text-[14px] md:text-[15px] text-secondary'>
															${item.value.toLocaleString()}
														</p>
													</div>
												</div>
											)}
										</td>

										{/* DETAILS */}
										<td className='px-4 sm:px-6 md:px-8 py-5 text-primary text-[14px] sm:text-[16px] md:text-[17px]'>
											<div className='flex flex-col'>
												{item.type === 'Receive' && (
													<p className='text-secondary text-[13px] sm:text-[15px]'>
														From
													</p>
												)}
												{item.type === 'Send' && (
													<p className='text-secondary text-[13px] sm:text-[15px]'>
														To
													</p>
												)}
												{item.type === 'Trade' && (
													<p className='text-secondary text-[13px] sm:text-[15px] mb-1'>
														CA/DEX
													</p>
												)}

												<p className='text-white text-[12px] sm:text-[14px] md:text-[15px] break-all'>
													{item.type === 'Trade' ? item.exchange : item.address}
												</p>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}
		</div>
	);
}
