import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '../../../services/permissions.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  permissions = [];
  groups = []
  currentGroup = null;

  hasSearched = false;
  form: FormGroup
  formPermissions = []

  constructor(
    private permissionService: PermissionsService
    , private groupService: GroupsService
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.form = new FormGroup({
      grupoId: new FormControl(0, []),
      permissoesIds: new FormControl([],[])
    })
  }

  getAll(){
    this.permissionService.getAll().subscribe(data => {
      this.permissions = data;
    })

    this.groupService.getAll().subscribe(data => {
      this.groups = data;
    })
  }

  search(){
    this.formPermissions = [];
    
    this.currentGroup = this.groups.filter(x => x.id == this.form.controls.grupoId.value)[0];
    this.groupService.getById(this.currentGroup.id)
      .subscribe(x => {
        x.forEach(p => {
          this.addPermission(p.idPermissao);
        })
        this.hasSearched = true;
      })
  }

  isChecked(id: number){
    const isChecked = this.formPermissions.filter(x => x == id).length > 0;   
    return isChecked;
  }

  save(){
    this.form.controls.permissoesIds.setValue(this.formPermissions)
    this.permissionService.save(this.form)
      .subscribe(() => window.location.reload());
  }
  
  toggle(id:number){
    this.isChecked(id) ? 
      this.removePermission(id) : 
      this.addPermission(id)
  }

  addPermission(id: number){
    this.formPermissions.push(id)
  }

  removePermission(id: number){
    this.formPermissions = this.formPermissions.filter(x => x != id);
  }
}
