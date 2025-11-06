'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface NFTCardProps {
	name: string;
	image: string;
	collection: string;
	estValue: number;
}

export default function NFTCard({
	name,
	image,
	collection,
	estValue,
}: NFTCardProps) {
	return (
		<motion.div
			whileHover={{
				scale: 1.05,
				boxShadow: '0 0 25px rgba(168, 85, 247, 0.35)', // soft purple glow
			}}
			whileTap={{ scale: 0.97 }}
			transition={{
				type: 'spring',
				stiffness: 250,
				damping: 15,
			}}
			className='bg-surface border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer'>
			{/* Image Section */}
			<div className='relative w-auto h-80 sm:h-96 aspect-square bg-muted flex items-center justify-center overflow-hidden'>
				<Image
					src={image}
					alt={name}
					fill
					className='object-cover rounded-t-2xl transition-transform duration-300'
				/>
			</div>

			{/* Info Section */}
			<div className='bg-base p-4 border-t border-border'>
				<h3 className='text-sm sm:text-lg font-semibold text-primary truncate'>
					{name}
				</h3>
				<p className='text-xs sm:text-base text-secondary truncate'>
					{collection}
				</p>
				<p className='text-sm sm:text-base font-bold text-secondary mt-2'>
					${estValue.toLocaleString()}
				</p>
			</div>
		</motion.div>
	);
}
