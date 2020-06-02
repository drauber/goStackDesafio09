import Product, {
  Product,
} from '@modules/products/infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const checkProductExists = await this.productsRepository.findByName(name);

    if (checkProductExists) {
      throw new AppError('Product already in database.');
    }

    const Product = await this.productsRepository.create({
      name,
      quantity,
      price,
    });

    return Product;
  }
}

export default CreateProductService;
