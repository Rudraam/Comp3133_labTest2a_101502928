import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Launch } from '../models/launch.model';
import { Rocket } from '../models/rocket.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private http = inject(HttpClient);
  private apiUrl = environment.spacexApiUrl;

  getLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.apiUrl}/launches`).pipe(
      tap(launches => console.log(`Fetched ${launches.length} launches`)),
      catchError(this.handleError)
    );
  }

  getLaunchById(id: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.apiUrl}/launches/${id}`).pipe(
      tap(launch => console.log(`Fetched launch: ${launch.name}`)),
      catchError(this.handleError)
    );
  }

  getRockets(): Observable<Rocket[]> {
    return this.http.get<Rocket[]>(`${this.apiUrl}/rockets`).pipe(
      tap(rockets => console.log(`Fetched ${rockets.length} rockets`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error ${error.status}: ${error.message}`;
    }
    console.error('SpaceX API Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
