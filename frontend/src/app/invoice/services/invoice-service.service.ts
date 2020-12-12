import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InvoiceInformation, ProductInformation } from "../models/invoice-models";
import { Observable } from "rxjs";
import { UrlMappers } from "src/app/helpers/urlmappers";
import { getHeaders } from "src/app/helpers/utilities";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class InvoiceServiceService {
  constructor(private http: HttpClient) {}

  addInvoice(invoiceObj: InvoiceInformation): Observable<any> {
    const content = {
      sgst: invoiceObj.sgst,
      cgst: invoiceObj.cgst,
      amount: invoiceObj.amount,
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
}
