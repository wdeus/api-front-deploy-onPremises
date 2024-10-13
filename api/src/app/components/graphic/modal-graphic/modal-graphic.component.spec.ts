import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGraphicComponent } from './modal-graphic.component';

describe('ModalGraphicComponent', () => {
  let component: ModalGraphicComponent;
  let fixture: ComponentFixture<ModalGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalGraphicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
