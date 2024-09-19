import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements AfterViewInit {
  public gradientStroke: any;
  public chartColor = "#FFFFFF";
  public canvas: any;
  public ctx: any;
  public gradientFill: any;
  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  @Input() public chartId: string = '';
  @Input() public lineChartType: string = 'line';
  @Input() public lineChartData: Array<any>;
  @Input() public lineChartOptions: any;
  @Input() public lineChartLabels: Array<any>;
  @Input() public lineChartColors: Array<any>
  @Input() public idx: number = 0;

  constructor() { }

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
}
