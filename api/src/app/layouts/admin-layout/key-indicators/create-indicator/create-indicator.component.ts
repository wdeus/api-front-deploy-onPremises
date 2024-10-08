import { Component, Inject, OnInit } from '@angular/core';
import { FiltroService } from '../../../../services/filtro.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-indicator',
  templateUrl: './create-indicator.component.html',
  styleUrls: ['./create-indicator.component.scss']
})
export class CreateIndicatorComponent implements OnInit {
  filtroFatos = [];
  fatoCampos = [];
  form: FormGroup;

  constructor(
    @Inject(FiltroService) private filtroService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.filtroService.getFatos().subscribe(k => {
      this.filtroFatos = k
    });

    this.form.controls.indicador.get('nome').valueChanges.subscribe(n => {
      console.log(n);
      this.getCampos(n);
    })

  }

  getCampos(fato:any){
    this.fatoCampos = fato.campos[0].split(",");
    console.log(this.fatoCampos);
  }

  createForm(){
    this.form = new FormGroup({
      indicador: new FormGroup({
        nome: new FormControl("",[]),
        campo: new FormControl("", []),
        comparador: new FormControl("", []),
        valor: new FormControl("", []),
      }),
      filtro: new FormGroup({
        nome: new FormControl("",[]),
        campo: new FormControl("", []),
        comparador: new FormControl("", []),
        valor: new FormControl("", []),
      }),
      usuario: new FormControl("", [])
    }); 

  }

}
