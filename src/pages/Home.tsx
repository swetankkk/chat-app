import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Input } from '@/components/ui/input';

const socket = io('http://localhost:1337');

interface Message {
	id: string;
	text: string;
	sender: 'user' | 'other';
}

const Dashboard: React.FC = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState<string>('');
	const messagesEndRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const response = localStorage.getItem('jwt');
		if (!response) {
			navigate('/login');
		}
		socket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		socket.on('message', (message: string) => {
			addMessage(message, 'other');
			//setMessages((prevMessages) => [...prevMessages, message]);
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from WebSocket server');
		});

		return () => {
			socket.off('connect');
			socket.off('message');
			socket.off('disconnect');
		};
	}, []);
	const sendMessage = () => {
		if (input.trim()) {
			socket.send(input);
			addMessage(input, 'user');
			setInput('');
		}
	};
	const addMessage = (text: string, sender: 'user' | 'other') => {
		setMessages((prevMessages) => [
			...prevMessages,
			{ id: Date.now().toString(), text, sender },
		]);
	};
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};
	return (
		<div className='bg-gray-100 h-screen flex flex-col'>
			<header className='bg-black text-white p-4 flex justify-between items-center'>
				<h1 className='text-xl font-bold'>Dashboard</h1>
				<div>
					<span className='mr-4'>Welcome, {user?.username}</span>
					<button
						className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded'
						onClick={logout}
					>
						Logout
					</button>
				</div>
			</header>

			<div className='flex-1 overflow-y-auto p-4'>
				<div className='max-w-2xl mx-auto'>
					{messages.map((msg) => (
						<div
							key={msg.id}
							className={`mb-4 ${
								msg.sender === 'user' ? 'text-right' : 'text-left'
							}`}
						>
							<div
								className={`inline-block p-2 rounded-lg ${
									msg.sender === 'user'
										? 'bg-blue-500 text-white'
										: 'bg-gray-300 text-black'
								}`}
							>
								{msg.text}
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
			</div>

			<div className='bg-white border-t p-4'>
				<div className='max-w-2xl mx-auto flex'>
					<Input
						type='text'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyPress}
						className='flex-1 mr-2'
						placeholder='Type a message...'
					/>
					<button
						onClick={sendMessage}
						className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
