import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve inicializar o formulário corretamente', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('login')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('deve validar os campos obrigatórios do formulário', () => {
    const loginControl = component.loginForm.get('login');
    const passwordControl = component.loginForm.get('password');

    loginControl?.setValue('');
    passwordControl?.setValue('');
    expect(loginControl?.valid).toBeFalse();
    expect(passwordControl?.valid).toBeFalse();

    loginControl?.setValue('email@example.com');
    passwordControl?.setValue('123456');
    expect(loginControl?.valid).toBeTrue();
    expect(passwordControl?.valid).toBeTrue();
  });

  it('deve realizar uma chamada ao endpoint do login e armazenar o token no localStorage', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate');
    
    component.loginForm.setValue({
      login: 'email@example.com',
      password: 'password123',
    });
    
    component.onLoginClick();

    const req = httpTestingController.expectOne(`${component.apiUrl}/login`);
    expect(req.request.method).toEqual('POST');
    req.flush({ token: 'fake-jwt-token' });

    tick();

    expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'fake-jwt-token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('deve exibir um erro de login ao receber uma resposta de erro do servidor', fakeAsync(() => {
    spyOn(console, 'error');

    component.loginForm.setValue({
      login: 'email@example.com',
      password: 'password123',
    });
    
    component.onLoginClick();

    const req = httpTestingController.expectOne(`${component.apiUrl}/login`);
    req.flush('Erro no login', { status: 401, statusText: 'Unauthorized' });

    tick();

    expect(console.error).toHaveBeenCalledWith('Erro no login:', jasmine.any(Object));
  }));
});
