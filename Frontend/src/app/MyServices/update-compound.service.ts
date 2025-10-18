import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Ensure HttpClient is imported
import { Observable } from 'rxjs';
import { Compound } from '../Compound';

@Injectable({
  providedIn: 'root',
})
export class UpdateCompoundService {
  apiUrl = 'http://localhost:3000/api/compound';

  constructor(private http: HttpClient) {}

  getCompoundById(id: number): Observable<Compound> {
    return this.http.get<Compound>(`${this.apiUrl}/${id}`);
  }

  updateCompound(compound: Compound): Observable<Compound> {
    return this.http.put<Compound>(`${this.apiUrl}/${compound.id}`, compound);
  }
}
