import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from './achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private achievementsRepository: Repository<Achievement>,
  ) {}

  async create(achievement: Achievement): Promise<Achievement> {
    return await this.achievementsRepository.save(achievement);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<Achievement[]> {
    return await this.achievementsRepository.find();
  }

  async readOne(id: number): Promise<Achievement | null> {
    const result = await this.achievementsRepository.find({
      where: { id },
      relations: {},
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<Achievement>) {
    return await this.achievementsRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.achievementsRepository.delete(id);
  }
}
