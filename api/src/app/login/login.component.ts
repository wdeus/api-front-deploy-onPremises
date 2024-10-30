import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  apiUrl: string = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient,
    private navigate:Router

  ) {
    
   }

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  // Cria o formulário de registro
  createRegisterForm() {
    this.registerForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('', [Validators.required])
    });
  }

  onLoginClick(): void {
    console.log(this.loginForm)
    if (this.loginForm.valid == false)  {
      const loginData = this.loginForm.value;
      this.http.post<{ token: string }>(`${this.apiUrl}/login`, loginData).subscribe({
        next: (response) => {
          console.log('Token recebido:', response.token);
          localStorage.setItem('authToken', response.token);
            this.navigate.navigate(['/dashboard']) ;
        },
        error: (error) => {
          console.error('Erro no login:', error);
        }
      });
    } else {
      console.log('Formulário de login inválido');
    }
  }

  // Método de registro
  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.http.post(`${this.apiUrl}/register`, registerData).subscribe({
        next: () => {
          console.log('Usuário registrado com sucesso');
          // Redirecionar ou realizar outras ações após registro bem-sucedido
        },
        error: (error) => {
          console.error('Erro no registro:', error);
        }
      });
    } else {
      console.log('Formulário de registro inválido');
    }
  }
}
