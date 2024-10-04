import { IIndexador } from "./indexador.interface";
import { ITipoProduto } from "./tipo-produto.interface";

export interface IRendaFixa {
  id?: number;
  descricao: string;
  dataValidade: string;
  investimentoMinimo: number;
  tipoProdutoId: number;
  tipoProduto?: ITipoProduto;
  indexadorId: number;
  indexador?: IIndexador;
}
