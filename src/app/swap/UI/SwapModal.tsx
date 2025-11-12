// SwapModal.tsx
'use client';

import { Loader2, CheckCircle } from 'lucide-react';
import {
	motion,
	AnimatePresence,
	useAnimate,
	usePresence,
} from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';

type Token = {
	symbol: string;
	name: string;
	logo: string;
	price: number;
};

type SwapModalProps = {
	open: boolean;
	sellToken: Token | null;
	sellAmount: number | '';
	buyToken: Token | null;
	buyAmount: number | '';
	onConfirm: () => void;
	onCancel: () => void;
	resetKey: number;
	buttonRef: React.RefObject<HTMLButtonElement | null>;
};

export default function SwapModal({
	open,
	sellToken,
	sellAmount,
	buyToken,
	buyAmount,
	onConfirm,
	onCancel,
	resetKey,
	buttonRef,
}: SwapModalProps) {
	const [stage, setStage] = useState<'confirm' | 'loading' | 'success'>(
		'confirm'
	);
	const [scope, animate] = useAnimate<HTMLDivElement>();
	const [isPresent, safeToRemove] = usePresence();

	/* ---------- ENTER ANIMATION ---------- */
	useEffect(() => {
		if (!open || !isPresent || !buttonRef.current) return;

		const rect = buttonRef.current.getBoundingClientRect();
		const fromX = rect.left + rect.width / 2 - window.innerWidth / 2;
		const fromY = rect.top + rect.height / 2 - window.innerHeight / 2;

		// 1. Set initial state instantly
		animate(
			scope.current,
			{ scale: 0.6, x: fromX, y: fromY, opacity: 0, borderRadius: 24 },
			{ duration: 0 }
		).then(() => {
			// 2. Animate to full size
			animate(
				scope.current,
				{
					scale: 1,
					x: 0,
					y: 0,
					opacity: 1,
					borderRadius: 16,
				},
				{
					type: 'spring',
					stiffness: 300,
					damping: 30,
				}
			);
		});
	}, [open, isPresent, buttonRef, animate, scope]);

	/* ---------- EXIT ANIMATION ---------- */
	useEffect(() => {
		if (open || isPresent || !buttonRef.current) return;

		const rect = buttonRef.current.getBoundingClientRect();
		const toX = rect.left + rect.width / 2 - window.innerWidth / 2;
		const toY = rect.top + rect.height / 2 - window.innerHeight / 2;

		animate(
			scope.current,
			{
				scale: 0.6,
				x: toX,
				y: toY,
				opacity: 0,
				borderRadius: 24,
			},
			{
				type: 'spring',
				stiffness: 300,
				damping: 30,
				onComplete: safeToRemove,
			}
		);
	}, [open, isPresent, buttonRef, animate, scope, safeToRemove]);

	const handleContinue = async () => {
		setStage('loading');
		await new Promise((r) => setTimeout(r, 2000));
		setStage('success');
	};

	const handleClose = useCallback(() => onCancel(), [onCancel]);
	const handleSuccessClose = useCallback(() => {
		onConfirm();
		handleClose();
	}, [onConfirm, handleClose]);

	const summary = `You are trying to swap ${sellAmount} ${sellToken?.symbol} to ${buyAmount} ${buyToken?.symbol}. Please confirm if you are sure and cancel if you are not.`;

	if (!open) return null;

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					key={resetKey}
					className='fixed inset-0 z-50 flex items-center justify-center p-4'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}>
					{/* BACKDROP */}
					<motion.div
						className='absolute inset-0 bg-black/50'
						onClick={handleClose}
					/>

					{/* MODAL CARD */}
					<div
						ref={scope}
						className='relative bg-surface rounded-2xl p-6 max-w-sm w-full border border-border shadow-2xl'
						style={{
							transformOrigin: '50% 50%', // Replaces originX/originY
						}}
						onClick={(e) => e.stopPropagation()}>
						{/* CONFIRM */}
						{stage === 'confirm' && (
							<div>
								<p className='text-lg text-primary mb-6'>{summary}</p>
								<div className='flex gap-3 justify-end'>
									<button
										onClick={handleClose}
										className='px-4 py-2 rounded-lg bg-surface border border-border text-primary hover:bg-base transition'>
										Cancel
									</button>
									<button
										onClick={handleContinue}
										className='px-4 py-2 rounded-lg bg-accent text-primary hover:opacity-90 transition'>
										Continue
									</button>
								</div>
							</div>
						)}

						{/* LOADING */}
						{stage === 'loading' && (
							<div className='flex flex-col items-center gap-4 py-8'>
								<Loader2 className='w-10 h-10 text-accent animate-spin' />
								<p className='text-primary'>Processing swap...</p>
							</div>
						)}

						{/* SUCCESS */}
						{stage === 'success' && (
							<div className='text-center py-4'>
								<CheckCircle className='w-12 h-12 text-green-500 mx-auto mb-3' />
								<p className='text-lg text-primary mb-6'>
									You have successfully swapped {sellAmount} {sellToken?.symbol}{' '}
									to {buyAmount} {buyToken?.symbol}!
								</p>
								<button
									onClick={handleSuccessClose}
									className='px-6 py-2 rounded-lg bg-accent text-primary hover:opacity-90 transition'>
									Close
								</button>
							</div>
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
