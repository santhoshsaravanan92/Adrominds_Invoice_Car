import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { PersonalInformation } from "../models/personalinformation";
import { AssistantInformation } from "../models/assistantinformation";
import { UrlMappers } from "../helpers/urlmappers";
import {
  getHeaders,
  isAssistant,
  getLoggedInUserEmail,
} from "../helpers/utilities";

@Injectable()
export class ProfileService {
  email: string = "";
  constructor(private http: HttpClient) {}

  getProfileInformation(email: string): Observable<any> {
    const url = UrlMappers.getProfile + "?username=" + email;
    return this.http
      .get<any>(url, { headers: getHeaders() })
      .pipe(
        map((profile) => {
          return profile;
        }),
        catchError((err) => {
          console.log(err);
          throw err;
        })
      );
  }

  updateProfileInformation(
    profileData: PersonalInformation
  ): Observable<PersonalInformation> {
    const content = {
      Name: profileData.Name,
      Mobile: profileData.Mobile,
      Email: profileData.Email,
      Address: profileData.Address,
      GST: profileData.GST,
      Company: profileData.Company,
      Landline: profileData.Landline,
      Website: profileData.Website,
      AccountNumber: profileData.AccountNumber,
      Bankname: profileData.Bankname,
      Branchname: profileData.Branchname,
      Ifsc: profileData.Ifsc,
    };
    return this.http
      .post<PersonalInformation>(UrlMappers.updateProfile, content, {
        headers: getHeaders(),
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((e) => {
          throw e;
        })
      );
  }

  updatePassword(newPassword: string, oldPassword: string): Observable<any> {
    const content = {
      username: getLoggedInUserEmail(),
      newpassword: newPassword,
      oldpassword: oldPassword,
    };
    return this.http
      .post<any>(UrlMappers.updateProfilePassword, content, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          throw e;
        })
      );
  }

  // getAssistantInformation(email: string): Observable<any> {
  //   const url = UrlMappers.getAssistantProfile + email;
  //   return this.http
  //     .get<any>(url, { headers: getHeaders() })
  //     .pipe(
  //       map((a) => {
  //         return a;
  //       }),
  //       catchError((e) => {
  //         throw e;
  //       })
  //     );
  // }

  // addAssistantInformation(asstInfo: AssistantInformation): Observable<any> {
  //   const content = {
  //     MasterEmail: asstInfo.MasterEmail,
  //     Password: asstInfo.Password,
  //     UserName: asstInfo.UserName,
  //     IsDashboard_read: asstInfo.IsDashboard_read,
  //     IsDashboard_write: asstInfo.IsDashboard_write,
  //     IsDashboard_update: asstInfo.IsDashboard_update,
  //     IsDashboard_delete: asstInfo.IsDashboard_delete,
  //     IsPlots_read: asstInfo.IsPlots_read,
  //     IsPlots_write: asstInfo.IsPlots_write,
  //     IsPlots_update: asstInfo.IsPlots_update,
  //     IsPlots_delete: asstInfo.IsPlots_delete,
  //     IsExecutives_read: asstInfo.IsExecutives_read,
  //     IsExecutives_write: asstInfo.IsExecutives_write,
  //     IsExecutives_update: asstInfo.IsExecutives_update,
  //     IsExecutives_delete: asstInfo.IsExecutives_delete,
  //     IsSales_read: asstInfo.IsSales_read,
  //     IsSales_write: asstInfo.IsSales_write,
  //     IsSales_update: asstInfo.IsSales_update,
  //     IsSales_delete: asstInfo.IsSales_delete,
  //     IsReports_read: asstInfo.IsReports_read,
  //     IsReports_write: asstInfo.IsReports_write,
  //     IsReports_update: asstInfo.IsReports_update,
  //     IsReports_delete: asstInfo.IsReports_delete,
  //     IsCustomers_read: asstInfo.IsCustomers_read,
  //     IsCustomers_write: asstInfo.IsCustomers_write,
  //     IsCustomers_update: asstInfo.IsCustomers_update,
  //     IsCustomers_delete: asstInfo.IsCustomers_delete,
  //   };

  //   return this.http
  //     .post<AssistantInformation>(UrlMappers.addAssistantProfile, content, {
  //       headers: getHeaders(),
  //     })
  //     .pipe(
  //       map((a) => {
  //         return a;
  //       }),
  //       catchError((e) => {
  //         return e;
  //       })
  //     );
  // }

  // deleteAssistantRecord(
  //   masterEmail: string,
  //   userName: string
  // ): Observable<any> {
  //   const url = UrlMappers.deleteSlaveDetails + masterEmail + "/" + userName;
  //   return this.http.delete(url, { headers: getHeaders() }).pipe(
  //     map((a) => {
  //       return a;
  //     }),
  //     catchError((e) => {
  //       throw e;
  //     })
  //   );
  // }

  // getAssistantRecordById(email: string): Observable<any> {
  //   const url = UrlMappers.getAssistantProfileById + email;
  //   return this.http
  //     .get<any>(url, { headers: getHeaders() })
  //     .pipe(
  //       map((a) => {
  //         return a;
  //       }),
  //       catchError((e) => {
  //         throw e;
  //       })
  //     );
  // }

  // updateAssistantRecordById(asstInfo: AssistantInformation): Observable<any> {
  //   const content = {
  //     MasterEmail: asstInfo.MasterEmail,
  //     UserName: asstInfo.UserName,
  //     IsDashboard_read: asstInfo.IsDashboard_read,
  //     IsDashboard_write: asstInfo.IsDashboard_write,
  //     IsDashboard_update: asstInfo.IsDashboard_update,
  //     IsDashboard_delete: asstInfo.IsDashboard_delete,
  //     IsPlots_read: asstInfo.IsPlots_read,
  //     IsPlots_write: asstInfo.IsPlots_write,
  //     IsPlots_update: asstInfo.IsPlots_update,
  //     IsPlots_delete: asstInfo.IsPlots_delete,
  //     IsExecutives_read: asstInfo.IsExecutives_read,
  //     IsExecutives_write: asstInfo.IsExecutives_write,
  //     IsExecutives_update: asstInfo.IsExecutives_update,
  //     IsExecutives_delete: asstInfo.IsExecutives_delete,
  //     IsSales_read: asstInfo.IsSales_read,
  //     IsSales_write: asstInfo.IsSales_write,
  //     IsSales_update: asstInfo.IsSales_update,
  //     IsSales_delete: asstInfo.IsSales_delete,
  //     IsReports_read: asstInfo.IsReports_read,
  //     IsReports_write: asstInfo.IsReports_write,
  //     IsReports_update: asstInfo.IsReports_update,
  //     IsReports_delete: asstInfo.IsReports_delete,
  //     IsCustomers_read: asstInfo.IsCustomers_read,
  //     IsCustomers_write: asstInfo.IsCustomers_write,
  //     IsCustomers_update: asstInfo.IsCustomers_update,
  //     IsCustomers_delete: asstInfo.IsCustomers_delete,
  //   };

  //   return this.http
  //     .put<string>(
  //       UrlMappers.updateAssistantProfile + asstInfo.UserName,
  //       content,
  //       {
  //         headers: getHeaders(),
  //       }
  //     )
  //     .pipe(
  //       map((a) => {
  //         return a;
  //       }),
  //       catchError((e) => {
  //         throw e;
  //       })
  //     );
  // }

  uploadImage(imageFile): Observable<any> {
    const url = UrlMappers.uploadImage;
    let formData = new FormData();
    if (!isAssistant()) this.email = getLoggedInUserEmail();
    const name = this.email + ".jpg";
    formData.append("logo", imageFile[0], name);

    return this.http
      .post<File>(url + "/" + this.email, formData, { headers: getHeaders() })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          throw e;
        })
      );
  }

  getImage(imageName) {
    const url = UrlMappers.downloadImage + "?imagename=" + "download.jpg";
    return this.http
      .post<any>(url, "", { responseType: "blob" as "json" })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          throw e;
        })
      );
  }

  updateAssistantPassword(
    newPassword: string,
    oldPassword: string
  ): Observable<any> {
    const content = {
      username: getLoggedInUserEmail(),
      newpassword: newPassword,
      oldpassword: oldPassword,
    };
    return this.http
      .post<any>(UrlMappers.updateProfilePassword, content, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          throw e;
        })
      );
  }
}
