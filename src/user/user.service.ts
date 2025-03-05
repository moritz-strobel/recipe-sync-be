import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Follower } from './follower.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Follower)
    private followerRepository: Repository<Follower>,
  ) {}

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  // (!) Attention: If you use this api in production, implement a "where" filter
  async readAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async readOne(id: number): Promise<User | null> {
    const result = await this.usersRepository.find({
      where: { id },
      relations: {
        achievements: true,
        follower: { follower: true },
        follows: { followedOne: true },
      },
    });
    return result ? result[0] : null;
  }

  async update(id: number, data: Partial<User>) {
    return await this.usersRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addFollower(follower: User, followedOne: User) {
    const followerObj = new Follower();
    followerObj.follower = follower;
    followerObj.followedOne = followedOne;
    await this.followerRepository.save(followerObj);
  }
}
