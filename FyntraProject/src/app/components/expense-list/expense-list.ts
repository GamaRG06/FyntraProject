import { Component, output, input, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList {
  readonly expenses = input.required<Expense[]>();
  readonly monthLabel = input.required<string>();
  readonly filter = input.required<string>();
  readonly filterChange = output<string>();
  readonly toggleExpense = output<number>();
  readonly newExpense = output<void>();
  readonly visible = computed(() =>
    this.expenses()
      .filter(
        (e) => this.filter() === 'Todos' || (this.filter() === 'Pendientes' ? !e.paid : e.paid),
      )
      .sort((a, b) => a.date.localeCompare(b.date)),
  );
}
