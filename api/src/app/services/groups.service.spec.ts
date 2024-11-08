import { TestBed } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('GroupsService', () => {
  let service: GroupsService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupsService]
    });
    service = TestBed.inject(GroupsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch "grupos" using GET request', () => {
    const mockGrupos = [{ nome: 'Fato1' }, { nome: 'Fato2' }];

    service.getAll().subscribe(grupos => {
      expect(grupos).toEqual(mockGrupos);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}grupos`);
    expect(req.request.method).toBe('GET');

    req.flush(mockGrupos);
  });
});
