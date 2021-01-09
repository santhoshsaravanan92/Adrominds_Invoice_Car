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
      .get<any>(UrlMappers.getAllExpense + email, {
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

  deleteExpense(id): Observable<any> {
    const content = {
      id: id,
    };
    return this.http
      .post<object>(UrlMappers.deleteExpense, content, {
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

  getExpensesById(id: string): Observable<any> {
    return this.http
      .get<any>(UrlMappers.getExpenseByid + id, {
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

  updateExpenseById(expenseObj: ExpenseInformation): Observable<any> {
    return this.http
      .post<ExpenseInformation>(UrlMappers.updateExpense, expenseObj, {
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

  getExpenseDetailsForFilter(
    category: string,
    fromdate: string,
    todate: string
  ): Observable<any[]> {
    const content = {
      category: category,
      fromdate: fromdate,
      todate: todate,
    };

    return this.http
      .post<any>(UrlMappers.getExpenseDetailsForFiler, content, {
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
