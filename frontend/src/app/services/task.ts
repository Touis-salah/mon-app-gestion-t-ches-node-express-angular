import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './authservice';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  completed?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // GET tasks (public)
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // POST task (protégé)
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, this.authService.getAuthHeaders()).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // Token expiré → rafraîchir
          return this.authService.refreshToken().pipe(
            switchMap(() => this.http.post<Task>(this.apiUrl, task, this.authService.getAuthHeaders()))
          );
        }
        return of(err as any);
      })
    );
  }

  // PUT task (protégé)
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, this.authService.getAuthHeaders()).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, this.authService.getAuthHeaders()))
          );
        }
        return of(err as any);
      })
    );
  }

  // DELETE task (protégé)
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders()).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => this.http.delete<void>(`${this.apiUrl}/${id}`, this.authService.getAuthHeaders()))
          );
        }
        return of(err as any);
      })
    );
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// export interface Task {
//   id?: number;
//   title: string;
//   description?: string;
//   completed?: boolean;
// }
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   private apiUrl = 'http://localhost:3000/tasks';
//
//   constructor(private http: HttpClient) {}
//
//   getTasks(): Observable<Task[]> {
//     return this.http.get<Task[]>(this.apiUrl);
//     console.log("good job!")
//   }
//
//   createTask(task: Task): Observable<Task> {
//     return this.http.post<Task>(this.apiUrl, task);
//   }
//
//   updateTask(task: Task): Observable<Task> {
//     return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
//   }
//
//   deleteTask(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
// }
