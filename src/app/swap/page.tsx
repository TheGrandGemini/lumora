import SwapBox from './UI/SwapBox';

export default function SwapPage() {
	return (
		<main className='sm:ml-56  mt-28 flex flex-col gap-12 justify-center items-center'>
			<h1 className=' font-bold text-center text-primary text-4xl sm:text-5xl'>
				Swap seamlessly, without hiccups
			</h1>
			<SwapBox />
		</main>
	);
}
