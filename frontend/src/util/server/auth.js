import axios from 'axios';
import { API_URI } from '../variables.jsx';

export async function registerAuth(data) {
	try {
		const resp = await axios.post(`${API_URI}/api/auth/register`, data);
		return resp;
	} catch (err) {
		return err;
	}
};

export async function loginAuth(token) {
	try {
		const resp = await axios.get(`${API_URI}/api/auth/verifyLogin`, { headers: { 'x-access-token': token } });
		return resp;
	} catch (err) {
		return err;
	}
};

export async function loginAuthWithoutToken(data) {
	try {
		const resp = await axios.post(`${API_URI}/api/auth/login`, data);
		return resp;
	} catch (err) {
		return err;
	}
}