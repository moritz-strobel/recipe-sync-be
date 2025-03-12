import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { User } from 'src/user/user.entity';
import { Recipe } from 'src/recipe/recipe.entity';

@Entity()
export class Cookbook extends BaseEntity {
    @ManyToOne(() => User)
    user: User; // Reference to an user

    @Column()
    title: string;

    @Column()
    isFavorite: boolean;

    @Column()
    isDeletable: boolean; // e.g. every user has a list of favorite recipes. this list shall not be public nor shall it be deleted (deletion results in empty cookbook)

    @Column()
    isPublic: boolean;

    @Column()
    description: string;

    @Column({ nullable: true })
    coverImageUrl: string; // URL zum Titelbild

    @ManyToMany(() => Recipe)
    @JoinTable()
    recipes: Recipe[]; // List of references to recipes
}
