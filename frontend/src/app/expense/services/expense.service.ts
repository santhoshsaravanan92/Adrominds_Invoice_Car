import { Injectable } from "@angular/core";
import { UrlMappers } from "src/app/helpers/urlmappers";
import { getHeaders } from "src/app/helpers/utilities";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ExpenseInformation } from "../models/expense.model";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  addExpense(expenseObj: ExpenseInformation): Observable<any> {
    return this.http
      .post<ExpenseInformation>(UrlMappers.addExpense, expenseObj, {
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

  getAllExpenses(email: string): Observable<ExpenseInformation[]> {
    return this.http
      .get<any>(UrlMappers.addExpense,  {
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
