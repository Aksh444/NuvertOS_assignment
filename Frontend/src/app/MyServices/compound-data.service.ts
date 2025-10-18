import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compound } from '../Compound';

@Injectable({
  providedIn: 'root',
})
export class CompoundDataService {
  private apiUrl = 'http://localhost:3000/api/compound';

  constructor(private http: HttpClient) {}

  CompoundById(cid: number): Observable<Compound> {
    const url = `${this.apiUrl}/${cid}`;
    return this.http.get<Compound>(url);
  }
}
