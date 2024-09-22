import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ElementRef } from '@angular/core';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockElementRef: ElementRef;
  let mockRouter: any;
  let mockLocation: any;

  beforeEach(async () => {
    mockRouter = {
      events: of(new NavigationEnd(0, 'http://localhost:4200/', 'http://localhost:4200/'))
    };

    mockLocation = {
      prepareExternalUrl: jasmine.createSpy('prepareExternalUrl').and.callFake((path) => path),
      path: jasmine.createSpy('path').and.returnValue('/dashboard')
    };

    mockElementRef = {
      nativeElement: {
        getElementsByClassName: jasmine.createSpy('getElementsByClassName').and.returnValue([{
          classList: {
            add: jasmine.createSpy('add'),
            remove: jasmine.createSpy('remove')
          }
        }])
      }
    };

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: ElementRef, useValue: mockElementRef },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize correctly on ngOnInit', () => {
    component.ngOnInit();
    expect(component['listTitles']).toBeDefined();
  });

  it('should toggle navbar collapse', () => {
    component.isCollapsed = true;
    component.collapse();
    expect(component.isCollapsed).toBeFalse();

    component.collapse();
    expect(component.isCollapsed).toBeTrue();
  });

  it('should open sidebar correctly', () => {
    component.sidebarOpen();
    expect(document.getElementsByTagName('html')[0].classList.contains('nav-open')).toBeTrue();
    expect(component['sidebarVisible']).toBeTrue();
  });

  it('should close sidebar correctly', () => {
    component.sidebarOpen();
    component.sidebarClose();
    expect(document.getElementsByTagName('html')[0].classList.contains('nav-open')).toBeFalse();
    expect(component.sidebarVisible).toBeFalse();
  });

  it('should toggle sidebar correctly', () => {
    spyOn(document, 'getElementsByClassName').and.returnValue( { 
      length: 1, 0:{
        appendChild: () => {}
      }, 
      item: (index: number) => {return null} 
    } as any);
    
    component.sidebarVisible = false;
    component.sidebarToggle();
    expect(component.sidebarVisible).toBeTrue();

    component.sidebarToggle();
    expect(component.sidebarVisible).toBeFalse();
  });

  it('should return correct title from getTitle', () => {
    component.listTitles = [
      { path: 'dashboard', title: 'Dashboard' },
      { path: 'user', title: 'User Profile' }
    ];

    spyOn(component, 'getTitle').and.callThrough();
    const title = component.getTitle();
    expect(title).toBe('Dashboard');
  });
});
