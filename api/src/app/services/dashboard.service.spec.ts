import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService, CardData, GraphicData } from './dashboard.service';
import { DashboardRequest } from '../models/dashboard-request.model';
import { environment } from '../../environments/environment';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se não há requisições pendentes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCardData', () => {
    it('should return CardData on success', () => {
      const mockRequest: DashboardRequest = {
        description: 'Gráfico de vendas por região',
        eixoX: {
          nome: 'Região',
          campo: 'region'
        },
        eixoY: {
          nome: 'Vendas',
          campo: 'sales'
        },
        filtros: [
          {
            nome: 'Ano',
            campo: 'year',
            comparador: '>=',
            valor: '2020'
          },
          {
            nome: 'Região',
            campo: 'region',
            comparador: '=',
            valor: 'Norte'
          }
        ]
      };;
      const mockResponse: CardData = [42];

      service.getCardData(mockRequest).subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}visualizacao/card`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('#getGraphicData', () => {
    it('should return GraphicData array on success', () => {
      const mockRequest: DashboardRequest = {
        description: 'Gráfico de vendas por região',
        eixoX: {
          nome: 'Região',
          campo: 'region'
        },
        eixoY: {
          nome: 'Vendas',
          campo: 'sales'
        },
        filtros: [
          {
            nome: 'Ano',
            campo: 'year',
            comparador: '>=',
            valor: '2020'
          },
          {
            nome: 'Região',
            campo: 'region',
            comparador: '=',
            valor: 'Norte'
          }
        ]
      };;
      const mockResponse: GraphicData[] = [
        [10, 'Label1'],
        [20, 'Label2']
      ];

      service.getGraphicData(mockRequest).subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}visualizacao/grafico`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
