import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../Interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompoundsDataService {
  apiurl = 'http://localhost:3000/api/compound/all';

  constructor(private http: HttpClient) {}

  compounds(page: number): Observable<ApiResponse> {
    const url = `${this.apiurl}?page=${page}`;
    return this.http.get<ApiResponse>(url);
  }
}
