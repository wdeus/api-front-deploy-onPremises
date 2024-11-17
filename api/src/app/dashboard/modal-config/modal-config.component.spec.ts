import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModalConfigComponent } from './modal-config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { assert } from 'console';

describe('ModalConfigComponent', () => {
  let component: ModalConfigComponent;
  let fixture: ComponentFixture<ModalConfigComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ModalConfigComponent],
      providers: [NgbActiveModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfigComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve criar o componente', () => {
    fixture.detectChanges();
    const req = httpTestingController.expectOne('http://localhost:8080/api/filtros/fatos');
    expect(component).toBeTruthy();
    req.flush(null);
  });

  

  it('deve inicializar o formulário corretamente', () => {
    component.createForm();

    expect(component.form).toBeDefined();
    expect(component.form.get('description')?.value).toBe('');
    expect(component.form.get('eixoX.nome')?.value).toBe('');
    expect(component.form.get('eixoY.nome')?.value).toBe('');
  });


  it('deve buscar fatos ao inicializar', () => {
    const mockResponse = [{ nome: 'Fato1', campos: ['campo1,campo2'] }];
    component.getFatos();

    const req = httpTestingController.expectOne('http://localhost:8080/api/filtros/fatos');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.fatos).toEqual(mockResponse);
  });

  it('deve buscar dimensões ao mudar o fato', () => {
    const mockResponse = [{ nome: 'Dimensao1', campos: ['campoA,campoB'] }];
    component.onFatoChange('Fato1');

    const req = httpTestingController.expectOne('http://localhost:8080/api/filtros/dimensoes?fato=Fato1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.dimensao).toEqual(mockResponse);
  });

  it('deve fechar o modal', () => {
    spyOn(component.activeModal, 'dismiss');
    component.close();
    expect(component.activeModal.dismiss).toHaveBeenCalledWith('Modal closed');
  });

  it('deve formatar string', () => {
    const value = component.formatarString('dim_teste');
    expect(value).toBe('Teste')
  })

  it('deve configurar o grafico', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue('1');
    spyOn(sessionStorage, 'setItem');

    component.createForm();

    component.configure();

    expect(sessionStorage.setItem).toHaveBeenCalled();
  })


  
  it('deve criar o componente', () => {
    spyOn(component,'getFatos').and.callFake(()=>{

    })
    fixture.detectChanges();
    
    component.fatos = [{ nome:"fato",campos:['campo1,campo2']}]
    spyOn(component,'onFatoChange').and.callFake(()=>{

    })
    
    component.form.controls.eixoX.get("nome").setValue("fato")
    expect(component.fatosCampos).toBeTruthy()  
  });


  it('deve criar o componente', () => {
    spyOn(component,'getFatos').and.callFake(()=>{

    })
    component.dimensao = [{ nome:"dimensao",campos:['campo1,campo2']}]
    
    fixture.detectChanges()
    component.form.controls.eixoY.get('nome').setValue("dimensao")
    
    expect(component.dimensaoCampos).toBeTruthy()  
  });


  
  it('deve criar o componente', () => {
    spyOn(component,'getFatos').and.callFake(()=>{

    })
    component.dimensao = [{ nome:"dimensao",campos:['campo1,campo2']}]
    
    fixture.detectChanges()
    component.form.controls.filtros.get('0').get("nome").setValue("dimensao")
    
    expect(component.dimensaoCampos).toBeTruthy()  
  });


  





  

  it('deve inicializar o formulário corretamente', () => {
    component.createForm();

    expect(component.form).toBeDefined();
    expect(component.form.get('description')?.value).toBe('');
    expect(component.form.get('eixoX.nome')?.value).toBe('');
    expect(component.form.get('eixoY.nome')?.value).toBe('');
  });


});
