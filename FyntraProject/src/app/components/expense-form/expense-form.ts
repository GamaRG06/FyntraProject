import { Component, output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseDraft, NewExpense } from '../../models/expense';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm {
  readonly categories = input.required<string[]>();
  readonly month = input.required<string>();
  readonly close = output<void>();
  readonly saveExpense = output<NewExpense>();
  draft: ExpenseDraft = { name: '', category: 'Hogar', amount: null, date: '' };
  ngOnInit() {
    this.draft.date = this.month() + '-25';
  }
  save() {
    if (!this.draft.name.trim() || !this.draft.amount || this.draft.amount <= 0 || !this.draft.date)
      return;
    this.saveExpense.emit({
      ...this.draft,
      name: this.draft.name.trim(),
      amount: Number(this.draft.amount),
    });
  }
}
