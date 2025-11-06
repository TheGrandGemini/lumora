import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { Inter, Space_Grotesk, DM_Mono } from 'next/font/google';
import { Web3Provider } from '@/Providers/web3-providers';
import { WalletSync } from '@/store/WalletSync';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-space-grotesk',
	display: 'swap',
});

const dmMono = DM_Mono({
	subsets: ['latin'],
	variable: '--font-dm-mono',
	weight: ['400'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: {
		default: 'Lumora — Portfolio Tracker',
		template: '%s | Lumora',
	},
	description:
		'Track your on-chain assets across multiple networks in real-time with Lumora. Designed for Web3 users who want clarity, insights, and control over their portfolio.',
	keywords: [
		'Lumora',
		'Crypto portfolio tracker',
		'Web3 portfolio',
		'Blockchain analytics',
		'Token tracker',
		'DeFi dashboard',
		'Crypto assets',
		'Wallet analytics',
	],
	authors: [{ name: 'The Grand Gemini' }],
	creator: 'The Grand Gemini',
	metadataBase: new URL('https://lumora.xyz'), // change to your actual domain
	openGraph: {
		title: 'Lumora — Track Your Web3 Portfolio Effortlessly',
		description:
			'Visualize and manage your on-chain assets in one place. Lumora gives you clarity, real-time updates, and full Web3 transparency.',
		url: 'https://lumora.xyz',
		siteName: 'Lumora',
		images: [
			{
				url: '/Preview.png',
				width: 1200,
				height: 630,
				alt: 'Lumora Portfolio Tracker Preview',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Lumora — Portfolio Tracker for Web3 Users',
		description:
			'Track your on-chain assets across multiple networks in real-time with Lumora.',
		creator: '@0xgemini0',
		images: ['/og-image.png'],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	manifest: '/site.webmanifest',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			suppressHydrationWarning>
			<body
				className={`${inter.variable} ${spaceGrotesk.variable} ${dmMono.variable} antialiased`}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					<Web3Provider>
						<WalletSync />
						{children}
					</Web3Provider>
				</ThemeProvider>
			</body>
		</html>
	);
}
