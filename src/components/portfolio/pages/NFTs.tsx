import { usePortfolioStore } from '@/store/portfolioStore';
import NFTCard from '../UI/NFTCard';

export default function NFTs() {
	const { nfts } = usePortfolioStore();

	return (
		<section className='mt-10 p-6 w-full'>
			<div className='flex  justify-between items-center mb-6'>
				<h2 className='text-2xl sm:text-3xl font-bold text-primary'>NFTs</h2>
				<p className='text-xs sm:text-sm text-secondary'>Collection overview</p>
			</div>

			{/* Responsive Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-3  gap-4 sm:gap-6'>
				{nfts.map((nft, i) => (
					<NFTCard
						key={i}
						name={nft.name}
						image={nft.image}
						collection={nft.collection}
						estValue={nft.estValue}
					/>
				))}
			</div>
		</section>
	);
}
