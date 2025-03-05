import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Recipe } from './recipe.entity';

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @Column()
  text: string;
}
