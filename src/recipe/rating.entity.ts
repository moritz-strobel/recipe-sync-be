import { Column, Entity, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from '../user/user.entity';
import { BaseEntity } from '../shared/base';

@Entity()
export class Rating extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Recipe)
  recipe: Recipe;

  @Column({ type: 'int', enum: [1, 2, 3, 4, 5] })
  stars: 1 | 2 | 3 | 4 | 5;
}
