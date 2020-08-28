import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ServiceRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: ServiceRequest): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total - value < 0) {
      throw new Error('insufficient funds.');
    }

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
