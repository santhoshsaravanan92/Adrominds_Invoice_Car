import { environment } from "../../environments/environment";

export module UrlMappers {
  const baseUrl = environment.baseurl;
  export const loginUrl = baseUrl + "/api/auth/signin";
  export const resetPasswordUrl = baseUrl + "/api/auth/forgetpassword";
  export const forgetpasswordcheck = baseUrl + "/api/auth/forgetpasswordcheck";
  export const getProfile = baseUrl + "/api/profile/getprofileinfo";
  export const updateProfile = baseUrl + "/api/Profile/updateprofileinfo";
  export const updateProfilePassword = baseUrl + "/api/auth/updatepassword";
  export const uploadImage = baseUrl + "/api/Profile/uploadlogo";
  export const downloadImage = baseUrl + "/api/Profile/DownloadImage";

  export const addCustomer = baseUrl + "/api/customer/addcustomer";
  export const getAllCustomer = baseUrl + "/api/customer/getallcustomer/";
  export const getCustomerById = baseUrl + "/api/customer/getCustomerById/";
  export const getCustomerByName = baseUrl + "/api/customer/getCustomerByName/";
  export const updateCustomer = baseUrl + "/api/customer/updatecustomer";
  export const deleteCustomer = baseUrl + "/api/customer/deleteCustomer/";
  export const isCustomerExists = baseUrl + "/api/customer/iscustomerexists/";
  export const getCustomerDetailsForFiler = baseUrl + "/api/customer/getCustomerDetailsForFilter";

  export const addInvoice = baseUrl + "/api/invoice/addinvoice";
  export const updateInvoice = baseUrl + "/api/invoice/updateinvoice";
  export const addInvoiceProduct = baseUrl + "/api/invoice/addinvoiceproduct";
  export const updateInvoiceProducts = baseUrl + "/api/invoice/updateinvoiceproduct";
  export const getCustomerNames = baseUrl + "/api/invoice/getCustomerNames/";
  export const getAllInvoices = baseUrl + "/api/invoice/getallinvoices/";
  export const deleteInvoice = baseUrl + "/api/invoice/deleteinvoice/";
  export const getInvoiceById = baseUrl + "/api/invoice/getinvoicebyid/";
  export const getInvoiceProductById = baseUrl + "/api/invoice/getinvoiceproductbyid/";

  export const addExpense = baseUrl + "/api/expense/addexpense";
  export const getAllExpense = baseUrl + "/api/expense/getallexpense/";
  export const updateExpense = baseUrl + "/api/expense/updateexpense";
  export const deleteExpense = baseUrl + "/api/expense/deleteexpense";
  export const getExpenseByid = baseUrl + "/api/expense/getexpensebyid/";
  export const getinvoiceReportsData = baseUrl + "/api/expense/getinvoicereportsdata/";
  export const getExpenseDetailsForFiler = baseUrl + "/api/expense/getExpenseDetailsForFilter";

  export const getExpenseDashboardDetails = baseUrl + "/api/dashboard/getexpensedetails/";
  export const getInvoiceDashboardDetails = baseUrl + "/api/dashboard/getinvoicedetails/";
}
