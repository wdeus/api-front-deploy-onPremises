import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicComponent } from './graphic.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

class MockNgbModalRef {
  componentInstance = {
    prompt: undefined,
    title: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

describe('GraphicComponent', () => {
  let component: GraphicComponent;
  let fixture: ComponentFixture<GraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphicComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create default config on init', () => {
    spyOn(component, 'createDefaultConfig')
    component.ngOnInit();
    expect(component.createDefaultConfig).toHaveBeenCalled();
  })

  it('should popupale options after view init', () => {
    component.ngAfterViewInit();
    expect(component.gradientChartOptionsConfiguration).toBeTruthy();
  })

  it('should open modal', () => {
    let mockModal = new MockNgbModalRef();
    spyOn(component['modalService'], 'open')
      .and.returnValue(mockModal as NgbModalRef)

    component.openModal();

    expect(component['modalService'].open).toHaveBeenCalled()
  })
});
