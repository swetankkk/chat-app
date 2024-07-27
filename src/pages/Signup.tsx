import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login: loginUser } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState<string>('');
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await register(username, email, password);
			loginUser(response.data.user);
			localStorage.setItem('jwt', response.data.jwt);
			navigate('/home');
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unknown error occurred');
			}
			//console.error(error);
		}
	};
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-black '>
			<div className='flex flex-col items-center justify-center gap-4'>
				<h1 className='text-3xl font-bold text-white'>Let's Chat</h1>
				<form
					className='flex flex-col items-center justify-center gap-4'
					onSubmit={handleSubmit}
				>
					<div className='flex flex-col items-center justify-center gap-2'>
						<input
							type='text'
							id='username'
							placeholder='Your username'
							className=' rounded-md p-2 w-64'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className='flex flex-col items-center justify-center gap-2'>
						<input
							type='email'
							id='email'
							placeholder='Your email'
							className=' rounded-md p-2 w-64'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='flex flex-col items-center justify-center gap-2'>
						<input
							type='password'
							id='password'
							placeholder='Your password'
							className=' rounded-md p-2 w-64'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{error && <div className='text-red-500'>{error}</div>}

					<Button className='bg-blue-500 w-64 hover:bg-blue-600'>Signup</Button>
				</form>
				<div className='text-white'>
					Already Have an Account? <Link to={`/login`}>LogIn</Link>
				</div>
			</div>
		</div>
	);
}
