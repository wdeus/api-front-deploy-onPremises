import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  form: FormGroup;

  constructor(private httpService: HttpClient
  ) { 
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log('Email:', email);
      console.log('Senha:', password);

      const body = {
        email:email,
        password:password
      }
      this.httpService.post("teste",body)
    
    } else {
      console.log('Formulário inválido');
    }
  }
}
