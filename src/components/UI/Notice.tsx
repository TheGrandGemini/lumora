export default function Notice() {
	return (
		<div className='w-full overflow-hidden  bg-base py-2'>
			<div className='whitespace-nowrap'>
				<p className='animate-scroll inline-block text-xs text-secondary'>
					⚙️ This dashboard is running in mock mode,real data unavailable due to
					missing API access. &nbsp;&nbsp;|&nbsp;&nbsp; ⚡ Data will be live
					once an API endpoint becomes available. &nbsp;&nbsp;|&nbsp;&nbsp; 🚧
					All stats are simulated for preview purposes only.
				</p>
			</div>
		</div>
	);
}
