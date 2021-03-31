import { HttpHeaders } from "@angular/common/http";

export const getHeaders = () => {
  let headers = new HttpHeaders();
  headers = headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  return headers;
};

export const isAssistant = () => {
  const userData = atob(localStorage.getItem("data"));
  return userData.split(";")[0].split(":")[1] == "false" ? false : true;
};

export const getLoggedInUserEmail = () => {
  const userdata = atob(localStorage.getItem("data"));
  if (userdata) return userdata.split(";")[1].split(":")[1];
  return "";
};

export const getTodayDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const m = month < 10 ? `0${month}` : month;
  const y = date.getFullYear();
  const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${d}/${m}/${y}`; //dd/mm/yyyy
};

export const getTodayDateWithoutsplit = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const m = month < 10 ? `0${month}` : month;
  const y = date.getFullYear();
  const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${d}${m}${y}`; //ddmmyyyy
};

export const print = (printContent, customerName) => {
  var WinPrint = window.open(
    "",
    "",
    "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
  );
  WinPrint.document.write(printContent);
  WinPrint.document.close();
  WinPrint.setTimeout(function () {
    WinPrint.focus();
    WinPrint.document.title = `${customerName}_${getTodayDate()}`;
    WinPrint.print();
    WinPrint.close();
  }, 1000);
};

export const getDateddmmyyyyformat = (d) => {
  //2021-01-06
  console.log('Date');
  console.log(d);
  const date = d.toString().split('-')
  return `${date[2]}/${date[1]}/${date[0]}`; //dd/mm/yyyy
};