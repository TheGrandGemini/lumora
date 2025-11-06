'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Loader() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center'>
			<motion.div
				animate={{ rotate: 360 }}
				transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
				className='mb-4'>
				<Loader2 className='w-10 h-10 text-purple-500' />
			</motion.div>
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
				className='text-gray-500 dark:text-gray-400'>
				Loading, please wait...
			</motion.p>
		</div>
	);
}
