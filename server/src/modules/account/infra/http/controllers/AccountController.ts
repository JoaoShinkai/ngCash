import CreateAccountService from '@modules/account/services/CreateAccountService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AccountController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;

      const service = container.resolve(CreateAccountService);

      res.json(await service.execute(data));
    } catch (err) {
      next(err);
    }
  }
}
