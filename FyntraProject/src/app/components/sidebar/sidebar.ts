import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  readonly section = input.required<string>();
  readonly expenseCount = input.required<number>();
  readonly sectionChange = output<string>();
}
