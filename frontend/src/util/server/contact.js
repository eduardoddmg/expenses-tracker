import axios from 'axios';
import { API_URI } from '../variables.jsx';

export async function getContacts(token) {
	try {
		const contacts = await axios.get(
			`${API_URI}/api/contact/readContact`, { headers: { 'x-access-token': token } }
		);
		return contacts;
	} catch (error) {
		return error;
	}
};

export async function createContact(data, token) {
	try {
		const contact = await axios.post(
			`${API_URI}/api/contact/createContact`,
			data,
			{ headers: { 'x-access-token': token } }
		);
		return contact;
	} catch (error) {
		return error;
	}
};

export async function updateContact(data, token) {
	try {
		const contact = await axios.put(
			`${API_URI}/api/contact/updateContact`,
			data,
			{ headers: { 'x-access-token': token } }
		);
		return contact;
	} catch (error) {
		return error;
	}
};

export async function deleteContact(data, token) {
	try {
		const contact = await axios.delete(
			`${API_URI}/api/contact/deleteContact?idContact=${data._id}`, { headers: { 'x-access-token': token } }
		);
		return contact;
	} catch (error) {
		return error;
	}
};