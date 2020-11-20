import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UrlMappers } from '../helpers/urlmappers';

@Injectable()
export class AuthenticationService {
	constructor(private http: HttpClient, private router: Router) {}

	login(username: string, password: string): Observable<any> {
		const content = {
			username: username,
			password: password,
		};
		return this.http.post<any>(UrlMappers.loginUrl, content).pipe(
			map((data) => {
				return data;
			}),
			catchError((e) => {
				console.log(e);
				throw e;
			})
		);
	}

	public get getLoggedInStatus() {
		return localStorage.getItem('token') !== null ? true : false;
	}

	logout() {
		localStorage.clear();
		this.router.navigateByUrl('/login');
	}

	forgetPasswordCheck(username: string): Observable<string> {
		return this.http
			.post<string>(UrlMappers.forgetpasswordcheck, { username: username })
			.pipe(
				map((data) => {
					return data;
				}),
				catchError((err) => {
					console.error(err);
					throw err;
				})
			);
	}
}
