import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CardData, DashboardService, GraphicData } from '../services/dashboard.service';
import { of } from 'rxjs';

class MockCanvas {
  getContext() {
      return new MockContext();
  }
}

class MockContext {
  createLinearGradient() {
      return new MockGradient();
  }
}

class MockGradient {
  colorStops = [];
  constructor() {
      this.colorStops = [];
  }

  addColorStop(position, color) {
      this.colorStops.push({ position, color });
  }
}


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let serviceSpy: jasmine.SpyObj<DashboardService>

  beforeEach(async(() => {
    serviceSpy = jasmine.createSpyObj<DashboardService>('DashboardService', ['getCardData', 'getGraphicData'])

    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        {
          provide: DashboardService,
          useValue: serviceSpy
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    spyOn(document, 'getElementById').and.callFake((id: string) => {
      if (id === "mainChart") {
          return new MockCanvas() as any;
      }
      return null;
  });
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component, 'loadData').and.callFake(()=>{})
    expect(component).toBeTruthy();
  });

  it('should load card and graphic data and set parameters correctly', () => {
    const requestCardOne = component.createCardRequest(1);
    const requestCardTwo = component.createCardRequest(2);
    const requestCardThree = component.createCardRequest(3);
    
    const requestGraphicOne = component.createGraphicRequest(1);
    const requestGraphicTwo = component.createGraphicRequest(2);
    const requestGraphicThree = component.createGraphicRequest(3);
  
    const cardOneData  = [10] as CardData;
    const cardTwoData = [20] as CardData;
    const cardThreeData = [30] as CardData;
  
    const graphicOneData = [[5, 'Label1'] as GraphicData, [10, 'Label2'] as GraphicData];
    const graphicTwoData = [[15, 'Label3'] as GraphicData,  [20, 'Label4'] as GraphicData] ;
    const graphicThreeData = [[25, 'Label5'] as GraphicData, [30, 'Label6'] as GraphicData];
  
    serviceSpy.getCardData.and.returnValues(
      of(cardOneData),
      of(cardTwoData),
      of(cardThreeData)
    );
  
    serviceSpy.getGraphicData.and.returnValues(
      of(graphicOneData), 
      of(graphicTwoData), 
      of(graphicThreeData)
    );
  
    component.loadData();
  
    expect(component.cardData).toEqual([
      { value: 10, request: requestCardOne },
      { value: 20, request: requestCardTwo },
      { value: 30, request: requestCardThree }
    ]);
  

    expect(component.isLoading).toBeFalse();
  });
  
});
