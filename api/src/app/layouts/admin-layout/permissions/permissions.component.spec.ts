import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsComponent } from './permissions.component';
import { FormControl, FormGroup } from '@angular/forms';
import { PermissionsService } from '../../../services/permissions.service';
import { GroupsService } from '../../../services/groups.service';
import { of } from 'rxjs';

describe('PermissionsComponent', () => {
  let component: PermissionsComponent;
  let fixture: ComponentFixture<PermissionsComponent>;
  let permissionsServiceSpy: jasmine.SpyObj<PermissionsService>;
  let groupsServiceSpy: jasmine.SpyObj<GroupsService>;

  beforeEach(() => {
    const permissionsSpy = jasmine.createSpyObj('PermissionsService', ['getAll', 'save']);
    const groupsSpy = jasmine.createSpyObj('GroupsService', ['getAll', 'getById']);

    TestBed.configureTestingModule({
      declarations: [PermissionsComponent],
      providers: [
        { provide: PermissionsService, useValue: permissionsSpy },
        { provide: GroupsService, useValue: groupsSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PermissionsComponent);
    component = fixture.componentInstance;
    permissionsServiceSpy = TestBed.inject(PermissionsService) as jasmine.SpyObj<PermissionsService>;
    groupsServiceSpy = TestBed.inject(GroupsService) as jasmine.SpyObj<GroupsService>;

    permissionsServiceSpy.getAll.and.returnValue(of([{ id: 1, permission: 'READ' }]));
    groupsServiceSpy.getAll.and.returnValue(of([{ id: 1, permissoes: [{ idPermissao: 1 }] }]));
  });

  it('should call getAll and create form on init', () => {
    spyOn(component, 'getAll').and.callFake(() => {})
    component.ngOnInit();
    expect(component.getAll).toHaveBeenCalled();
    expect(component.form).toBeTruthy();
  })

  it('should call getAll and set permissions and groups', () => {
    component.getAll();

    expect(permissionsServiceSpy.getAll).toHaveBeenCalled();
    expect(groupsServiceSpy.getAll).toHaveBeenCalled();
    expect(component.permissions.length).toBeGreaterThan(0);
    expect(component.groups.length).toBeGreaterThan(0);
  });

  it('should set currentGroup and formPermissions on search', () => {
    component.groups = [{ id: 1, permissoes: [{ idPermissao: 1 }, { idPermissao: 2 }] }];
    component.form = new FormGroup({
      grupoId: new FormControl(1),
      permissoesIds: new FormControl([])
    });

    groupsServiceSpy.getById.and.returnValue(of([{ idPermissao: 1 }, { idPermissao: 2 }] ))

    component.search();

    expect(component.currentGroup).toEqual(component.groups[0]);
    expect(component.formPermissions).toContain(1);
    expect(component.formPermissions).toContain(2);
    expect(component.hasSearched).toBeTrue();
  });

  it('should return true if permission is in formPermissions', () => {
    component.formPermissions = [1, 2, 3];
    expect(component.isChecked(2)).toBeTrue();
    expect(component.isChecked(4)).toBeFalse();
  });

  it('should add permission if not checked and remove if checked on toggle', () => {
    component.formPermissions = [1];
    component.toggle(2);
    expect(component.formPermissions).toContain(2);

    component.toggle(1);
    expect(component.formPermissions).not.toContain(1);
  });

  it('should add a permission on addPermission', () => {
    component.addPermission(1);
    expect(component.formPermissions).toContain(1);
  });

  it('should remove a permission on removePermission', () => {
    component.formPermissions = [1, 2, 3];
    component.removePermission(2);
    expect(component.formPermissions).not.toContain(2);
  });
});