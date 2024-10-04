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

  postRendaFixa(payload: object): void {
    // const rendaFixa = this.rendaFixa$.value;
    // {
    //   id: 0,
    //   descricao: rendaFixa.descricao,
    //   dataValidade: rendaFixa.dataValidade,
    //   investimentoMinimo: rendaFixa.investimentoMinimo,
    //   tipoProdutoId: rendaFixa.tipoProdutoId,
    //   indexadorId: rendaFixa.indexadorId,
    // };

    // this._apiService.postRendaFixa(payload)
    //   .subscribe(response => {
    //     if (response) {
    //       console.log('Item created successfully!');
    //     }
    //   }, error => {
    //     console.log('Error creating item:', error);
    //   });
  }

  // putRendaFixa(rendaFixa: object) {
  //  const payload = this.fillPayload(rendaFixa);
  //
  //   this._apiService.putRendaFixa(id, payload)
  //     .subscribe(response => {
  //       if (response.success) {
  //         console.log('Item edited successfully!');
  //       } else {
  //         console.log('Error editing item:', response.error);

  //       }
  //     }, error => {
  //       console.log('Error editing item:', error);
  //     });
  // }

  // deleteRendaFixa(id: number) {
  //   this._apiService.deleteRendaFixa(id)
  //     .subscribe(response => {
  //       if (response.success) {
  //         console.log('Item deleted successfully!');
  //       } else {
  //         console.log('Error deleting item:', response.error);
  //       }
  //     }, error => {
  //       console.log('Error deleting item:', error);
  //     });
  // }
}
