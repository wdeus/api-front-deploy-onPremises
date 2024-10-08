import { Component, Input, OnInit } from '@angular/core';
import { DashboardFilter } from '../../models/dashboard-request.model';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.scss']
})
export class CardDataComponent implements OnInit {
  @Input() description: string;
  @Input() value: number;
  @Input() filters: DashboardFilter[];
  @Input() color: string = "black";
  campo:string="";
  tabela:string="";
  nome:string="";
  fato:string="";
  constructor() { }

  ngOnInit(): void {
    this.campo = sessionStorage.getItem("campo");
    this.tabela = sessionStorage.getItem("tabela");
    this.nome = sessionStorage.getItem("nome");
    this.fato = sessionStorage.getItem("fato");
  }

 
  formatarData(dataISO: string): string {
    const data = new Date(dataISO);
    if (isNaN(data.getTime())) {
        throw new Error('Data inválida');
    }

    return data.toLocaleDateString('pt-BR');
}

}
