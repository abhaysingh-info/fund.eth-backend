import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './user'; // Assuming you have a User entity
import { Event } from './event'; // Assuming you have an Event entity

@Entity()
export class Fund extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.funded, {cascade: true, nullable: false, eager: true, })
    funder!: User;

    @ManyToOne(() => User, (user) => user.received, {cascade: true, nullable: false, eager: true, })
    receiver!: User;

    @ManyToOne(() => Event, (event) => event.received_funds, {cascade: true, nullable: false, eager: true, })
    event!: Event;

    @Column({ type: 'bigint' })
    amount!: number;

    @Column({ type: 'varchar', length: 128 })
    transaction_id!: string;

    @Column({ type: 'varchar', length: 128 })
    sent_from!: string;

    @Column({ type: 'datetime' })
    date!: Date;

    @Column({ type: 'bigint' })
    block_number!: number;
}