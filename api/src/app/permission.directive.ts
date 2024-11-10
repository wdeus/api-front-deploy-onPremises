import { AfterViewInit, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[permission]'
})
export class PermissionDirective {
  @Input() set permission(id){
    this.checkIdInStorage(id);
  };

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit(): void {}

  private checkIdInStorage(id: number) {
    const data = JSON.parse(localStorage.getItem('permissions') || '[]');
    const idExists = data.filter((item: any) => item.idPermissao == id);
    if (idExists?.length > 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
