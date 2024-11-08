import { TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionDirective } from './permission.directive';
import { TestBed } from '@angular/core/testing';


class MockTemplateRef {}
class MockViewContainerRef {
  createEmbeddedView = jasmine.createSpy('createEmbeddedView');
  clear = jasmine.createSpy('clear');
}

describe('PermissionDirective', () => {
  let directive: PermissionDirective;
  let templateRef: TemplateRef<any>;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PermissionDirective,
        { provide: TemplateRef, useClass: MockTemplateRef },
        { provide: ViewContainerRef, useClass: MockViewContainerRef },
      ],
    });

    templateRef = TestBed.inject(TemplateRef);
    viewContainerRef = TestBed.inject(ViewContainerRef);
    directive = new PermissionDirective(templateRef, viewContainerRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should display content if ID exists in localStorage', () => {
    const permissions = [{ idPermissao: 1 }, { idPermissao: 2 }];
    localStorage.setItem('permissions', JSON.stringify(permissions));

    directive.permission = 1;

    expect(viewContainerRef.createEmbeddedView).toHaveBeenCalledWith(templateRef);
    expect(viewContainerRef.clear).not.toHaveBeenCalled();
  });

  it('should clear content if ID does not exist in localStorage', () => {
    const permissions = [{ idPermissao: 3 }];
    localStorage.setItem('permissions', JSON.stringify(permissions));

    directive.permission = 1;

    expect(viewContainerRef.clear).toHaveBeenCalled();
    expect(viewContainerRef.createEmbeddedView).not.toHaveBeenCalled();
  });

  afterEach(() => {
    localStorage.removeItem('permissions');
  });
});


/*describe('PermissionDirective', () => {
  it('should create an instance', () => {
    const directive = new PermissionDirective();
    expect(directive).toBeTruthy();
  });
});*/
