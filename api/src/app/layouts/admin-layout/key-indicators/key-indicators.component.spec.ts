import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyIndicatorsComponent } from './key-indicators.component';

describe('KeyIndicatorsComponent', () => {
  let component: KeyIndicatorsComponent;
  let fixture: ComponentFixture<KeyIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
