import { Component, Inject, OnInit } from '@angular/core';
import { FiltroService } from '../../../../services/filtro.service';
import { FormControl, FormGroup } from '@angular/forms';
import { KeyIndicatorsService } from '../../../../services/key-indicators.service';
import { Router } from '@angular/router';


@Component({
  selector: 'create-indicator',
  templateUrl: './create-indicator.component.html',
  styleUrls: ['./create-indicator.component.scss']
})
export class CreateIndicatorComponent implements OnInit {
  filtroFatos = [];
  fatoCampos = [];
  
  dimensoes = [];
  filtroCampos = [];
  
  comparadores = ['>', '<', '>=', '<=', '=', '<>'];
  form: FormGroup;

  constructor(
    @Inject(FiltroService) private filtroService,
    @Inject(KeyIndicatorsService) private keyIndicatorsService: KeyIndicatorsService,
    @Inject(Router) private router:Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.filtroService.getFatos().subscribe(k => {
      this.filtroFatos = k
    });

    this.form.controls.indicador.get('nome').valueChanges.subscribe(nome => {
      let campo = this.filtroFatos.filter(x => x.nome == nome)
      this.fatoCampos = this.getCampos(campo);
      this.filtroService.getDimensoes(nome)
        .subscribe(x => this.dimensoes = x)
    })

    this.form.controls.filtro.get('nome').valueChanges.subscribe(n => {
      let campo = this.dimensoes.filter(x => x.nome == n)
      this.filtroCampos = this.getCampos(campo);
    })

  }

  getCampos(fato:any){
   return fato[0].campos[0].split(",")
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
      usuario: new FormControl("admin", []),
      descricao: new FormControl("", [])
    }); 
  }

  save(){
    this.keyIndicatorsService.saveIndicadorData(this.form.getRawValue())
      .subscribe(x=>this.router.navigate(['key-indicators']));
  }

}
