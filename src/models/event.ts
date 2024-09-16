import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from './user'; // Assuming you have a User entity defined

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.events)
    user!: User;

    @Column({ length: 124 })
    name!: string;

    @Column()
    description!: string;

    @Column()
    featuredImage!: string;

    @Column({ type: 'bigint' })
    blockNumber!: number;

    @Column({ length: 128 })
    ethTransactionId!: string;

    @Column({ type: 'bigint', default: 0 })
    goalAmount!: number;

    @Column({ type: 'bigint', default: 0 })
    goalAchieved!: number;
}