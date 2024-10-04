import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { BannerComponent } from '../../components/banner/banner.component';
import { IndicationComponent } from '../../components/indication/indication.component';
import { ItemComponent } from '../../components/item/item.component';
import { PanelComponent } from '../../components/panel/panel.component';
import { IRendaFixa } from '../../models/renda-fixa.interfcace';
import { RendaFixaService } from '../../services/renda-fixa.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, BannerComponent, IndicationComponent, PanelComponent, ItemComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private _rendaFixaService = inject(RendaFixaService);

  protected rendaFixaList = this._rendaFixaService.rendaFixaList$.asObservable();
  protected dataLoaded = new BehaviorSubject<boolean>(false);

  protected _rendaFixaFilter: IRendaFixa[] = [];

  ngOnInit(): void {
    this.getRendaFixa();
    this.getRendaFixaFilter();
  }

  protected async getRendaFixa(): Promise<void> {
    this._rendaFixaService.getRendaFixa().subscribe((response: IRendaFixa[]) => {
      this.dataLoaded.next(true);
    });
  }

  protected getRendaFixaFilter(): void {
    this._rendaFixaService.rendaFixaFilter$.subscribe((filterValue: string) => {
      this.filter(filterValue);
    });
  }

  protected filter(value: string): void {
    if (value.length > 2) {
      this._rendaFixaService.rendaFixaList$
        .pipe(map((list: IRendaFixa[]) =>
          list.filter((item: IRendaFixa) => item.descricao.toLowerCase().includes(value.toLowerCase()))))
        .subscribe((filteredArray: IRendaFixa[]) => {
          this._rendaFixaFilter = filteredArray;
        });
    } else {
      this._rendaFixaFilter = [];
    }
  }
}
