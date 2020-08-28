import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    return this.transactions.reduce(
      (balance, transaction) => {
        if (transaction.type === 'income') {
          balance.income += transaction.value;
        } else {
          balance.outcome += transaction.value;
        }

        balance.total = balance.income - balance.outcome;

        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
