import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomerService = container.resolve(CreateCustomerService);

    try {
      const customer = await createCustomerService.execute({
        name,
        email,
      });

      return response.json(customer);
    } catch (err) {
      return response.status(400).json({ erro: err.message });
    }
  }
}
