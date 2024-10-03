import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _http = inject(HttpClient);

  readonly baseUrl = environment.apiUrl;

  getRendaFixa(): Observable<Object> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer seu_token_aqui',
      'Content-Type': 'application/json',
      'X-Test-Key': "NnBjcAztghCc2O7m6ENOR"
    });

    return this._http.get(`${this.baseUrl}/renda-fixa`, { headers });
  }
}
