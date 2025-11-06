'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.5 }}
				className='flex items-center gap-2 mb-4'>
				<AlertCircle className='w-10 h-10 text-secondary' />
				<h1 className='text-3xl font-bold text-primary'>404</h1>
			</motion.div>

			<p className='text-primary mb-6'>
				Oops! The page you’re looking for doesn’t exist or may have been moved.
			</p>

			<Link
				href='/'
				className='px-6 py-2 rounded-xl bg-secondary text-primary font-medium transition-transform transform hover:scale-105 active:scale-95'>
				Go Home
			</Link>
		</div>
	);
}
