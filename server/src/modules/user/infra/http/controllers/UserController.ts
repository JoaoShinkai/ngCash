import CreateUserService from '@modules/user/services/CreateUserService';
import { FindUserService } from '@modules/user/services/FindUserService';
import { LoginUserService } from '@modules/user/services/LoginUserService';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;

      const service = container.resolve(CreateUserService);

      res.json(await service.execute(data));
    } catch (err) {
      next(err);
    }
  }

  async find(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const service = container.resolve(FindUserService);

      res.json(await service.execute(+id));
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = req.body;

      const service = container.resolve(LoginUserService);

      res.json(await service.execute(username, password));
    } catch (err) {
      next(err);
    }
  }
}
