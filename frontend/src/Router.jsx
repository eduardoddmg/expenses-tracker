import { Home, Login, Register } from './pages';
import { Routes, Route } from 'react-router-dom';

export default function Router() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</>
	)
}