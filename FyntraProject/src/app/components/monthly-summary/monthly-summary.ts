import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-monthly-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './monthly-summary.html',
  styleUrl: './monthly-summary.css',
})
export class MonthlySummary {
  readonly total = input.required<number>();
  readonly paid = input.required<number>();
  readonly expenseCount = input.required<number>();
  readonly pendingCount = input.required<number>();
}
