import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'modal-config',
  templateUrl: './modal-config.component.html',
  styleUrls: ['./modal-config.component.scss']
})
export class ModalConfigComponent implements OnInit {

  private tokenAuth: string | null = localStorage.getItem("authToken");
 
  idXGrafico: number;
  tipo: string;

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

    this.form.controls.eixoY.get('nome').valueChanges.subscribe(val => {
      const dimensao = this.dimensao.filter(x => x.nome == val)[0]
      this.dimensaoCampos = dimensao.campos[0].split(',')
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
 
    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);

    this.httpService.get("http://localhost:8080/filtros/fatos", { headers })
      .subscribe({
        next: (responses: any[]) => {
          this.fatos = responses
        }
      });
  }

  onFatoChange(value: string): void {
    
    const headers = new HttpHeaders().set('Authorization', `${this.tokenAuth}`);

    this.httpService.get(`http://localhost:8080/filtros/dimensoes?fato=${value}`, { headers })
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
    const form = this.form.value;
    if (!this.form.controls.filtros.get('0').get('nome').value) {
      form.filtros = [];
    }
    sessionStorage.setItem(this.tipo + this.idXGrafico, JSON.stringify(form))
  }

  close(): void {
    this.activeModal.dismiss('Modal closed');
  }
}




