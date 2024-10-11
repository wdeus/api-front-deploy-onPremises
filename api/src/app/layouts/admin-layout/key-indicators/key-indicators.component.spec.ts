import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { KeyIndicatorsService } from '../../../services/key-indicators.service';
import { KeyIndicator } from '../../../models/key-indicator.model';

import { KeyIndicatorsComponent } from './key-indicators.component';

describe('KeyIndicatorsComponent', () => {
  let component: KeyIndicatorsComponent;
  let fixture: ComponentFixture<KeyIndicatorsComponent>;
  let keyIndicatorsServiceSpy: jasmine.SpyObj<KeyIndicatorsService>

  beforeEach(async () => {
    keyIndicatorsServiceSpy = jasmine.createSpyObj<KeyIndicatorsService>("service", ['getKeyIndicators'])
    await TestBed.configureTestingModule({
      declarations: [KeyIndicatorsComponent],
      providers: [
        {
          useValue: keyIndicatorsServiceSpy,
          provide: KeyIndicatorsService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    keyIndicatorsServiceSpy.getKeyIndicators.and.returnValues(of([]))
    fixture = TestBed.createComponent(KeyIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should got no data when onInit is called with diferent user', () => {
    component.user = 'jose'

    const mockResponse: KeyIndicator[] = [
      {
        'filtro': {
          'nome': 'teste',
          'campo': 'aaa',
          'comparador': '>',
          'valor': 'abc'
        },
        'indicador': {
          'nome': 'no teste',
          'campo': 'aaa',
          'comparador': '>',
          'valor': 'abc'
        },
        'usuario': 'josesilva',
        'descricao': 'descccc'
      }
    ];

    keyIndicatorsServiceSpy.getKeyIndicators.and.returnValues(of(mockResponse))

    component.ngOnInit();

    expect(component.tableData).toHaveSize(0);
  });

  it('should got data when onInit is called with same user', () => {
    component.user = 'jose'

    const mockResponse: KeyIndicator[] = [
      {
        'filtro': {
          'nome': 'teste',
          'campo': 'aaa',
          'comparador': '>',
          'valor': 'abc'
        },
        'indicador': {
          'nome': 'no teste',
          'campo': 'aaa',
          'comparador': '>',
          'valor': 'abc'
        },
        'usuario': 'jose',
        'descricao': 'descccc'
      }
    ];

    keyIndicatorsServiceSpy.getKeyIndicators.and.returnValues(of(mockResponse))

    component.ngOnInit();

    expect(component.tableData).toHaveSize(1);
  });

});
