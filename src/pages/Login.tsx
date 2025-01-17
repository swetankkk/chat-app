import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const { login: loginUser } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState<string>('');
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await login(identifier, password);
			loginUser(response.data.user);
			localStorage.setItem('jwt', response.data.jwt);
			navigate('/home');
		} catch (error: any) {
			//console.error('error :', error);
			setError(error.response.data.error.message);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-screen bg-black text-white'>
			<div className='flex flex-col items-center justify-center gap-4'>
				<h1 className='text-3xl font-bold'>Let's Chat</h1>
				<form
					className='flex flex-col items-center justify-center gap-4'
					onSubmit={handleSubmit}
				>
					<div className='flex flex-col items-center justify-center gap-2'>
						<input
							type='email'
							id='email'
							placeholder='Your email'
							className='  rounded-md p-2 w-64 text-black'
							value={identifier}
							onChange={(e) => setIdentifier(e.target.value)}
						/>
					</div>
					<div className='flex flex-col items-center justify-center gap-2'>
						<input
							type='password'
							id='password'
							placeholder='Your password'
							className='rounded-md p-2 w-64 text-black'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && <div className='text-red-500'>{error}</div>}
					<Button className='bg-blue-500 w-64 hover:bg-blue-600'>Login</Button>
				</form>
				<div>
					Don't Have an Account? <Link to={`/signup`}>SignUp</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
