import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfigComponent } from '../../dashboard/modal-config//modal-config.component';
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
  @Input() idx: number;

  campo: string = "";
  tabela: string = "";
  nome: string = "";
  fato: string = "";

  constructor(private ngbModal: NgbModal) { }

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

  openModal() {
    let m = this.ngbModal.open(ModalConfigComponent)
    m.componentInstance.idXGrafico = this.idx;
    m.componentInstance.tipo = 'card';
  }
}
