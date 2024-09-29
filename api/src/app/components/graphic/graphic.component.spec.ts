import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicComponent } from './graphic.component';
import exp from 'constants';

describe('GraphicComponent', () => {
  let component: GraphicComponent;
  let fixture: ComponentFixture<GraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicComponent ]
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
});
