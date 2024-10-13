export interface DashboardRequest{
  description:string;
  eixoX: DashboardAxis;
  eixoY?: DashboardAxis | null;
  filtros: DashboardFilter[]

}

export interface DashboardAxis{
    nome: string;
    campo: string;
}

export interface DashboardFilter{
  nome: string;
  campo: string;
  comparador:string;
  valor: string;
}


export interface FiltrosCampos{
  nome:string;
  campos: string[];
  alias:string;

}
