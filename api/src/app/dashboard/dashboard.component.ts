import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { DashboardRequest } from '../models/dashboard-request.model';
import { GraphicParameters } from '../models/graphic-parameters.model';
import { CardData, DashboardService, GraphicData } from '../services/dashboard.service';

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
  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>
  public lineBigDashboardChartType: string;

  private graphicTwoParameter?: GraphicParameters;
  private graphicThreeParameter?: GraphicParameters;

  isLoading: boolean = true;

  cardData: { request: DashboardRequest, value: number }[] = []

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.isLoading = true;
    this.chartColor = "#FFFFFF";
    this.createConfigurations();

    this.createBigGraph();
    this.loadData();
  }

  createGraphicThree(title: string, labels: string[], data: number[]) {
    this.graphicThreeParameter = {
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
      colors: [
        {
          borderColor: "#18ce0f",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#18ce0f",
          backgroundColor: this.gradientFill
        }
      ],
      type: 'line',
      options: this.gradientChartOptionsConfigurationWithNumbersAndGrid
    }
  }

  createGraphicTwo(title: string, labels: string[], data: number[]) {
    this.graphicTwoParameter = {
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
      colors: [
        {
          borderColor: "#f96332",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#f96332",
          backgroundColor: this.gradientFill
        }
      ],
      options: this.gradientChartOptionsConfiguration,
      type: 'line'
    }
  }

  createConfigurations() {
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
    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
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
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

  }

  createBigGraph() {
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    this.lineBigDashboardChartData = [
      {
        label: "Data",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95]
      }
    ];
    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: this.chartColor,
      }
    ];
    this.lineBigDashboardChartLabels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    this.lineBigDashboardChartOptions = {
      layout: {
        padding: {
          left: 20,
          right: 20,
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
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10
          },
          gridLines: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent"
          }

        }],
        xAxes: [{
          gridLines: {
            zeroLineColor: "transparent",
            display: false,

          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold"
          }
        }]
      }
    };
    this.lineBigDashboardChartType = 'line';
  }

  createCardRequest(idx: number): DashboardRequest {
    return {
      'description': 'Candidatos Inscritos',
      'eixoX': {
        'nome': 'fato_vaga',
        'campo': 'nr_candidatos_inscritos'
      },
      'filtros': [
        {
          "nome": "dim_vaga",
          "campo": "titulo",
          "comparador": "=",
          "valor": "Desenvolvedor Java"
        }
      ]
    }

  }

  createGraphicRequest(idx: number): DashboardRequest {
    return {
      'description': '',
      "eixoX": {
        "nome": "fato_vaga",
        "campo": "salario_inicial_medio"
      },
      "eixoY": {
        "nome": "dim_vaga",
        "campo": "titulo"
      },
      "filtros": [
        {
          "nome": "dim_periodo",
          "campo": "dt_abertura",
          "comparador": "<=",
          "valor": "2024-11-02"
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
      graphicTwo: this.dashboardService.getGraphicData(requestGraphicTwo),
      graphicThree: this.dashboardService.getGraphicData(requestGraphicThree),
    })
      .subscribe(response => {
        this.cardData.push({ value: response.cardOne[0], request: requestCardOne });
        this.cardData.push({ value: response.cardTwo[0], request: requestCardOne });
        this.cardData.push({ value: response.cardThree[0], request: requestCardOne });

        let data = response.graphicTwo.map(x => x[0]);
        let labels = response.graphicTwo.map(x => x[1])
        this.createGraphicTwo(requestGraphicTwo.description, labels, data)

        data = response.graphicThree.map(x => x[0]);
        labels = response.graphicThree.map(x => x[1])
        this.createGraphicThree(requestGraphicThree.description, labels, data)

        this.isLoading = false;
      });
  }
}
