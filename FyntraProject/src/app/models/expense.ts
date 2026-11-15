export interface Expense {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  paid: boolean;
}

export type NewExpense = Omit<Expense, 'id' | 'paid'>;
export type ExpenseDraft = Omit<NewExpense, 'amount'> & { amount: number | null };
