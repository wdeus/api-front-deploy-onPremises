import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardRequest } from '../models/dashboard-request.model'
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient: HttpClient) { }

  getCardData(request: DashboardRequest) : Observable<number> {
    return of(1);
  }
}
