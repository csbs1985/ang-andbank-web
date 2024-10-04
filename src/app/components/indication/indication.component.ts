import { CurrencyPipe, DatePipe, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IRendaFixa } from '../../models/renda-fixa.interfcace';

@Component({
  selector: 'app-indication',
  standalone: true,
  imports: [NgFor, CurrencyPipe, DatePipe],
  templateUrl: './indication.component.html'
})
export class IndicationComponent implements OnInit {
  @Input() content: IRendaFixa[] = [];

  protected randonListRendaFixa: IRendaFixa[] = [];

  ngOnInit(): void {
    this.getRegitersRandon();
  }

  private getRegitersRandon(): void {
    this.randonListRendaFixa = this.content!
      .concat([])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }
}
