import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ROUNDS } from 'src/utils/constants';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  private async beforeInsert(): Promise<void> {
    this.password = await bcrypt.hash(this.password, ROUNDS);
    this.email = this.email.toLowerCase();
  }
}
