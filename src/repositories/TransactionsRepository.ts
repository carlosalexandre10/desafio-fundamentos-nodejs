import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    let total = 0;

    if (this.transactions.length > 0) {
      const incomes = this.transactions.filter(
        transaction => transaction.type === 'income',
      );
      if (incomes.length > 0) {
        income = incomes
          .map(transaction => transaction.value)
          .reduce((accumulator, currentValue) => accumulator + currentValue);
      }
      const outcomes = this.transactions.filter(
        transaction => transaction.type === 'outcome',
      );
      if (outcomes.length > 0) {
        outcome = outcomes
          .map(transaction => transaction.value)
          .reduce((accumulator, currentValue) => accumulator + currentValue);
      }
      total = income - outcome;
    }
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
