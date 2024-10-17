import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor(private httpClient: HttpClient) { }

  getFatos(): Observable<any[]> {
    const url = `${environment.apiUrl}filtros/fatos`;
    return this.httpClient.get<any[]>(url);
  }

  getDimensoes(fato: string): Observable<any[]> {
    const url = `${environment.apiUrl}filtros/dimensoes?fato=`+fato;
    return this.httpClient.get<any[]>(url);
  }
}
