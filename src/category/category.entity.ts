import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base';

@Entity()
export class Category extends BaseEntity {
  @Column()
  name: string;
}
