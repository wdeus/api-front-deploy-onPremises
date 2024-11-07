import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private tokenAuth: string | null = localStorage.getItem("authToken");
  constructor(private httpClient: HttpClient) { }

  getFatos(): Observable<any[]> {
    const url = `${environment.apiUrl}filtros/fatos`;
    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);

    return this.httpClient.get<any[]>(url, { headers });
  
  }

  getDimensoes(fato: string): Observable<any[]> {
    const url = `${environment.apiUrl}filtros/dimensoes?fato=`+fato;
    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);

    return this.httpClient.get<any[]>(url, { headers });
  }
}
