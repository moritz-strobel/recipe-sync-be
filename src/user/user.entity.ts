import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Cookbook } from 'src/cookbook/cookbook.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  profileTextUrl: string;

  @Column()
  profileImageUrl: string;

  @OneToMany(() => Cookbook, (cookbook) => cookbook.user)
  cookbooks: Cookbook[];
}
