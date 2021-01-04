import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UrlMappers } from "src/app/helpers/urlmappers";
import { getHeaders, getLoggedInUserEmail } from "src/app/helpers/utilities";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getExpenseDashboardDetails(from: string, to: string) {
    const content = { fromDate: from, toDate: to };
    return this.http
      .post<any>(
        UrlMappers.getExpenseDashboardDetails + getLoggedInUserEmail(),
        content,
        {
          headers: getHeaders(),
        }
      )
      .pipe(
        map((a) => {
          return a;
        }),
        catchError((e) => {
          return e;
        })
      );
  }

  getinvoiceDashboardDetails(from: string, to: string) {
    const content = { fromDate: from, toDate: to };
    return this.http
      .post<any>(
        UrlMappers.getInvoiceDashboardDetails + getLoggedInUserEmail(),
        content,
        {
          headers: getHeaders(),
        }
      )
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
