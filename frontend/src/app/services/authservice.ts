
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  // Register
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { username, password });
  }

  // Login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { username, password }).pipe(
      tap((res: any) => {
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
        }
      })
    );
  }

  // Logout
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Get Access Token
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // Refresh Token
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return of(null);

    return this.http.post(`${this.API_URL}/refresh`, { refreshToken }).pipe(
      tap((res: any) => {
        if (res.accessToken) localStorage.setItem('accessToken', res.accessToken);
      }),
      catchError((err) => {
        this.logout(); // session expirée
        return throwError(() => err);
      })
    );
  }

  // Helper pour ajouter le token dans les headers
  getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.getAccessToken();
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }
}
