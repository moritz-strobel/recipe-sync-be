import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../shared/base';
import { Notification } from './notification.entity';
import { Achievement } from '../achievement/achievement.entity';
import { Follower } from './follower.entity';
import { Cookbook } from 'src/cookbook/cookbook.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  nationality: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column() // { nullable: true } if optional
  profileTextUrl: string;

  @Column()
  profileImageUrl: string;

  @Column()
  allowEmailNotifiaction: boolean;

  @Column()
  allowUpdates: boolean;

  @Column()
  allowAds: boolean;

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[]; // A user shal be informed if he gets followed, also when hes not signed in currently (notifiaction on next sign in)

  @OneToMany(() => Achievement, (achievement) => achievement.user)
  achievements: Achievement[]; // list of Refernces to Achievements

  @OneToMany(() => Follower, (follower) => follower.follower)
  follows: Follower; // Reference to a user. User can follow eachother

  @OneToMany(() => Follower, (follower) => follower.followedOne)
  follower: Follower;

  @OneToMany(() => Cookbook, (cookbook) => cookbook.user)
  cookbooks: Cookbook[];
}
