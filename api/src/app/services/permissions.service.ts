import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private tokenAuth: string | null = localStorage.getItem("authToken");

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any>{
    const header = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);
    return this.httpClient.get(environment.apiUrl + 'permissoes', { headers: header });
  }

  save(form:FormGroup): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);
    return this.httpClient.post(environment.apiUrl + 'permissoes/grupos', form.value, { headers });
  }
}
