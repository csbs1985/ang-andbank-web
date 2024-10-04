import { Component, inject, Input } from '@angular/core';
import { IRendaFixa } from '../../models/renda-fixa.interfcace';
import { NumberPipe } from '../../pipes/number.pipe';
import { RendaFixaService } from '../../services/renda-fixa.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NumberPipe],
  templateUrl: './banner.component.html'
})
export class BannerComponent {
  @Input() content: IRendaFixa[] = [];

  private _rendaFixaService = inject(RendaFixaService);

  protected onInputChange(value: string): void {
    this._rendaFixaService.rendaFixaFilter$.next(value);
  }
}
