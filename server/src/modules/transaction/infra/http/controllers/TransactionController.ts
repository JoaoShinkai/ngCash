import CreateTransactionService from '@modules/transaction/services/CreateTransactionService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class TransactionController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = req;
      const { creditUsername, value } = req.body;

      const service = container.resolve(CreateTransactionService);

      res.json(await service.execute(+userId, creditUsername, +value));
    } catch (err) {
      next(err);
    }
  }
}
