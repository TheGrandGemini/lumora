'use client';

import { ArrowUpDown, RefreshCcw } from 'lucide-react';
import TokenSelector from './TokenSelector';
import SwapModal from './SwapModal';
import { useState, useEffect, useCallback, useRef } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

type Token = {
	symbol: string;
	name: string;
	logo: string;
	price: number;
};

const TOKEN_PRICES: Record<string, number> = {
	ETH: 3420,
	USDC: 1,
	DAI: 1,
	WBTC: 112322,
};

const TOKENS: Token[] = [
	{
		symbol: 'ETH',
		name: 'Ethereum',
		logo: '/tokens/ETH.png',
		price: TOKEN_PRICES.ETH,
	},
	{
		symbol: 'USDC',
		name: 'USD Coin',
		logo: '/tokens/USDC.png',
		price: TOKEN_PRICES.USDC,
	},
	{
		symbol: 'DAI',
		name: 'Dai',
		logo: '/tokens/DAI.png',
		price: TOKEN_PRICES.DAI,
	},
	{
		symbol: 'WBTC',
		name: 'Wrapped BTC',
		logo: '/tokens/BTC.png',
		price: TOKEN_PRICES.WBTC,
	},
];

export default function SwapBox() {
	const [sellToken, setSellToken] = useState<Token | null>(null);
	const [buyToken, setBuyToken] = useState<Token | null>(null);
	const [sellAmount, setSellAmount] = useState<number | ''>('');
	const [buyAmount, setBuyAmount] = useState<number | ''>('');
	const [activeInput, setActiveInput] = useState<'sell' | 'buy' | null>(null);

	const [modalOpen, setModalOpen] = useState(false);
	const [modalKey, setModalKey] = useState(0);
	const swapButtonRef = useRef<HTMLButtonElement>(null);

	// Clear inputs when tokens change
	useEffect(() => {
		unstable_batchedUpdates(() => {
			setSellAmount('');
			setBuyAmount('');
		});
	}, [sellToken, buyToken]);

	// Price sync
	useEffect(() => {
		if (!sellToken || !buyToken) return;

		let newBuy = buyAmount;
		let newSell = sellAmount;

		if (activeInput === 'sell' && sellAmount !== '') {
			const usd = sellToken.price * Number(sellAmount);
			newBuy = Number((usd / buyToken.price).toFixed(6));
		} else if (activeInput === 'buy' && buyAmount !== '') {
			const usd = buyToken.price * Number(buyAmount);
			newSell = Number((usd / sellToken.price).toFixed(6));
		}

		if (newBuy !== buyAmount || newSell !== sellAmount) {
			unstable_batchedUpdates(() => {
				if (newBuy !== buyAmount) setBuyAmount(newBuy);
				if (newSell !== sellAmount) setSellAmount(newSell);
			});
		}
	}, [sellAmount, buyAmount, sellToken, buyToken, activeInput]);

	const handleSwap = () => {
		if (!sellToken || !buyToken) return;
		unstable_batchedUpdates(() => {
			setSellToken(buyToken);
			setBuyToken(sellToken);
			setSellAmount(buyAmount);
			setBuyAmount(sellAmount);
		});
	};

	const handleSelectSell = (token: Token) => {
		if (buyToken && token.symbol === buyToken.symbol) return;
		setSellToken(token);
	};

	const handleSelectBuy = (token: Token) => {
		if (sellToken && token.symbol === sellToken.symbol) return;
		setBuyToken(token);
	};

	const handleSubmit = () => {
		if (!canSwap) return;
		setModalKey((k) => k + 1);
		setModalOpen(true);
	};

	const handleConfirm = useCallback(() => {
		unstable_batchedUpdates(() => {
			setSellAmount('');
			setBuyAmount('');
		});
	}, []);

	const handleCancel = useCallback(() => {
		setModalOpen(false);
	}, []);

	const sellValue =
		sellToken && sellAmount
			? (sellToken.price * Number(sellAmount)).toFixed(2)
			: '0';
	const buyValue =
		buyToken && buyAmount
			? (buyToken.price * Number(buyAmount)).toFixed(2)
			: '0';

	const inputsEnabled = !!sellToken && !!buyToken;
	const canSwap = inputsEnabled && sellAmount !== '' && Number(sellAmount) > 0;

	return (
		<>
			<div className='text-primary rounded-2xl flex flex-col gap-1 w-80 sm:w-96 mx-auto relative'>
				{/* SELL BOX */}
				<div className='flex justify-between items-center bg-surface rounded-xl border border-border p-3'>
					<div className='flex flex-col gap-1'>
						<p className='text-base text-primary'>Sell</p>
						<input
							type='number'
							min='0'
							value={sellAmount}
							onFocus={() => setActiveInput('sell')}
							onChange={(e) =>
								inputsEnabled
									? setSellAmount(
											e.target.value === '' ? '' : Number(e.target.value)
									  )
									: null
							}
							placeholder='0.0'
							disabled={!inputsEnabled}
							className='bg-transparent text-3xl font-medium text-secondary outline-none w-32 sm:w-44 disabled:opacity-40 disabled:cursor-not-allowed'
						/>
						<p className='text-sm text-primary'>${sellValue}</p>
					</div>
					<TokenSelector
						selected={sellToken}
						onSelect={(token) => {
							const full = TOKENS.find((t) => t.symbol === token.symbol);
							if (full) handleSelectSell(full);
						}}
						disabledToken={buyToken?.symbol}
					/>
				</div>

				{/* SWAP ICON */}
				<button
					onClick={handleSwap}
					className='flex justify-center bg-base absolute -my-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 rounded hover:scale-110 transition-all z-10'>
					<div className='bg-surface rounded p-1.5'>
						<ArrowUpDown className='w-6 h-6 text-primary' />
					</div>
				</button>

				{/* BUY BOX */}
				<div className='flex justify-between items-center bg-surface rounded-xl border border-border p-3'>
					<div className='flex flex-col gap-2'>
						<p className='text-base text-primary'>Buy</p>
						<input
							type='number'
							min='0'
							value={buyAmount}
							onFocus={() => setActiveInput('buy')}
							onChange={(e) =>
								inputsEnabled
									? setBuyAmount(
											e.target.value === '' ? '' : Number(e.target.value)
									  )
									: null
							}
							placeholder='0.0'
							disabled={!inputsEnabled}
							className='bg-transparent text-3xl font-medium text-secondary outline-none w-32 sm:w-44 disabled:opacity-40 disabled:cursor-not-allowed'
						/>
						<p className='text-sm text-primary'>${buyValue}</p>
					</div>
					<TokenSelector
						selected={buyToken}
						onSelect={(token) => {
							const full = TOKENS.find((t) => t.symbol === token.symbol);
							if (full) handleSelectBuy(full);
						}}
						disabledToken={sellToken?.symbol}
					/>
				</div>

				{/* SWAP BUTTON */}
				<button
					onClick={handleSubmit}
					disabled={!canSwap}
					ref={swapButtonRef}
					className={`flex items-center justify-center gap-2 mt-4 py-3 rounded-xl font-medium text-base transition-all ${
						canSwap
							? 'bg-accent text-primary hover:opacity-90'
							: 'bg-surface text-secondary/50 cursor-not-allowed'
					}`}>
					<RefreshCcw size={18} />
					Swap
				</button>
			</div>

			<SwapModal
				open={modalOpen}
				sellToken={sellToken}
				sellAmount={sellAmount}
				buyToken={buyToken}
				buyAmount={buyAmount}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				resetKey={modalKey}
				buttonRef={swapButtonRef}
			/>
		</>
	);
}
