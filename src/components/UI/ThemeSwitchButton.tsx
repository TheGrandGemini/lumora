// 'use client';

// import { useEffect, useState } from 'react';
// import { useTheme } from 'next-themes';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sun, Moon } from 'lucide-react'; // or use react-icons if lucide fails

// export default function ThemeSwitchButton() {
// 	const [mounted, setMounted] = useState(false);
// 	const { theme, setTheme } = useTheme();

// 	// Avoid hydration mismatch
// 	useEffect(() => {
// 		queueMicrotask(() => setMounted(true));
// 	}, []);
// 	if (!mounted) return null;

// 	const isDark = theme === 'dark';

// 	return (
// 		<motion.button
// 			onClick={() => setTheme(isDark ? 'light' : 'dark')}
// 			whileHover={{ scale: 1.2 }}
// 			whileTap={{ scale: 0.9 }}
// 			className='relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-100'
// 			aria-label='Toggle theme'>
// 			<AnimatePresence
// 				exitBeforeEnter={true}
// 				initial={false}>
// 				<motion.div
// 					key={isDark ? 'dark' : 'light'}
// 					initial={{ y: -10, opacity: 0 }}
// 					animate={{ y: 0, opacity: 1 }}
// 					exit={{ y: 10, opacity: 0 }}
// 					transition={{ duration: 0.25 }}>
// 					{isDark ? (
// 						<Sun
// 							size={20}
// 							className='text-yellow-400'
// 						/>
// 					) : (
// 						<Moon
// 							size={20}
// 							className='text-blue-500'
// 						/>
// 					)}
// 				</motion.div>
// 			</AnimatePresence>
// 		</motion.button>
// 	);
// }

'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitchButton() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	// Avoid hydration mismatch
	useEffect(() => {
		queueMicrotask(() => setMounted(true));
	}, []);
	if (!mounted) return null;

	const isDark = theme === 'dark';

	// 🌗 Handle theme toggle + flash animation
	const handleThemeToggle = () => {
		const html = document.documentElement;
		html.classList.add('theme-flash');
		setTimeout(() => html.classList.remove('theme-flash'), 600); // remove after animation
		setTheme(isDark ? 'light' : 'dark');
	};

	return (
		<motion.button
			onClick={handleThemeToggle}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			className='relative flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-100'
			aria-label='Toggle theme'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={isDark ? 'dark' : 'light'}
					initial={{ y: -10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 10, opacity: 0 }}
					transition={{ duration: 0.25 }}>
					{isDark ? (
						<Sun
							size={20}
							className='text-yellow-400'
						/>
					) : (
						<Moon
							size={20}
							className='text-blue-500'
						/>
					)}
				</motion.div>
			</AnimatePresence>
		</motion.button>
	);
}
