import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Message } from 'src/messages/entities/messages.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.created_id)
  messages: Message[];

  @BeforeInsert()
  async hashPassword() {
    const saltRount = 10;
    this.password = await bcrypt.hash(this.password, saltRount);
  }
}
