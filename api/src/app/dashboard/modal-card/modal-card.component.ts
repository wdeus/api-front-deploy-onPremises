import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss']
})
export class ModalCardComponent implements OnInit {
    @Input() itemList: any;
    idXGrafico:any;
    itemListDimensao:any;
    itemListDimensaoAux:any
    filterType: string = ''; 
    dataFilterFato: any[] = [];
    dataFilterDimensao: any[] = [];
    selectedFato: string | undefined; 
    selectedItem: string | undefined; 
    selectedFatoCampo: string | undefined;
    todosCampos: string[] = [];
    todosCamposDimensao: string[] = [];
    itemListDimensaoCampo:any[] = [];
    selectedDimensao_filtro:string | undefined;
    filtro_eixoX:string | undefined;
    selectedDimensao: string | undefined;
    selectedItemDimensao: string | undefined;
    selectedItemDimensaoCampo2: string | undefined;
    selectedItemDimensaoComparador: string | undefined;
    selectedItemComparador:string | undefined;
    selectedItemDimensaoValor:string | undefined;
    selectedItemDimensaoCampo2Fato:string | undefined;
    varAux: any;
    varAuxCard:any;
    constructor(public activeModal: NgbActiveModal, private httpService: HttpClient) { }
  
    ngOnInit(): void {
      const card_index = sessionStorage.getItem("card_index");
      this.varAuxCard = card_index
    //  this.filter(); 
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
            
            this.itemList = responses.find(item => item.nome == this.selectedFato);
            
            this.todosCampos = this.itemList.campos[0].split(',');
          },
        error: (error) => {
          console.error('Erro ao carregar filtros:', error);
        }
      });
    }
  
    onFatoChange(selectedValue: string): void {
     
      this.selectedFato = selectedValue;
      
      const request = this.httpService.get(`http://localhost:8080/filtros/dimensoes?fato=${this.selectedFato}`).pipe(
        catchError(error => {
          console.error('Erro ao buscar filtro de dimensões:', error);
          return of([]); // Retorna um array vazio em caso de erro
        })
      );
  
      request.subscribe({
        next: (responses) => {
          this.itemListDimensao = responses; 
          this.todosCamposDimensao = []; 
          
          this.itemListDimensao.forEach(item => {
            this.todosCamposDimensao.push(...item.campos.flatMap(campo => campo.split(','))); 
          });
        },
        error: (error) => {
          console.error('Erro ao carregar filtros:', error);
        }
      });
  
      this.updateCampos(); 
    }
  
  
    updateCampos(): void {
    }
  
    configure(): void {
       
        window.location.reload()   
  
      
    }
  
     formatarString(input: string): string {
      if (input.startsWith('dim_')) {
        input = input.substring(4);
      }
      
      return input
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  
   
    saveSelectedValue(key: string, value: any) {
      sessionStorage.setItem(key, value);
      this.onFatoChange(value)
      console.log(`Valor salvo: ${key} = ${value}`); // Para depuração
    }
    
  }
  
