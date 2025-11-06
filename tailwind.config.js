/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class', // enables .dark on <html>
	theme: {
		extend: {
			colors: {
				// Light mode
				base: '#F5F7FA',
				surface: '#FFFFFF',
				primary: '#0F172A',
				secondary: '#475569',
				accent: '#3B82F6',
				border: '#CBD5E1',
				hover: '#EFF6FF',
				success: '#22C55E',
				warning: '#FB923C',
				error: '#EF4444',

				// Dark mode
				'dark-base': '#0B0F19',
				'dark-surface': '#111827',
				'dark-primary': '#E2E8F0',
				'dark-secondary': '#94A3B8',
				'dark-border': '#1E293B',
				'dark-hover': '#1E3A8A',
			},
			fontFamily: {
				body: ['var(--font-inter)', 'sans-serif'],
				heading: ['var(--font-space-grotesk)', 'sans-serif'],
				number: ['var(--font-dm-mono)', 'monospace'],
				// ...existing font families
			},
			keyframes: {
				scroll: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			},
			animation: {
				scroll: 'scroll 25s linear infinite',
			},
		},
	},
	plugins: [],
};
