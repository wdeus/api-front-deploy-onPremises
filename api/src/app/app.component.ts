import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        setInterval(() => {
            this.http.post(environment.apiUrl + 'notificacoes', { usuario: 'admin' }).subscribe()
        }, 15000)
    }
}
