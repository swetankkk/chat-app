import './App.css';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';

function App() {
	return (
		<div className='bg-black flex flex-col h-dvh w-dvw justify-center text-white'>
			<div>Welcome to Chat App</div>
			<div className='flex justify-center gap-2'>
				<Link to={`login`} className={buttonVariants({ variant: 'secondary' })}>
					Login
				</Link>
				<Link
					to={`signup`}
					className={buttonVariants({ variant: 'secondary' })}
				>
					Signup
				</Link>
			</div>
		</div>
	);
}

export default App;
