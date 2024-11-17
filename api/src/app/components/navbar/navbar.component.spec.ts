import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let httpMock: HttpTestingController;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,  
        HttpClientTestingModule  
      ],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();  
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  xit('deve disparar o input de arquivo ao clicar no botão', () => {
    spyOn(component, 'triggerFileInput').and.callThrough();
    
    const button = debugElement.query(By.css('button.upload-btn')).nativeElement;
    button.click();
    
    expect(component.triggerFileInput).toHaveBeenCalled();
  });

  it('deve enviar o arquivo corretamente via HTTP', () => {
    const mockFile = new File(['mock content'], 'mockFile.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } };

    component.importDadosProvisionados(mockEvent);

    const req = httpMock.expectOne('http://localhost:8080/api/importacao');
    expect(req.request.method).toBe('POST');

    req.flush({ success: true });

    expect(component.isLoading).toBeFalse();
  });

  it('deve lidar com erro ao enviar o arquivo', () => {
    const mockFile = new File(['mock content'], 'mockFile.txt', { type: 'text/plain' });
    const mockEvent = { target: { files: [mockFile] } };

    component.importDadosProvisionados(mockEvent);

    const req = httpMock.expectOne('http://localhost:8080/api/importacao');
    expect(req.request.method).toBe('POST');

    req.flush({ message: 'Erro no upload' }, { status: 500, statusText: 'Server Error' });

    expect(component.isLoading).toBeFalse();
  });

  it('deve não fazer nada se nenhum arquivo for selecionado', () => {
    spyOn(component, 'importDadosProvisionados').and.callThrough();

    const mockEvent = { target: { files: [] } };

    component.importDadosProvisionados(mockEvent);

    httpMock.expectNone('http://localhost:8080/api/importacao');
    expect(component.isLoading).toBeFalse();
  });
});