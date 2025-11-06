'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PortfolioHeader from './UI/PortfolioHeader';
import PortfolioNav from './UI/PortfolioNav';
import Tokens from './pages/Tokens';
import NFTs from './pages/NFTs';
import History from './pages/History';

export default function Portfolio() {
	const [activeTab, setActiveTab] = useState('Tokens');

	const renderContent = () => {
		switch (activeTab) {
			case 'NFTs':
				return <NFTs />;
			case 'History':
				return <History />;
			default:
				return <Tokens />;
		}
	};
	return (
		<section className='mx-6'>
			<PortfolioHeader />
			<PortfolioNav onTabChange={setActiveTab} />
			<div className='mt-6 relative '>
				<AnimatePresence initial={false}>
					<motion.div
						key={activeTab}
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ duration: 0.35, ease: 'easeInOut' }}
						className='absolute w-full'>
						{renderContent()}
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
}
