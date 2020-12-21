import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  InvoiceInformation,
  ProductInformation,
} from "../models/invoice-models";
import { Observable } from "rxjs";
import { UrlMappers } from "src/app/helpers/urlmappers";
import { getHeaders } from "src/app/helpers/utilities";
import { catchError, map } from "rxjs/operators";
import { InvoiceFiltersComponent } from '../invoice-filters/invoice-filters.component';
import { InvoicFilter } from '../models/invoic-filter.model';

@Injectable({
  providedIn: "root",
})
export class InvoiceServiceService {
  constructor(private http: HttpClient) { }

  addInvoice(invoiceObj: InvoiceInformation): Observable<any> {
    const content = {
      sgst: invoiceObj.sgst,
      cgst: invoiceObj.cgst,
      amount: invoiceObj.amount,
      amountwithdiscount: invoiceObj.amountwithdiscount,
      discount: invoiceObj.discount,
      discount_option: invoiceObj.discount_option,
      InvoiceId: invoiceObj.InvoiceId,
      Dated: invoiceObj.Dated,
      BuyerOrderNumber: invoiceObj.BuyerOrderNumber,
      DeliveryNotes: invoiceObj.DeliveryNotes,
      Email: invoiceObj.Email,
      Name: invoiceObj.Name,
      VehicleNumber: invoiceObj.VehicleNumber,
      km: invoiceObj.km,
      mode: invoiceObj.mode,
      model: invoiceObj.model,
      otherNotes: invoiceObj.otherNotes,
    };
    return this.http
      .post<InvoiceInformation>(UrlMappers.addInvoice, content, {
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

  addInvoiceProducts(invoiceObj: ProductInformation[]): Observable<any> {
    return this.http
      .post<InvoiceInformation>(UrlMappers.addInvoiceProduct, invoiceObj, {
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

  getCustomerNames(enteredname: string): Observable<any> {
    return this.http
      .get<any>(UrlMappers.getCustomerNames + enteredname, {
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

  getDateForReports(invoioceFilterData: InvoicFilter): Observable<InvoiceInformation[]> {
    return this.http
      .post<any>(UrlMappers.getinvoiceReportsData, invoioceFilterData, {
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

  getAllInvoices(email: string): Observable<InvoiceInformation[]> {
    return this.http
      .get<any>(UrlMappers.getAllInvoices + email, {
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

  deleteInvoice(id:string){
    return this.http
      .delete<any>(UrlMappers.deleteInvoice + id, {
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

  getInvoiceById(id: string): Observable<any> {
    return this.http
      .get<any>(UrlMappers.getInvoiceById + id, {
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

  getInvoiceProductById(id: string): Observable<ProductInformation[]> {
    return this.http
      .get<any>(UrlMappers.getInvoiceProductById + id, {
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

  updateInvoice(invoiceObj: InvoiceInformation): Observable<any> {
    const content = {
      sgst: invoiceObj.sgst,
      cgst: invoiceObj.cgst,
      amount: invoiceObj.amount,
      amountwithdiscount: invoiceObj.amountwithdiscount,
      discount: invoiceObj.discount,
      discount_option: invoiceObj.discount_option,
      InvoiceId: invoiceObj.InvoiceId,
      Dated: invoiceObj.Dated,
      BuyerOrderNumber: invoiceObj.BuyerOrderNumber,
      DeliveryNotes: invoiceObj.DeliveryNotes,
      Email: invoiceObj.Email,
      Name: invoiceObj.Name,
      VehicleNumber: invoiceObj.VehicleNumber,
      km: invoiceObj.km,
      mode: invoiceObj.mode,
      model: invoiceObj.model,
      otherNotes: invoiceObj.otherNotes,
    };
    return this.http
      .post<InvoiceInformation>(UrlMappers.updateInvoice, content, {
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

  updateInvoiceProducts(invoiceObj: ProductInformation[]): Observable<any> {
    return this.http
      .post<InvoiceInformation>(UrlMappers.updateInvoiceProducts, invoiceObj, {
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
