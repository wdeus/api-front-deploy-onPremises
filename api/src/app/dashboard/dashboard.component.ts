import { Component, OnInit, Pipe } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { DashboardRequest, FiltrosCampos } from '../models/dashboard-request.model';
import { GraphicParameters } from '../models/graphic-parameters.model';
import { DashboardService } from '../services/dashboard.service';
import { CardData } from '../services/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { ModalConfigComponent } from './modal-config/modal-config.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public chartColor: any;
  public canvas: any;
  public ctx: any;
  public gradientFill: any;
  public options: any;
  private dataFilterFato:any;
  
  private dataFilterDimensao:any;
  graphicOneParameter?: GraphicParameters;
  graphicTwoParameter?: GraphicParameters;
  graphicThreeParameter?: GraphicParameters;

  isLoading: boolean = true;

  cardData: { request: DashboardRequest, value: number }[] = [];
  itemList:FiltrosCampos[] = [];
  idXGrafico:string;
  idXgraficoAux:number;
  constructor(
    private dashboardService: DashboardService,
    private httpService:HttpClient,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.chartColor = "#FFFFFF";
    this.loadData();
  }

  createGraphic(title: string, color: 'orange' | 'green', labels: string[], data: number[]) {
    const colorObj = color == 'green' ? {
      borderColor: "#18ce0f",
      pointBorderColor: "#FFF",
      pointBackgroundColor: "#18ce0f",
      backgroundColor: this.gradientFill
    } : {
      borderColor: "#f96332",
      pointBorderColor: "#FFF",
      pointBackgroundColor: "#f96332",
      backgroundColor: this.gradientFill
    }

    return {
      labels: labels,
      data: [
        {
          label: title,
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 2,
          data: data
        }
      ],
      colors: [colorObj],
      type: 'line'
    }
  }

  createBigGraphic(title: string, labels: string[], data: number[]) {
    this.canvas = document.getElementById("mainChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    this.options = {
      layout: {
        padding: {
          left: 20,
          right: 40,
          top: 0,
          bottom: 0
        }
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
    };
    return {
      labels: labels,
      data: [
        {
          label: title,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          borderWidth: 2,
          data: data
        }
      ],
      colors: [
        {
          backgroundColor: this.gradientFill,
          borderColor: this.chartColor,
          pointBorderColor: this.chartColor,
          pointBackgroundColor: "#2c2c2c",
          pointHoverBackgroundColor: "#2c2c2c",
          pointHoverBorderColor: this.chartColor,
        }
      ],
      type: 'line'
    }
  }
  
 


  createCardRequest(idx: number): DashboardRequest {
    const campo = sessionStorage.getItem("campo")
    const campo_vagas_abertas = sessionStorage.getItem("campo_vagas_abertas")
    if (idx == 1) {
      if(this.idXgraficoAux == 0){
      const campo = sessionStorage.getItem("campo");
      const fato = sessionStorage.getItem("fato");
      const dimensao = sessionStorage.getItem("dimensao");
      const campo_dimensao = sessionStorage.getItem("campo_dimensao");
      const campo_dimensao_filtro = sessionStorage.getItem("campo_dimensao_filtro")
      const comparador = sessionStorage.getItem("comparador");
      const campo_vagas_abertas = sessionStorage.getItem("campo_vagas_abertas");
      const valor = sessionStorage.getItem("valor");
      const filtro_dimensao = sessionStorage.getItem("filtro_dimensao")
      
      return {
        'description': 'Vagas em aberto',
        'eixoX': {
          'nome': fato ?? 'fato_vaga',
          'campo': campo ?? 'nr_posicoes_abertas'
        },
        'filtros': []
      }
    }
    }

    if (idx == 2) {
      if(this.idXgraficoAux == 1){
      const now = new Date();

      now.setDate(now.getDate() - 7)

      const campo = sessionStorage.getItem("campo");
      const fato = sessionStorage.getItem("fato");
      const dimensao = sessionStorage.getItem("dimensao");
      const campo_dimensao = sessionStorage.getItem("campo_dimensao");
      const campo_dimensao_filtro = sessionStorage.getItem("campo_dimensao_filtro")
      const comparador = sessionStorage.getItem("comparador");
      const campo_vagas_abertas = sessionStorage.getItem("campo_vagas_abertas");
      const valor = sessionStorage.getItem("valor");
      const filtro_dimensao = sessionStorage.getItem("filtro_dimensao")
    
      
      return {
        'description': 'Entrevistas marcadas',
        'eixoX': {
          'nome': fato ?? 'fato_entrevista',
          'campo': campo ??   'nr_entrevistas'
        },
        'filtros': [
          {
            'nome': filtro_dimensao ?? 'dim_entrevista',
            'campo': campo_dimensao_filtro ?? 'dt_entrevista',
            'valor': valor ??  now.toISOString().split('T')[0],
            'comparador': comparador ?? '>='
          }
        ]
      }
    }
    }

    return {
      'description': 'Feedbacks Totais',
      'eixoX': {
        'nome': 'fato_entrevista',
        'campo': 'nr_entrevistas'
      },
      'filtros': []
    }
  }

  captureCanvasIds(chartId: string): void {
    const canvasId = chartId; 
  
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      this.idXGrafico = canvas.id
      sessionStorage.setItem("grafico_id_selecionado",this.idXGrafico)
    } else {
      alert('Canvas selecionado não encontrado.');
    }
  }
  
  
  
  createGraphicRequest(idx: number): DashboardRequest {
    const campo = sessionStorage.getItem("campo");
    const fato = sessionStorage.getItem("fato");
    const dimensao = sessionStorage.getItem("dimensao");
    const campo_dimensao = sessionStorage.getItem("campo_dimensao");
    const campo_dimensao_filtro = sessionStorage.getItem("campo_dimensao_filtro")
    const comparador = sessionStorage.getItem("comparador");
    const campo_vagas_abertas = sessionStorage.getItem("campo_vagas_abertas");
    const valor = sessionStorage.getItem("valor");
    const filtro_dimensao = sessionStorage.getItem("filtro_dimensao")
    



    const campo_grafico = sessionStorage.getItem("campo_grafico_vagas_abertas");
    const fato_grafico = sessionStorage.getItem("fato_grafico_vagas_abertas");
    const dimensao_grafico = sessionStorage.getItem("dimensao_grafico_vagas_abertas");
    const campo_dimensao_grafico = sessionStorage.getItem("campo_dimensao_grafico_vagas_abertas");
    const campo_dimensao_filtro_grafico = sessionStorage.getItem("campo_dimensao_filtro_grafico_vagas_abertas")
    const comparador_grafico = sessionStorage.getItem("comparador_grafico_vagas_abertas");
    const campo_vagas_abertas_grafico = sessionStorage.getItem("campo_vagas_abertas_grafico_vagas_abertas");
    const valor_grafico = sessionStorage.getItem("valor_grafico_vagas_abertas");
    const filtro_dimensao_grafico = sessionStorage.getItem("filtro_dimensao_grafico_vagas_abertas")
  
    const grafico_id_selecionado = sessionStorage.getItem("grafico_id_selecionado");
    const campo_obj = JSON.parse(sessionStorage.getItem("campo-obj") || '{}'); // Parse JSON


    if (idx == 1) {
      if(grafico_id_selecionado == 'chartOne'){
      return {
        'description': 'Tempo medio do processo',
        "eixoX": {
          "nome": fato ?? "fato_vaga",
          "campo": campo ?? "tempo_medio_processo"
        },
        "eixoY": {
          "nome": dimensao ?? "dim_vaga",
          "campo": campo_dimensao ?? "titulo"
        },
        "filtros": [
          {
            "nome": filtro_dimensao ??  "dim_periodo",
            "campo":campo_dimensao_filtro ?? "dt_abertura",
            "comparador":  comparador ?? ">=",
            "valor": valor ?? "2000-09-22"
          }
        ]
      }
    }
    else{
      return {
        'description': 'Tempo medio do processo',
        "eixoX": {
          "nome":  "fato_vaga",
          "campo":  "tempo_medio_processo"
        },
        "eixoY": {
          "nome":  "dim_vaga",
          "campo":  "titulo"
        },
        "filtros": [
          {
            "nome":   "dim_periodo",
            "campo": "dt_abertura",
            "comparador":   ">=",
            "valor": "2000-09-22"
          }
        ]
      }
    }
    }
    if (idx == 2) {
      if(grafico_id_selecionado == 'chartTwo'){
      return {
        'description':  'Numero de processos abertos nos ultimos 12 meses ' ,
        "eixoX": {
          "nome": fato_grafico ?? "fato_vaga",
          "campo":  campo_grafico ?? "nr_posicoes_abertas"
        },
        "eixoY": {
          "nome": dimensao_grafico ?? "dim_vaga",
          "campo":  campo_dimensao_grafico ?? "titulo"
        },
        "filtros": [
          {
            "nome": filtro_dimensao_grafico ??  "dim_periodo",
            "campo": campo_dimensao_filtro_grafico ?? "dt_abertura",
            "comparador": comparador_grafico ?? ">=",
            "valor": valor_grafico ?? "2023-09-22"
          }
        ]
      }
    }
      else{
        return {
          'description':  'Numero de processos abertos nos ultimos 12 meses ' ,
          "eixoX": {
            "nome":  "fato_vaga",
            "campo":   "nr_posicoes_abertas"
          },
          "eixoY": {
            "nome":  "dim_vaga",
            "campo":   "titulo"
          },
          "filtros": [
            {
              "nome":   "dim_periodo",
              "campo":  "dt_abertura",
              "comparador":  ">=",
              "valor": "2023-09-22"
            }
          ]
        }
      }
    }
    
    return {
      'description': 'Feedbacks recebidos',
        eixoX: {
            nome: campo_obj.eixoX?.nome ?? "fato_entrevista",
            campo: campo_obj.eixoX?.campo ?? "nr_entrevistas"
        },
        eixoY: {
            nome: campo_obj.eixoY?.nome ?? "dim_feedback",
            campo: campo_obj.eixoY?.campo ?? "descricao"
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
  }



  loadData() {
    const [requestCardOne, requestCardTwo, requestCardThree] =
      [this.createCardRequest(1), this.createCardRequest(2), this.createCardRequest(3)]

    const [requestGraphicOne, requestGraphicTwo, requestGraphicThree] = [
      this.createGraphicRequest(1), this.createGraphicRequest(2), this.createGraphicRequest(3),
    ]

    forkJoin({
      cardOne: this.dashboardService.getCardData(requestCardOne),
      cardTwo: this.dashboardService.getCardData(requestCardTwo),
      cardThree: this.dashboardService.getCardData(requestCardThree),
      graphicOne: this.dashboardService.getGraphicData(requestGraphicOne),
      graphicTwo: this.dashboardService.getGraphicData(requestGraphicTwo),
      graphicThree: this.dashboardService.getGraphicData(requestGraphicThree),
    })
      .subscribe(response => {
        this.cardData.push({ value: response.cardOne.reduce((a, b) => a + b, 0), request: requestCardOne });
        this.cardData.push({ value: response.cardTwo.reduce((a, b) => a + b, 0), request: requestCardTwo });
        this.cardData.push({ value: response.cardThree.reduce((a, b) => a + b, 0), request: requestCardThree });

        let data = response.graphicTwo.map(x => x[0]);
        let labels = response.graphicTwo.map(x => x[1])
        this.graphicTwoParameter = this.createGraphic(requestGraphicTwo.description, 'green', labels, data)

        data = response.graphicThree.map(x => x[0]);
        labels = response.graphicThree.map(x => x[1])
        this.graphicThreeParameter = this.createGraphic(requestGraphicThree.description, 'orange', labels, data)

        data = response.graphicOne.map(x => x[0]);
        labels = response.graphicOne.map(x => x[1])
        this.graphicOneParameter = this.createBigGraphic(requestGraphicOne.description, labels, data)

        this.isLoading = false;
      });
  }

  loadFiltersCard(card: any, index: number) {
    const cardValue = card.value;
    const modalRef = this.modalService.open(ModalConfigComponent, { 
      size: 'lg', 
      backdrop: 'static' 
  });

  this.idXgraficoAux = index
  
  modalRef.componentInstance.idXGrafico = index;

    this.createCardRequest(index)

  }
  

  loadFilters(chartId: string) {
    const modalRef = this.modalService.open(ModalConfigComponent, { 
      size: 'lg', 
      backdrop: 'static' 
  });
  
  modalRef.componentInstance.idXGrafico = this.idXGrafico;
    
    forkJoin({
      fato: this.httpService.get("http://localhost:8080/filtros/fato").pipe(
        catchError(error => {
          console.error('Erro ao buscar filtro fato:', error);
          return of([]); // Retorna um observable vazio
        })
      ),
      dimensao: this.httpService.get("http://localhost:8080/filtros/dimensao").pipe(
        catchError(error => {
          console.error('Erro ao buscar filtro dimensao:', error);
          return of([]); // Retorna um observable vazio
        })
      )
    }).subscribe({
      next: (responses) => {
        this.dataFilterFato = responses.fato;
        this.dataFilterDimensao = responses.dimensao;
  
        this.itemList = [...this.dataFilterFato, ...this.dataFilterDimensao];
        modalRef.componentInstance.itemList = this.itemList;
  
        console.log("Resposta do filtro fato: ", this.dataFilterFato);
        console.log("Resposta do filtro dimensao: ", this.dataFilterDimensao);
  
        // Chama a função para capturar os IDs dos canvas do gráfico específico
        this.captureCanvasIds(chartId);
      },
      error: (error) => {
        console.error('Erro ao carregar filtros:', error);
      }
    });
  }
  
  

  transform(items: any[], filter: string): any[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => 
      item.alias.toLowerCase().includes(filter.toLowerCase()) || 
      item.nome.toLowerCase().includes(filter.toLowerCase())
    );
  }
  
}
