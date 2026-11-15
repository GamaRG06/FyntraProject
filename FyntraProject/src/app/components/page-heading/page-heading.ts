import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-page-heading',
  standalone: true,
  imports: [],
  templateUrl: './page-heading.html',
  styleUrl: './page-heading.css',
})
export class PageHeading {
  readonly section = input.required<string>();
  readonly newExpense = output<void>();
}
