import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardDataComponent } from './card-data.component';

class MockNgbModalRef {
  componentInstance = {
    prompt: undefined,
    title: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}


describe('CardDataComponent', () => {
  let component: CardDataComponent;
  let fixture: ComponentFixture<CardDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardDataComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    let mockModal = new MockNgbModalRef();
    spyOn(component['ngbModal'], 'open')
      .and.returnValue(mockModal as NgbModalRef)

    component.openModal();
    expect(component['ngbModal'].open).toHaveBeenCalled()
  })

  it('deve formatar uma data válida no formato pt-BR', () => {
    const dataISO = '2024-11-06';
    const resultado = component.formatarData(dataISO);
    expect(resultado).toBe('05/11/2024');
  });

  it('deve lançar um erro para uma data inválida', () => {
    const dataInvalida = 'data-invalida';
    expect(() => component.formatarData(dataInvalida)).toThrowError('Data inválida');
  });
});
