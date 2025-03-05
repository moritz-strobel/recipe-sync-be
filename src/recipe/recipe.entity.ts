import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Rating } from './rating.entity';
import { Tag } from './tag.entity';
import { Image } from './image.entity';
import { Category } from 'src/category/category.entity';
import { Comment } from './comment.entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Recipe extends BaseEntity {
  @Column()
  title: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  isPublic: boolean;

  @Column({
    type: 'text',
    enum: ['healthy', 'neutral', 'unhealthy'],
  })
  generalScore: 'healthy' | 'neutral' | 'unhealthy';

  @Column({
    type: 'text',
    enum: ['A', 'B', 'C', 'D', 'E', 'F'],
  })
  nutriScore: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

  @OneToMany(() => Ingredient, (ing) => ing.recipe, {
    cascade: true,
    eager: true,
  })
  ingredients: Ingredient[];

  @Column()
  steps: number;

  @Column()
  preparationTime: number;

  @Column()
  overallCookTime: number;

  @Column()
  recipeText: string;

  @OneToMany(() => Image, (image) => image.recipe, {
    cascade: true,
    eager: true,
  })
  images: Image[];

  @Column()
  videoUrl: string;

  @Column()
  coverImage: Buffer;

  @ManyToMany(() => Category, {
    cascade: true, // automatically creates the Category in the referenced table
    eager: true, // automatically gets the categories on find requests
  })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Tag, { cascade: true, eager: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Rating, (rating) => rating.recipe, {
    cascade: true,
    eager: true,
  })
  ratings: Rating[];

  @Column()
  views: number;

  @Column()
  shares: number;

  @OneToMany(() => Comment, (comment) => comment.recipe, {
    cascade: true,
    eager: true,
  })
  comments: Comment[];
}
