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
    return this.http
      .get<any>(
        UrlMappers.getExpenseDashboardDetails +
          getLoggedInUserEmail() +
          "/" +
          from +
          "/" +
          to,
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
