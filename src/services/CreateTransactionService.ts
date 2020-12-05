import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw Error('Type not is income or outcome');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (
      (type === 'outcome' && total === 0 && value > 0) ||
      (type === 'outcome' && value > total)
    ) {
      throw Error('Outcome is less than value total');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
