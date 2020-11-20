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
