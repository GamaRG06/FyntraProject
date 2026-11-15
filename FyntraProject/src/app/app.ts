import { Component, computed, signal } from '@angular/core';
import { Expense, NewExpense } from './models/expense';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { PageHeading } from './components/page-heading/page-heading';
import { MonthSelector } from './components/month-selector/month-selector';
import { MonthlySummary } from './components/monthly-summary/monthly-summary';
import { ExpenseList } from './components/expense-list/expense-list';
import { CategoryBreakdown } from './components/category-breakdown/category-breakdown';
import { PlanningNote } from './components/planning-note/planning-note';
import { AppFooter } from './components/app-footer/app-footer';
import { ExpenseForm } from './components/expense-form/expense-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Sidebar,
    Topbar,
    PageHeading,
    MonthSelector,
    MonthlySummary,
    ExpenseList,
    CategoryBreakdown,
    PlanningNote,
    AppFooter,
    ExpenseForm,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly categories = ['Hogar', 'Servicios', 'Alimentación', 'Transporte', 'Personal'];
  readonly section = signal('Resumen');
  readonly filter = signal('Todos');
  readonly month = signal('2026-10');
  readonly showForm = signal(false);
  readonly expenses = signal<Expense[]>([
    {
      id: 1,
      name: 'Renta del departamento',
      category: 'Hogar',
      amount: 8500,
      date: '2026-10-01',
      paid: true,
    },
    {
      id: 2,
      name: 'Supermercado',
      category: 'Alimentación',
      amount: 1800,
      date: '2026-10-26',
      paid: false,
    },
    {
      id: 3,
      name: 'Internet en casa',
      category: 'Servicios',
      amount: 599,
      date: '2026-10-27',
      paid: false,
    },
    {
      id: 4,
      name: 'Gasolina',
      category: 'Transporte',
      amount: 1000,
      date: '2026-10-28',
      paid: false,
    },
    {
      id: 5,
      name: 'Suscripción de música',
      category: 'Personal',
      amount: 129,
      date: '2026-10-29',
      paid: false,
    },
    {
      id: 6,
      name: 'Electricidad',
      category: 'Servicios',
      amount: 420,
      date: '2026-10-30',
      paid: false,
    },
  ]);
  readonly monthly = computed(() => this.expenses().filter((e) => e.date.startsWith(this.month())));
  readonly total = computed(() => this.monthly().reduce((s, e) => s + e.amount, 0));
  readonly paid = computed(() =>
    this.monthly()
      .filter((e) => e.paid)
      .reduce((s, e) => s + e.amount, 0),
  );
  readonly pending = computed(() => this.monthly().filter((e) => !e.paid));
  readonly monthLabel = computed(() =>
    new Date(this.month() + '-02T12:00:00').toLocaleDateString('es-MX', {
      month: 'long',
      year: 'numeric',
    }),
  );
  toggle(id: number) {
    this.expenses.update((items) => items.map((e) => (e.id === id ? { ...e, paid: !e.paid } : e)));
  }
  shiftMonth(step: number) {
    const d = new Date(this.month() + '-02T12:00:00');
    d.setMonth(d.getMonth() + step);
    this.month.set(d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'));
  }
  openForm() {
    this.showForm.set(true);
  }
  save(expense: NewExpense) {
    this.expenses.update((items) => [...items, { ...expense, id: Date.now(), paid: false }]);
    this.month.set(expense.date.slice(0, 7));
    this.showForm.set(false);
  }
}
