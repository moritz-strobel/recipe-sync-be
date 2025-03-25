import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Recipe } from 'src/recipe/recipe.entity';

@Entity()
export class Cookbook extends BaseEntity {
    @ManyToOne(() => User)
    user: User;

    @Column()
    title: string;

    @Column()
    isFavorite: boolean;

    @Column()
    isDeletable: boolean;

    @Column()
    isPublic: boolean;

    @Column()
    description: string;

    @Column({ nullable: true })
    coverImage: string;

    @ManyToMany(() => Recipe)
    @JoinTable()
    recipes: Recipe[];
}
