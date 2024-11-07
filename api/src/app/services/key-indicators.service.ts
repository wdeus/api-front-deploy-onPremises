import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { KeyIndicator } from '../models/key-indicator.model';

@Injectable({
  providedIn: 'root'
})
export class KeyIndicatorsService {
  private tokenAuth: string | null = localStorage.getItem("authToken");
 
  constructor(private httpClient: HttpClient) { }

  getKeyIndicators(): Observable<KeyIndicator[]> {
    const url = `${environment.apiUrl}indicadores`;
    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);

    return this.httpClient.get<KeyIndicator[]>(url, { headers });
  }

  saveIndicadorData(data: any): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);

    return this.httpClient.post<any>(`${environment.apiUrl}indicadores`, data,  { headers });
  }
}

