import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProductService = container.resolve(CreateProductService);

    try {
      const product = await createProductService.execute({
        name,
        price,
        quantity,
      });
      return response.json(product);
    } catch (err) {
      return response.status(400).json({ erro: err.message });
    }
  }
}
