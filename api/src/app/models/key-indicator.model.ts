import { DashboardFilter } from "./dashboard-request.model";

export interface KeyIndicator {
  indicador: DashboardFilter;
  filtro: DashboardFilter;
  usuario: string;
  descricao: string;
}
