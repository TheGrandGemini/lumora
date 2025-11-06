import { create } from 'zustand';

export type HistoryType = 'Receive' | 'Send' | 'Trade';

export interface HistoryItem {
	id: string; // unique ID
	type: HistoryType;
	token: string;
	tokenIcon: string;
	amount: number;
	value: number;
	time: string; // e.g., '11:20pm'
	date: string; // e.g., 'October 31st, 2025'
	address: string;
	exchange?: string; // for trades
	toToken?: string;
	toTokenIcon?: string;
	toAmount?: number;
	toValue?: number;
}

interface HistoryState {
	history: HistoryItem[];
	filter: 'all' | 'receive' | 'send' | 'trade';
	setHistory: (data: HistoryItem[]) => void;
	addHistory: (item: HistoryItem) => void;
	setFilter: (filter: 'all' | 'receive' | 'send' | 'trade') => void;
	clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
	history: [
		{
			id: '1',
			type: 'Receive',
			token: 'BNB',
			tokenIcon: '/icons/bnb.png',
			amount: 1.344,
			value: 5056.128,
			time: '11:20pm',
			date: 'October 31st, 2025',
			address: 'Wallet address',
		},
		{
			id: '2',
			type: 'Send',
			token: 'Ethereum',
			tokenIcon: '/icons/Ethereum.png',
			amount: 1.344,
			value: 5056.128,
			time: '11:20pm',
			date: 'October 31st, 2025',
			address: 'Wallet address',
		},
		{
			id: '3',
			type: 'Trade',
			token: 'Ethereum',
			tokenIcon: '/icons/Ethereum.png',
			amount: 1.344,
			value: 5056.128,
			time: '11:20pm',
			date: 'October 31st, 2025',
			address: 'Uniswap',
			exchange: 'UNISWAP',
			toToken: 'Bitcoin',
			toTokenIcon: '/icons/Bitcoin.png',
			toAmount: 0.02,
			toValue: 5026.578,
		},
	],
	filter: 'all',
	setHistory: (data) => set({ history: data }),
	addHistory: (item) => set((state) => ({ history: [item, ...state.history] })),
	setFilter: (filter) => set({ filter }),
	clearHistory: () => set({ history: [] }),
}));
