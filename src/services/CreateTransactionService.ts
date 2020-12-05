import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type not is income or outcome');
    }

    const balance = this.transactionsRepository.getBalance();
    if (
      (balance.total === 0 && value > 0 && type === 'outcome') ||
      (value > balance.total && type === 'outcome')
    ) {
      throw Error('Outcome is less than value total');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
