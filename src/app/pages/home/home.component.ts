import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BannerComponent } from '../../components/banner/banner.component';
import { IndicationComponent } from '../../components/indication/indication.component';
import { IRendaFixa } from '../../models/renda-fixa.interfcace';
import { RendaFixaService } from '../../services/renda-fixa.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, BannerComponent, IndicationComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private _rendaFixaService = inject(RendaFixaService);

  protected rendaFixaList = new BehaviorSubject<IRendaFixa[]>([]);
  protected dataLoaded = new BehaviorSubject<boolean>(false);

  protected _rendaFixaFisrts: IRendaFixa[] = [];
  protected _rendaFixaSearch: IRendaFixa[] = [];

  ngOnInit(): void {
    this.getRendaFixa();
  }

  protected async getRendaFixa(): Promise<void> {
    await this._rendaFixaService.getRendaFixa().subscribe((response: any) => {
      this.rendaFixaList.next(response);
      this._rendaFixaFisrts = response.slice(0, 10);
      this.dataLoaded.next(true);
    });
  }

  protected filterRendaFixa(): void {
    this._rendaFixaSearch = this.rendaFixaList.value.filter((item: IRendaFixa) => item.descricao.includes("a"));
  }
}

