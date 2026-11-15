import { Component, input, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-category-breakdown',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './category-breakdown.html',
  styleUrl: './category-breakdown.css',
})
export class CategoryBreakdown {
  readonly categories = input.required<string[]>();
  readonly expenses = input.required<Expense[]>();
  readonly total = computed(() => this.expenses().reduce((sum, e) => sum + e.amount, 0));
  categoryTotal(category: string) {
    return this.expenses()
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  }
  readonly gradient = computed(() => {
    let end = 0;
    const colors = ['#477967', '#a0b89b', '#d7bd8c', '#a7b8cf', '#cdb9d6'];
    return (
      'conic-gradient(' +
      this.categories()
        .map((category, i) => {
          const start = end;
          end += this.total() ? (this.categoryTotal(category) / this.total()) * 100 : 0;
          return colors[i % colors.length] + ' ' + start + '% ' + end + '%';
        })
        .join(',') +
      ')'
    );
  });
}
