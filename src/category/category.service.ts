import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(category: Category): Promise<Category> {
    return await this.categoriesRepository.save(category);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Category[]> {
    return await this.categoriesRepository.find();
  }

  async readOne(id: number): Promise<Category | null> {
    const result = await this.categoriesRepository.find({
      where: { id },
      relations: {},
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Category>) {
    return await this.categoriesRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
