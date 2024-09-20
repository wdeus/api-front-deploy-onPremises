export interface DashboardRequest{
  description:string;
  eixoX: DashboardAxis;
  eixoY?: DashboardAxis | null;
  filtro: DashboardFilter[]

}

export interface DashboardAxis{
    nome: string;
    campo: string;
}

export interface DashboardFilter{
  nome: string;
  campo: string;
  comparador: '<>' | '>' | '<' | '>=' | '<=' | '='
  valor: string;
}
