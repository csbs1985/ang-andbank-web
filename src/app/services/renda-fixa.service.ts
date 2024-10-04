import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { IRendaFixa } from "../models/renda-fixa.interfcace";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class RendaFixaService {
  private _apiService = inject(ApiService);

  rendaFixa$ = new BehaviorSubject<IRendaFixa>({
    id: 0,
    descricao: "",
    dataValidade: "",
    investimentoMinimo: 0,
    tipoProdutoId: 0,
    tipoProduto: {
      id: 0,
      nome: ""
    },
    indexadorId: 0,
    indexador: {
      id: 0,
      nome: ""
    }
  });

  rendaFixaFilter$ = new BehaviorSubject<string>("");

  rendaFixaList$ = new BehaviorSubject<IRendaFixa[]>([]);

  getRendaFixa(): Observable<IRendaFixa[]> {
    return this._apiService.getRendaFixa().pipe(
      map((response: any) => {
        const list = response as IRendaFixa[];
        this.rendaFixaList$.next(list);
        return list;
      })
    );
  }
}
