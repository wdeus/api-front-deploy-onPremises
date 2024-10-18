import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModalGraphicComponent } from './modal-graphic.component';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

xdescribe('ModalGraphicComponent', () => {
  let component: ModalGraphicComponent;
  let fixture: ComponentFixture<ModalGraphicComponent>;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ModalGraphicComponent],
      providers: [NgbActiveModal]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGraphicComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve fechar o modal', () => {
    spyOn(component.activeModal, 'dismiss');
    component.close();
    expect(component.activeModal.dismiss).toHaveBeenCalledWith('Modal closed');
  });

  it('deve buscar filtros de fato com sucesso', () => {
    const mockResponse = [{ nome: 'fato_entrevista'}];
    component.filter();

    const req = httpTestingController.expectOne('http://localhost:8080/filtros/fatos');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);

    expect(component.dataFilterFato).toEqual(mockResponse);
    expect(component.itemList).toEqual(mockResponse[0]);
    
  });

  it('deve lidar com erro ao buscar filtros de fato', () => {
    spyOn(console, 'error');
    component.filter();

    const req = httpTestingController.expectOne('http://localhost:8080/filtros/fatos');
    req.error(new ErrorEvent('Erro de rede'));

    expect(console.error).toHaveBeenCalledWith('Erro ao buscar filtro fato:', jasmine.any(Object));
    expect(component.dataFilterFato).toEqual([]);
  });


 
});
