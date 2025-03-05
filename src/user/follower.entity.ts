import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follower {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  follower: User;

  @ManyToOne(() => User)
  followedOne: User;
}
