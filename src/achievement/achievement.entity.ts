import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';

@Entity()
export class Achievement extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;

  @Column()
  image: Buffer;
}
