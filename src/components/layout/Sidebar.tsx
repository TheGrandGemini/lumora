'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, BarChart3, History, Layers, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { CustomConnectButton } from '../UI/CustomConnectButton';

const navItems = [
	{ name: 'Portfolio', icon: PieChart, href: '/' },
	{ name: 'Trade / Swap', icon: BarChart3, href: '/swap' },
	{ name: 'Stake', icon: Layers, href: '/stake' },
	{ name: 'History', icon: History, href: '/history' },
];

interface SidebarProps {
	isOpen?: boolean;
	onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
	const pathname = usePathname();

	return (
		<>
			{/* ===== Desktop Sidebar ===== */}
			<aside className='hidden lg:flex flex-col fixed left-0 top-0 h-screen w-56 bg-base border-r border-border p-4 z-30'>
				{/* Logo / Brand */}
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-lg font-bold text-primary'>Lumora</h1>
				</div>

				{/* Navigation */}
				<nav className='flex flex-col gap-3 flex-1'>
					{navItems.map(({ name, icon: Icon, href }) => {
						const active = pathname === href;
						return (
							<Link
								key={name}
								href={href}
								className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 text-[15px] font-medium ${
									active
										? 'text-secondary bg-accent/70'
										: 'text-primary hover:text-secondary hover:bg-hover/10'
								}`}>
								<Icon size={20} />
								<span>{name}</span>
							</Link>
						);
					})}
				</nav>

				{/* Connect Button */}
				<div className='mt-auto pt-4 border-t border-border'>
					<CustomConnectButton />
				</div>
			</aside>

			{/* ===== Mobile Sidebar (Slide-In) ===== */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='fixed inset-0 bg-black/50 z-40 lg:hidden'
							onClick={onClose}
						/>

						{/* Drawer */}
						<motion.aside
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ type: 'tween', duration: 0.3 }}
							className='fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-base border-r border-border z-50 p-4 shadow-xl flex flex-col'>
							{/* Header */}
							<div className='flex justify-between items-center mb-6'>
								<h2 className='text-lg font-semibold text-primary'>Menu</h2>
								<button
									onClick={onClose}
									className='p-2 rounded-lg hover:bg-hover transition'>
									<X size={20} />
								</button>
							</div>

							{/* Navigation Links */}
							<nav className='flex flex-col gap-2 flex-1'>
								{navItems.map(({ name, icon: Icon, href }) => {
									const active = pathname === href;
									return (
										<Link
											key={name}
											href={href}
											onClick={onClose}
											className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-200 text-sm ${
												active
													? 'bg-hover/20 text-secondary'
													: 'text-primary hover:text-secondary hover:bg-hover/10'
											}`}>
											<Icon size={18} />
											<span>{name}</span>
										</Link>
									);
								})}
							</nav>

							{/* Connect Button */}
							<div className='mt-auto pt-4 border-t border-border'>
								<CustomConnectButton />
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
