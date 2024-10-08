import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.scss']
})
export class ModalConfigComponent implements OnInit {
  @Input() itemList: any;
  filterType: string = ''; 
  dataFilterFato: any[] = [];
  dataFilterDimensao: any[] = [];
  dataFilterCampos: any[] = [];
  selectedItem: string | undefined; 
  selectedCampo: string | undefined;

  constructor(public activeModal: NgbActiveModal, private httpService: HttpClient) { }

  ngOnInit(): void {
    this.filter(); // Inicializa o filtro
  }

  close(): void {
    this.activeModal.dismiss('Modal closed');
  }

  selectedFato: string | undefined; // Adicione isso na classe



  filter(): void {
    let request;
  
    if (this.filterType === 'fato') {
      request = this.httpService.get("http://localhost:8080/filtros/fatos").pipe(
        catchError(error => {
          console.error('Erro ao buscar filtro fato:', error);
          return of([]);
        })
      );
    } else if (this.filterType === 'dimensao') {
      if (!this.selectedFato) {
        return; 
      }
      request = this.httpService.get(`http://localhost:8080/filtros/dimensoes?fato=${this.selectedFato}`).pipe(
  
        catchError(error => {
          console.error(`Erro ao buscar dimensao para ${this.selectedFato}:`, error);
          return of([]);
        })
      );
    } else {
      return; 
    }
  
    request.subscribe({
      next: (responses) => {
        if (this.filterType === 'fato') {
          this.dataFilterFato = responses;
          this.itemList = this.dataFilterFato;
          
        } else if (this.filterType === 'dimensao') {
          this.dataFilterDimensao = responses; 
          this.itemList = this.dataFilterDimensao; 
       
        }
        console.log("Resposta do filtro fato: ", this.dataFilterFato);
        if (this.filterType === 'dimensao') {
          const dataFilterCampos = this.itemList.map(item => item.nome == this.selectedItem).campos;
          console.log("Resposta do filtro dimensao: ",dataFilterCampos)
        }
      },
      error: (error) => {
        console.error('Erro ao carregar filtros:', error);
      }
    });
  }
  



  // Novo método para capturar a mudança no segundo filtro
  onFatoChange(selectedValue: string): void {
    this.selectedFato = selectedValue;
    
    this.filter(); 
  }


  configure(): void {
    if (this.selectedItem) {
      if(this.filterType == 'dimensao'){
        const campos = this.dataFilterDimensao.find(item => item.nome === this.selectedItem ).alias;
        console.log("tabela selecionada: ",campos)
        console.log(this.dataFilterDimensao)
        sessionStorage.setItem("tabela",campos);
      }
      if(this.filterType === 'fato'){
        const campos = this.dataFilterFato.find(item => item.nome === this.selectedItem).alias;
        sessionStorage.setItem("tabela",campos);
        console.log("tabela selecionada: ",campos)
      
      }
      if(this.campos != null){
        const selectedItemData = this.dataFilterDimensao.find(item => item.nome === this.selectedItem);
        sessionStorage.setItem("fato",this.selectedFato);
        if (selectedItemData) {
          const campos = selectedItemData.campos;
          const camposSelecionado = campos[0]?.split(',').map(item => item.trim()).find(item => item === this.selectedCampo);
          sessionStorage.setItem("tabela",selectedItemData.alias);
          sessionStorage.setItem("campo",camposSelecionado)
          window.location.reload();
        }
      
      }
    } else {
      console.log("Nenhum item selecionado.");
    }
  }


  get campos(): string[] {
    if (!this.selectedItem) return [];
    
    const selectedItemData = this.dataFilterDimensao.find(item => item.nome === this.selectedItem);
    
    if (selectedItemData) {
      const campos = selectedItemData.campos;
  
      if (typeof campos === 'object' && campos !== null) {
        const camposSelecionado = campos[0]?.split(',').map(item => item.trim()).find(item => item === this.selectedCampo);
        sessionStorage.setItem("tabela",selectedItemData.alias);
        sessionStorage.setItem("nome",selectedItemData.nome)
        console.log("Session storage CAMPO preenchido com:",selectedItemData.alias);
        return campos[0].split(',');
      }
      
      
    }
    
    return [];
  }
  
  
  
      
  
}
