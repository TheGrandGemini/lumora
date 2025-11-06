import PerformanceChart from '../UI/PerfomanceChart';
import AssetTable from '../UI/AssetsTable';

export default function Tokens() {
	return (
		<section className='w-full'>
			<PerformanceChart />
			<AssetTable />
		</section>
	);
}
