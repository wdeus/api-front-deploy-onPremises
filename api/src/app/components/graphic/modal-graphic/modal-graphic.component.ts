import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'modal-graphic',
  templateUrl: './modal-graphic.component.html',
  styleUrls: ['./modal-graphic.component.scss']
})
export class ModalGraphicComponent implements OnInit {


  @Input() itemList: any;
  filterType: string = ''; 
  dataFilterFato: any[] = [];
  dataFilterDimensao: any[] = [];
  selectedFato: string | undefined; 
  selectedItem: string | undefined; 
  selectedFatoCampo: string | undefined;
  todosCampos: string[] = [];
  selectedItemDimensao: string | undefined;

  constructor(public activeModal: NgbActiveModal, private httpService: HttpClient) { }

  ngOnInit(): void {
    this.filter(); // Inicializa o filtro
  }

  close(): void {
    this.activeModal.dismiss('Modal closed');
  }

  filter(): void {
    let request;
  
      request = this.httpService.get("http://localhost:8080/filtros/fatos").pipe(
        catchError(error => {
          console.error('Erro ao buscar filtro fato:', error);
          return of([]);
        })
      );
     
  
    request.subscribe({
      next: (responses) => {
          this.dataFilterFato = responses;
          this.itemList = this.dataFilterFato;
          this.itemList.forEach(item => {
            item.campos.forEach(campo => {
              this.todosCampos.push(...campo.split(','));
            });
          });
        },
      error: (error) => {
        console.error('Erro ao carregar filtros:', error);
      }
    });
  }

  onFatoChange(selectedValue: string): void {
    this.selectedFato = selectedValue;
    this.saveToSessionStorage('selectedFato', selectedValue);
    this.filter(); 
    this.updateCampos();
  }

  configure(): void {
    if (this.selectedItem) {
      const selectedData =  this.dataFilterFato;
      const campos = this.dataFilterFato.find(item => item.nome === this.selectedItem)?.alias;
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:    ",campos)
     sessionStorage.setItem("tabela_vagas_abertas_ultimo_ano",campos);
      window.location.reload();   

    } else {
      console.log("Nenhum item selecionado.");
    }
  }


  updateCampos(): void {
    this.todosCampos = []; // Limpa os campos anteriores

    const selectedData = this.itemList.find(item => item.nome === this.selectedFato);
    if (selectedData && selectedData.campos) {
      this.todosCampos = selectedData.campos[0].split(','); // Carrega os campos do fato selecionado
    }
  }

  saveToSessionStorage(key: string, value: any) {
    switch (key) {
      case 'selectedFatoCampo':
        sessionStorage.setItem("campo_vagas_abertas", value);
        break;
      case 'selectedFato':
        sessionStorage.setItem("fato", value);
        break;
     
      case 'filterType':
        sessionStorage.setItem("filterType", value);
        break;
    }
  }
}



