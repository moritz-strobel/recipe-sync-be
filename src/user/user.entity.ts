import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Cookbook } from 'src/cookbook/cookbook.entity';
import { Recipe } from '../recipe/recipe.entity';

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
    password: string;

    @Column({ nullable: true })
    profileText: string;

    @Column({ nullable: true })
    profileImage: string;

    @OneToMany(() => Recipe, (recipe) => recipe.user)
    recipes: Recipe[];

    @OneToMany(() => Cookbook, (cookbook) => cookbook.user)
    cookbooks: Cookbook[];

    @ManyToMany(() => Cookbook)
    @JoinTable()
    savedCookbooks: Cookbook[];
}
