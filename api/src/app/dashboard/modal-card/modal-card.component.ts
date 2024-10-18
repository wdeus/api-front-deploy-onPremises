import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss']
})
export class ModalCardComponent implements OnInit {
  @Input() idXGrafico: number = 1;

  form: FormGroup;

  fatos = [];
  fatosCampos = [];

  dimensao = [];
  dimensaoCampos = [];

  filtroCampos = [];

  constructor(public activeModal: NgbActiveModal, private httpService: HttpClient) { }

  ngOnInit(): void {
    this.createForm();
    this.getFatos();

    this.form.controls.eixoX.get('nome').valueChanges.subscribe(val => {
      const fato = this.fatos.filter(x => x.nome == val)[0]
      this.fatosCampos = fato.campos[0].split(',')
      this.onFatoChange(val);
    })


    this.form.controls.filtros.get('0').get('nome').valueChanges.subscribe(val => {
      const filtros = this.dimensao.filter(x => x.nome == val)[0]
      this.filtroCampos = filtros.campos[0].split(',')
    })
  }



  createForm() {
    this.form = new FormGroup({
      description: new FormControl('', []),
      eixoX: new FormGroup({
        nome: new FormControl('', []),
        campo: new FormControl('', []),
      }),
      eixoY: new FormGroup({
        nome: new FormControl('', []),
        campo: new FormControl('', []),
      }),
      filtros: new FormArray([new FormGroup({
        nome: new FormControl('', []),
        campo: new FormControl('', []),
        comparador: new FormControl('', []),
        valor: new FormControl('', [])
      })])
    })
  }

  getFatos(): void {
    this.httpService.get("http://localhost:8080/filtros/fatos")
      .subscribe({
        next: (responses: any[]) => {
          this.fatos = responses
        }
      });
  }

  onFatoChange(value: string): void {
    this.httpService.get(`http://localhost:8080/filtros/dimensoes?fato=${value}`)
      .subscribe({
        next: (response: any[]) => {
          this.dimensao = response;
        }
      });
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

  configure(): void {

    sessionStorage.setItem('filtro' + this.idXGrafico, JSON.stringify(this.form.value))
    //window.location.reload()
  }

  close(): void {
    this.activeModal.dismiss('Modal closed');
  }
}

