import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRequest } from '../models/dashboard-request.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type GraphicData = [number, string];
export type CardData = [number];

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private tokenAuth: string | null = localStorage.getItem("authToken");

  constructor(private httpClient: HttpClient) { }

  getCardData(request: DashboardRequest): Observable<CardData> {
    const url = `${environment.apiUrl}visualizacao/card`;
    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);
    return this.httpClient.post<CardData>(url, request, { headers });
  }

  getGraphicData(request: DashboardRequest): Observable<GraphicData[]> {
    const url = `${environment.apiUrl}visualizacao/grafico`;
    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);
    return this.httpClient.post<GraphicData[]>(url, request, { headers });
  }
}
