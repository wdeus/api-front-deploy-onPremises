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
}
