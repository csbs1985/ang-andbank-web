import { Component, Input } from '@angular/core';
import { NumberPipe } from '../../pipes/number.pipe';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NumberPipe],
  templateUrl: './banner.component.html'
})
export class BannerComponent {
  @Input() total: number = 1000;
}
