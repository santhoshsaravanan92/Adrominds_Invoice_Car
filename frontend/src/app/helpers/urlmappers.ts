import { environment } from '../../environments/environment';

export module UrlMappers {
	const baseUrl = environment.baseurl;
	export const loginUrl = baseUrl + '/api/auth/signin';
	export const resetPasswordUrl = baseUrl + '/api/auth/forgetpassword';
	export const forgetpasswordcheck = baseUrl + '/api/auth/forgetpasswordcheck';
	export const getProfile = baseUrl + '/api/profile/getprofileinfo';
	export const updateProfile = baseUrl + '/api/Profile/updateprofileinfo';
	export const updateProfilePassword = baseUrl + '/api/auth/updatepassword';
	export const uploadImage = baseUrl + '/api/Profile/uploadlogo';
	// export const addAssistantProfile = baseUrl + '/api/assistant/add';
	// export const getAssistantProfile = baseUrl + '/api/assistant/getallassistants/';
	// export const getAssistantProfileById = baseUrl + '/api/assistant/getassistantdetailsbyid/';
	// export const updateAssistantProfile = baseUrl + '/api/assistant/updateassistantdetailsbyid/';
	// export const deleteSlaveDetails = baseUrl + '/api/assistant/delete/';
	export const downloadImage = baseUrl + '/api/Profile/DownloadImage';
	export const addCustomer = baseUrl + '/api/customer/addcustomer';
	export const getAllCustomer = baseUrl + '/api/customer/getallcustomer/';
	export const getCustomerById = baseUrl + '/api/customer//getCustomerById/';
	export const updateCustomer = baseUrl + '/api/customer/updatecustomer';
}
