import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRequest } from '../models/dashboard-request.model'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type GraphicData = [number, string];
export type CardData = [number];

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: HttpClient) { }

  getCardData(request: DashboardRequest): Observable<CardData> {
    const url = `${environment.apiUrl}visualizacao/card`;
    return this.httpClient.post<CardData>(url, request);
  }

  getGraphicData(request: DashboardRequest): Observable<GraphicData[]> {
    const url = `${environment.apiUrl}visualizacao/grafico`;
    return this.httpClient.post<GraphicData[]>(url, request);
  }
}
