import Main from '@/components/Main';
import Header from '@/components/layout/Header';
import Notice from '@/components/UI/Notice';

export default function Home() {
	return (
		<div className='flex-1 bg-base min-h-screen  flex flex-col lg:ml-56 '>
			<Header />
			<Main />
			<Notice />
		</div>
	);
}
