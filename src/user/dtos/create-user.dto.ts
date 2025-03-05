import { Cookbook } from '../../cookbook/cookbook.entity';

export class CreateUserDto {
  readonly first_name: string;
  readonly last_name: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly profileTextUrl?: string;
  readonly profileImageUrl?: string;
  readonly cookbooks?: Cookbook[];
}
