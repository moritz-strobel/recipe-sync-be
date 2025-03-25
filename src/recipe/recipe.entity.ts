import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class Recipe extends BaseEntity {
    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.recipes)
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
        enum: ['A', 'B', 'C', 'D', 'E'],
    })
    nutriScore: 'A' | 'B' | 'C' | 'D' | 'E';

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

    @Column({ nullable: true })
    coverImage: string;

    @Column()
    tags: string[];
}
