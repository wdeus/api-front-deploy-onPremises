import { TestBed } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { FormControl, FormGroup } from '@angular/forms';

describe('PermissionsService', () => {
  let service: PermissionsService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PermissionsService]
    });

    service = TestBed.inject(PermissionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call getAll and return the expected data', () => {
    const mockData = [{ id: 1, permission: 'READ' }];

    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(environment.apiUrl + 'permissoes');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should call save with the correct form data', () => {
    const mockForm = new FormGroup({
      permission: new FormControl('WRITE')
    });

    service.save(mockForm).subscribe(response => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne(environment.apiUrl + 'permissoes/grupos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockForm.value);
    req.flush({ success: true });
  });
});
