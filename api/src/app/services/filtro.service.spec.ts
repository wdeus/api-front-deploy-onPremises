import { TestBed } from '@angular/core/testing';
import { FiltroService } from './filtro.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('FiltroService', () => {
  let service: FiltroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FiltroService]
    });

    service = TestBed.inject(FiltroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch "fatos" using GET request', () => {
    const mockFatos = [{ nome: 'Fato1' }, { nome: 'Fato2' }];

    service.getFatos().subscribe(fatos => {
      expect(fatos).toEqual(mockFatos);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}filtros/fatos`);
    expect(req.request.method).toBe('GET');

    req.flush(mockFatos);
  });

  it('should fetch "dimensoes" based on "fato" using GET request', () => {
    const fato = 'Fato1';
    const mockDimensoes = [{ nome: 'Dimensao1' }, { nome: 'Dimensao2' }];

    service.getDimensoes(fato).subscribe(dimensoes => {
      expect(dimensoes).toEqual(mockDimensoes);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}filtros/dimensoes?fato=${fato}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockDimensoes);
  });
});
