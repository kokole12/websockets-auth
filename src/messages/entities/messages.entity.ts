import { User } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  m_id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.messages)
  created_id: User;
  @Column()
  created_at: Date;
}
