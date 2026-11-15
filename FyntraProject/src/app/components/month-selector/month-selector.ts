import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-month-selector',
  standalone: true,
  imports: [],
  templateUrl: './month-selector.html',
  styleUrl: './month-selector.css',
})
export class MonthSelector {
  readonly monthLabel = input.required<string>();
  readonly monthChange = output<number>();
}
