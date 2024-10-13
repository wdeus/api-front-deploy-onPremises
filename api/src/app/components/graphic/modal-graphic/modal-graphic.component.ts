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
  selectedDimensao: string | undefined;
  selectedItemDimensao: string | undefined;
  selectedItemDimensaoCampo2: string | undefined;
  selectedItemDimensaoComparador: string | undefined;
  selectedItemComparador:string | undefined;
  selectedItemDimensaoValor:string | undefined;
  selectedItemDimensaoCampo2Fato:string | undefined;
  varAux: any;
  constructor(public activeModal: NgbActiveModal, private httpService: HttpClient) { }

  ngOnInit(): void {
  //  this.filter(); // Inicializa o filtro
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
    this.saveToSessionStorage('selectedFato', this.selectedFato);
    
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

    this.updateCampos(); // Atualiza os campos após a mudança do fato
  }


  updateCampos(): void {
  }

  configure(): void {
      const selectedData = this.filterType === 'dimensao' ? this.dataFilterDimensao : this.dataFilterFato;
      const campos = selectedData.find(item => item.nome === this.selectedItem)?.alias;
     
    const campo = sessionStorage.getItem("campo");
    const fato = sessionStorage.getItem("fato");
    const dimensao = sessionStorage.getItem("dimensao");
    const campo_dimensao = sessionStorage.getItem("campo_dimensao");
    const campo_dimensao_filtro = sessionStorage.getItem("campo_dimensao_filtro")
    const comparador = sessionStorage.getItem("comparador");
    const valor = sessionStorage.getItem("valor");
    const filtro_dimensao = sessionStorage.getItem("filtro_dimensao")
    const obj =   {
      'description': 'Feedbacks recebidos',
      "eixoX": {
        "nome": fato ??   "fato_entrevista",
        "campo": campo ??  "nr_entrevistas"
      },
      "eixoY": {
        "nome": dimensao  ?? "dim_feedback",
        "campo": campo_dimensao ?? "descricao"
      },
      "filtros": [
        {
          "nome": campo_dimensao_filtro ?? "dim_entrevista",
          "campo": filtro_dimensao ?? "dt_entrevista",
          "comparador": comparador ?? ">=",
          "valor": String(valor) ?? "2023-09-22"
        }
      ]
    }

    sessionStorage.setItem("campo-obj",JSON.stringify(obj)) 
      window.location.reload()   

    
  }

  saveToSessionStorage(key: string, value: any) {
    switch (key) {
      case 'selectedItemDimensaoCampo2Fato':
        this.varAux = value;
        this.itemListDimensaoAux = this.itemListDimensao.find(item => item.nome === this.varAux).campos[0].split(',')
        sessionStorage.setItem("filtro_dimensao",value);
        break;
      case 'selectedItemDimensaoValor':
        sessionStorage.setItem("filtro_valor",value);
        break;
      case 'selectedItemDimensaoComparador':
        sessionStorage.setItem("comparador",value)
        break;
      case 'selectedItemDimensaoCampo2':
        console.log("a: ",this.itemList);
        console.log("b:",this.todosCampos);
        console.log("c:",this.itemListDimensao)
        
        
        sessionStorage.setItem("campo_dimensao_filtro",value)
        break;
      case 'selectedItemDimensao':
        sessionStorage.setItem("campo_dimensao",value)
        break;
      case 'selectedFatoCampo':
        sessionStorage.setItem("campo", value);
        break;
      case 'selectedDimensao':
        this.todosCamposDimensao = []; 
          
        const dimensaoSelecionada = this.itemListDimensao.find(item => item.nome === value);
        console.log("abacate: ",dimensaoSelecionada)
        if (dimensaoSelecionada) {
          this.todosCamposDimensao.push(...dimensaoSelecionada.campos.flatMap(campo => campo.split(',')));
        }
        sessionStorage.setItem("dimensao",value);
        break;
      case 'selectedFato':
        sessionStorage.setItem("fato", value);
        
        this.filter();
        break;
      case 'selectedItem':
        sessionStorage.setItem("tabela", value);
        break;
      case 'filterType':
        sessionStorage.setItem("filterType", value);
        break;
    }

    const campo = sessionStorage.getItem("campo");
    const fato = sessionStorage.getItem("fato");
    const dimensao = sessionStorage.getItem("dimensao");
    const campo_dimensao = sessionStorage.getItem("campo_dimensao");
    const campo_dimensao_filtro = sessionStorage.getItem("campo_dimensao_filtro")
    const comparador = sessionStorage.getItem("comparador");
    const campo_vagas_abertas = sessionStorage.getItem("campo_vagas_abertas");
    const valor = sessionStorage.getItem("valor");
    const filtro_dimensao = sessionStorage.getItem("filtro_dimensao")
    
    const obj =   {
      'description': 'Feedbacks recebidos',
      "eixoX": {
        "nome": fato ??   "fato_entrevista",
        "campo": campo ??  "nr_entrevistas"
      },
      "eixoY": {
        "nome": dimensao  ?? "dim_feedback",
        "campo": campo_dimensao ?? "descricao"
      },
      "filtros": [
        {
          
          "nome": filtro_dimensao ?? "dim_entrevista",
          "campo": campo_dimensao_filtro ?? "dt_entrevista",
          "comparador": comparador ?? ">=" ,
          "valor": valor ?? "2023-09-22"
        }
      ]
    }

    sessionStorage.setItem("campo-obj",JSON.stringify(obj))
  }
}


