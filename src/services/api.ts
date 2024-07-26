import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Replace with your Strapi API URL

export const login = async (identifier: string, password: string) => {
	return await axios.post(`${API_URL}/auth/local`, { identifier, password });
};

export const register = async (
	username: string,
	email: string,
	password: string
) => {
	return await axios.post(`${API_URL}/auth/local/register`, {
		username: username,
		email: email,
		password: password,
	});
};

export const getUser = async () => {
	const token = localStorage.getItem('jwt');
	if (!token) throw new Error('No token found');
	return await axios.get(`${API_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
