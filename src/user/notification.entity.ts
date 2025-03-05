import { BaseEntity } from '../shared/base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Notification extends BaseEntity {
  @Column()
  message: string;

  @ManyToOne(() => User)
  user: User;
}
