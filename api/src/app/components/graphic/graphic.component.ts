import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalGraphicComponent } from './modal-graphic/modal-graphic.component';
import { catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
interface FiltrosCamposGraphics{
  nome:string;
  campos: string[];
  alias:string;

}
@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})


export class GraphicComponent implements OnInit, AfterViewInit {
  public gradientStroke: any;
  public chartColor = "#FFFFFF";
  public canvas: any;
  public ctx: any;
  public gradientFill: any;
  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;
  public lineChartOptions: any;

  @Input() public idx: number = 0;
  @Input() public chartId: string = '';
  @Input() public description: string = '';
  @Input() public lineChartType: string = 'line';
  @Input() public lineChartData: Array<any>;
  @Input() public lineChartLabels: Array<any>;
  @Input() public lineChartColors: Array<any>
  itemList:FiltrosCamposGraphics[] = [];
  idXGrafico:string;
  idXgraficoAux:number;
  private dataFilterFato:any;
  
  private dataFilterDimensao:any;
 
  constructor( 
    private httpService: HttpClient, 
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.lineChartOptions = this.createDefaultConfig();
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementsByTagName('canvas')[this.idx];
    this.ctx = this.canvas?.getContext("2d");

    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");
  }

  
  loadFilters(chartId: string) {
    sessionStorage.setItem("chart",chartId)
  }

  
  captureCanvasIds(chartId: string): void {
    const canvasId = chartId; 
  
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      this.idXGrafico = canvas.id
      sessionStorage.setItem("grafico_id_selecionado",this.idXGrafico)
    } else {
    }
  }

  createDefaultConfig() {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          },
          ticks: {
            stepSize: 500
          }
        }],
        xAxes: [{
          display: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 15,
          top: 15,
          bottom: 15
        }
      }
    };
  }


  openModal(){
     const modalRef = this.modalService.open(ModalGraphicComponent);
    modalRef.componentInstance.someInput = 'someValue'
  }
}
