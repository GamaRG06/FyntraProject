import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';
import { ExpenseForm } from './components/expense-form/expense-form';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Haz espacio para lo que viene.');
  });

  it('navigates from the sidebar and changes the selected month', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelectorAll<HTMLButtonElement>('app-sidebar nav button')[1].click();
    await fixture.whenStable();
    expect(element.querySelector('app-monthly-summary')).toBeNull();
    expect(element.querySelector('app-expense-list')).toBeTruthy();
    expect(element.querySelector('app-category-breakdown')).toBeNull();
    element.querySelector<HTMLButtonElement>('[aria-label="Mes siguiente"]')!.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.month()).toBe('2026-11');
    expect(element.querySelector('.empty')).toBeTruthy();
  });

  it('updates the summary when a child marks an expense as paid', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const previousPaid = fixture.componentInstance.paid();
    element.querySelector<HTMLButtonElement>('.status:not(.paid)')!.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.paid()).toBe(previousPaid + 1800);
    expect(element.querySelectorAll('.status.paid')).toHaveLength(2);
    expect(element.querySelector('app-monthly-summary')!.textContent).toContain('2 gastos completados');
  });

  it('saves an expense from the form into the list and summary', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>('app-page-heading button')!.click();
    await fixture.whenStable();
    const form = fixture.debugElement.query(By.directive(ExpenseForm)).componentInstance as ExpenseForm;
    expect(form.draft.date).toBe('2026-10-25');
    form.draft = { name: 'Nuevo gasto', category: 'Hogar', amount: 250, date: '2026-10-26' };
    element.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    expect(element.querySelector('app-expense-form')).toBeNull();
    expect(element.querySelector('app-expense-list')!.textContent).toContain('Nuevo gasto');
    expect(fixture.componentInstance.monthly()).toHaveLength(7);
    expect(fixture.componentInstance.total()).toBe(12698);
  });
});
