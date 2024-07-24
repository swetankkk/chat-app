import './App.css';
import { Link } from 'react-router-dom';

function App() {
	return (
		<>
			<div>Welcome to Chat App</div>
			<Link to={`login`}>Login</Link>
		</>
	);
}

export default App;
