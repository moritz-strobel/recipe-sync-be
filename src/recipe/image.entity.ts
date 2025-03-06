import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Recipe } from './recipe.entity';

@Entity()
export class Image extends BaseEntity {
    @ManyToOne(() => Recipe)
    recipe: Recipe;

    @Column()
    buffer: Buffer;
}
