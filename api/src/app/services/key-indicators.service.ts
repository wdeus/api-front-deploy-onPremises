import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { KeyIndicator } from '../models/key-indicator.model';

@Injectable({
  providedIn: 'root'
})
export class KeyIndicatorsService {
  constructor(private httpClient: HttpClient) { }

  getKeyIndicators(): Observable<KeyIndicator[]> {
    const url = `${environment.apiUrl}indicadores`;
    return this.httpClient.get<KeyIndicator[]>(url);
  }

  saveIndicadorData(data: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}indicadores`, data);  // Faz o POST e retorna um Observable
  }

  botaoDeletarIndicador(id: any) {
    return this.httpClient.delete(`${environment.apiUrl}indicadores/`+id);
  } 
  
}

