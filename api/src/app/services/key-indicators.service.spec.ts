import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { KeyIndicator } from '../models/key-indicator.model';
import { KeyIndicatorsService } from './key-indicators.service';

describe('KeyIndicatorsService', () => {
  let service: KeyIndicatorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KeyIndicatorsService]
    });
    service = TestBed.inject(KeyIndicatorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getKeyIndicators', () => {
    it('should get all key indicators', () => {
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

      service.getKeyIndicators().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}indicadores`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
