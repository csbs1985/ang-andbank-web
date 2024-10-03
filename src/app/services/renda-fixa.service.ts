import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class RendaFixaService {
  private _apiService = inject(ApiService);

  getRendaFixa(): Observable<Object> {
    return this._apiService.getRendaFixa();
  }
}
