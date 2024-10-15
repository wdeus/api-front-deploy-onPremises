import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateIndicatorComponent } from './create-indicator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyIndicatorsService } from '../../../../services/key-indicators.service';
import { FiltroService } from '../../../../services/filtro.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

/*describe('CreateIndicatorComponent', () => {
  let component: CreateIndicatorComponent;
  let fixture: ComponentFixture<CreateIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/
describe('CreateIndicatorComponent', () => {
  let component: CreateIndicatorComponent;
  let fixture: ComponentFixture<CreateIndicatorComponent>;
  let filtroServiceSpy: jasmine.SpyObj<FiltroService>;
  let keyIndicatorsServiceSpy: jasmine.SpyObj<KeyIndicatorsService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    filtroServiceSpy = jasmine.createSpyObj('FiltroService', ['getFatos', 'getDimensoes']);
    keyIndicatorsServiceSpy = jasmine.createSpyObj('KeyIndicatorsService', ['saveIndicadorData']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CreateIndicatorComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: FiltroService, useValue: filtroServiceSpy },
        { provide: KeyIndicatorsService, useValue: keyIndicatorsServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIndicatorComponent);
    component = fixture.componentInstance;

    // Simulando retorno de dados do serviço getFatos
    filtroServiceSpy.getFatos.and.returnValue(of([
      { nome: 'Fato1', campos: ['campo1,campo2'] }
    ]));
    
    filtroServiceSpy.getDimensoes.and.returnValue(of([
      { nome: 'Fato1', campos: ['campo1,campo2'] }
    ]));
    fixture.detectChanges(); // Executa o ciclo de vida inicial do Angular
  });

  it('should create the form on initialization', () => {
    expect(component.form).toBeDefined();
  });

  it('should populate fatoCampos when nome changes in the indicador group', () => {
    // Simulando mudança no campo 'nome'
    component.ngOnInit();
    component.form.controls.indicador.get('nome')?.setValue('Fato1');
    fixture.detectChanges();

    expect(component.fatoCampos).toEqual(['campo1', 'campo2']);
  });

  it('should call saveIndicadorData on save and navigate after success', () => {
    // Simulando valores do formulário
    component.ngOnInit();

    // Simulando o retorno do serviço após o salvamento
    keyIndicatorsServiceSpy.saveIndicadorData.and.returnValue(of(true));

    // Executando o método save()
    component.save();

    // Verificando se o router navegou para a página correta após salvar
    expect(routerSpy.navigate).toHaveBeenCalledWith(['key-indicators']);
  });

});
