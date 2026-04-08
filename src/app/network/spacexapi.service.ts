import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpaceXApiService {
  private baseUrl = 'https://api.spacexdata.com/v3';

  constructor(private http: HttpClient) {}

  getAllLaunches(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}/launches`);
  }

  getLaunchesByYear(year: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}/launches?launch_year=${year}`);
  }

  getLaunchesByFilter(params: {
    launch_year?: string;
    launch_success?: boolean;
    land_success?: boolean;
  }): Observable<Mission[]> {
    let queryString = Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== null)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    return this.http.get<Mission[]>(`${this.baseUrl}/launches?${queryString}`);
  }

  getLaunchByFlightNumber(flightNumber: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.baseUrl}/launches/${flightNumber}`);
  }
}
