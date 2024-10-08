import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { IPostPayload } from "../models/post-payload.interfcace";
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

  postRendaFixa(payload: IPostPayload): Promise<boolean> {
    return this._apiService.postRendaFixa(payload).toPromise()
      .then(() => true)
      .catch(() => false);
  }

  putRendaFixa(payload: IPostPayload): Promise<boolean> {
    return this._apiService.putRendaFixa(payload).toPromise()
      .then(() => true)
      .catch(() => false);
  }

  deleteRendaFixa(id: number): Promise<boolean> {
    return this._apiService.deleteRendaFixa(id).toPromise()
      .then(() => true)
      .catch(() => false);
  }
}
