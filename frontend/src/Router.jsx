import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import { Routes, Route } from 'react-router-dom';
import { WithAuth, WithoutAuth } from './components';

export default function Router() {
	return (
		<>
			<Routes>
				<Route element={<WithAuth />}>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
				<Route element={<WithoutAuth />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
			</Routes>
		</>
	)
}