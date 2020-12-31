import { HttpHeaders } from '@angular/common/http';

export const getHeaders = () => {
	let headers = new HttpHeaders();
	headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
	return headers;
};

export const isAssistant = () => {
	const userData = atob(localStorage.getItem('data'));
	return userData.split(';')[0].split(':')[1] == 'false' ? false : true;
};


export const getLoggedInUserEmail = () => {
	const userdata = atob(localStorage.getItem('data'));
	if(userdata)
		return userdata.split(';')[1].split(':')[1];
	return '';
};

export const getTodayDate = () => {
	const date = new Date();
	const m = date.getMonth() + 1;
	const y = date.getFullYear();
	const d = date.getDate();

	return `${d}/${m}/${y}`; //dd/mm/yyyy
}

export const getTodayDateWithoutsplit = () => {
	const date = new Date();
	const m = date.getMonth() + 1;
	const y = date.getFullYear();
	const d = date.getDate();

	return `${d}${m}${y}`; //ddmmyyyy
}