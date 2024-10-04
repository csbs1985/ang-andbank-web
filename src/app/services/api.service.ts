import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { IRendaFixa } from "../models/renda-fixa.interfcace";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _http = inject(HttpClient);

  readonly baseUrl = environment.apiUrl;
  private readonly apiKey = "NnBjcAztghCc2O7m6ENOR";

  getRendaFixa(): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Test-Key': this.apiKey
    });

    return this._http.get(`${this.baseUrl}/renda-fixa`, { headers });
  }

  postRendaFixa(payload: IRendaFixa): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Test-Key': this.apiKey
    });

    return this._http.post(`${this.baseUrl}/renda-fixa`, payload, { headers: headers });
  }

  putRendaFixa(payload: IRendaFixa): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Test-Key': this.apiKey
    });

    return this._http.patch(`${this.baseUrl}/renda-fixa`, payload, { headers: headers });
  }

  deleteRendaFixa(id: number): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Test-Key': this.apiKey
    });

    return this._http.delete(`${this.baseUrl}/renda-fixa/${id}`, { headers: headers });
  }
}
