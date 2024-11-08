import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private tokenAuth: string | null = localStorage.getItem("authToken");
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any>{
    const header = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);
    return this.httpClient.get(environment.apiUrl + 'grupos', {headers: header});
  }

  getById(id:number): Observable<any>{
    const header = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);
    return this.httpClient.get(environment.apiUrl + 'permissoes/grupos/'+id, {headers: header});
  }
}
