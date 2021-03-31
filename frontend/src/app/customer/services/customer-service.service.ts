import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CustomerInformation } from "../models/customer-model";
import { Observable } from "rxjs";
import { getHeaders } from "src/app/helpers/utilities";
import { UrlMappers } from "src/app/helpers/urlmappers";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CustomerServiceService {
  constructor(private http: HttpClient) {}

  addCustomer(customerInfo: CustomerInformation): Observable<any> {
    const content = {
      name: customerInfo.Name,
      address: customerInfo.Address,
      comments: customerInfo.Comments,
      email: customerInfo.Email,
      gst: customerInfo.GST,
      mobile: customerInfo.Mobile,
      ownerEmail: customerInfo.OwnerEmail,
    };

    return this.http
      .post<CustomerInformation>(UrlMappers.addCustomer, content, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  getAllCustomer(email: string): Observable<CustomerInformation[]> {
    return this.http
      .get<any>(UrlMappers.getAllCustomer + email, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  getCustomerById(id: string): Observable<CustomerInformation> {
    return this.http
      .get<any>(UrlMappers.getCustomerById + id, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  updateCustomerById(customerInfo: CustomerInformation): Observable<any> {
    const content = {
      name: customerInfo.Name,
      address: customerInfo.Address,
      comments: customerInfo.Comments,
      email: customerInfo.Email,
      gst: customerInfo.GST,
      mobile: customerInfo.Mobile,
      ownerEmail: customerInfo.OwnerEmail,
      id: customerInfo.id,
    };

    return this.http
      .post<CustomerInformation>(UrlMappers.updateCustomer, content, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  deleteCustomer(id: string) {
    return this.http
      .delete<any>(UrlMappers.deleteCustomer + id, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  isCustomerExists(name: string): Observable<any> {
    return this.http
      .get<any>(UrlMappers.isCustomerExists + name, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  getCustomerByName(name: string): Observable<CustomerInformation> {
    return this.http
      .get<any>(UrlMappers.getCustomerByName + name, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  getCustomerDetailsForFilter(
    name: string,
    number: string
  ): Observable<CustomerInformation[]> {
    const content = {
      name: name,
      number: number,
    };
    
    return this.http
      .post<any>(UrlMappers.getCustomerDetailsForFiler, content, {
        headers: getHeaders(),
      })
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }
}
