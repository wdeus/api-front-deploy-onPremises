import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIndicatorComponent } from './create-indicator.component';

describe('CreateIndicatorComponent', () => {
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
});
