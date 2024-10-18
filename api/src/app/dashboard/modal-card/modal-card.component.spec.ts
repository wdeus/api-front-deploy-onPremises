import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCardComponent } from './modal-card.component';
import { of } from 'rxjs';

describe('ModalCardComponent', () => {
  let component: ModalCardComponent;
  let fixture: ComponentFixture<ModalCardComponent>;
  let httpMock: HttpTestingController;
  let mockActiveModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ModalCardComponent],
      providers: [
        { provide: NgbActiveModal, useValue: { dismiss: jasmine.createSpy('dismiss') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCardComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  it('deve criar o formulário na inicialização', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();

    const req = httpMock.expectOne('http://localhost:8080/filtros/fatos');
    expect(component.form.controls['description']).toBeDefined();
    expect(component.form.controls['eixoX']).toBeDefined();
    expect(component.form.controls['eixoY']).toBeDefined();
    expect(component.form.controls['filtros']).toBeDefined();
    req.flush(null);
  });

  it('deve buscar fatos na inicialização', () => {
    const mockFatos = [{ nome: 'fato_entrevista', campos: ['campo1,campo2'] }];
    component.ngOnInit();

    const req = httpMock.expectOne('http://localhost:8080/filtros/fatos');
    expect(req.request.method).toBe('GET');
    req.flush(mockFatos);

    expect(component.fatos).toEqual(mockFatos);
  });


  it('deve buscar dimensao quando onFatoChange for chamado', () => {
    const mockFatos = [{ nome: 'fato_entrevista'  }];
    component.ngOnInit();
    const reqFatos = httpMock.expectOne('http://localhost:8080/filtros/fatos');
    reqFatos.flush(mockFatos);

    component.onFatoChange('fato_entrevista');
    const reqDimensao = httpMock.expectOne('http://localhost:8080/filtros/dimensoes?fato=fato_entrevista');
    expect(reqDimensao.request.method).toBe('GET');

  });

  xit('deve salvar no sessionStorage e recarregar na configuração', () => {
    spyOn(sessionStorage, 'setItem');

    const mockLocation = {
      reload: jasmine.createSpy('reload')
    };

    let test = false;

    //spyOn(window.location, 'reload').and.callFake(() => {test = true});

    component.configure();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'filtro' + component.idXGrafico,
      JSON.stringify(component.form.value)
    );
    expect(test).toBeTrue();
  });

  it('deve fechar o modal ao chamar close', () => {
    component.close();
    expect(mockActiveModal.dismiss).toHaveBeenCalledWith('Modal closed');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
