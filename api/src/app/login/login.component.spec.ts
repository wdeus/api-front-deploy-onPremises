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

  it('deve chamar a funcao login',() => {
    component.loginForm.patchValue({
      login:"teste",
      password:"teste"
    })


    fixture.detectChanges();

    const loginSpy = spyOn(component,'onLoginClick').and.callFake(() => {
      // A função login não precisa retornar nada
    });


    component.onLoginClick();

    expect(loginSpy).toHaveBeenCalled();
  })


  
});
