import { DatePipe, NgFor } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { IRendaFixa } from '../../models/renda-fixa.interfcace';
import { NumberPipe } from '../../pipes/number.pipe';
import { RendaFixaService } from '../../services/renda-fixa.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NgFor, NumberPipe, DatePipe],
  templateUrl: './panel.component.html'
})
export class PanelComponent implements OnInit {
  @Input() content: IRendaFixa[] = [];

  private _rendaFixaService = inject(RendaFixaService);

  protected _filterString: string = "";

  ngOnInit(): void {
    this.getRendaFixaFilter();
  }

  protected getRendaFixaFilter(): void {
    this._rendaFixaService.rendaFixaFilter$.subscribe((value: string) => {
      this._filterString = value;
    });
  }

  protected selectRendaFixa(item: IRendaFixa): void {
    this._rendaFixaService.rendaFixa$.next(item);
  }
}
