import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, OneToMany, } from 'typeorm';
import { User } from './user'; // Assuming you have a User entity defined
import { Fund } from './fund';

@Entity()
export class Event extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.events, {cascade: true, nullable: false, eager: true, })
    user!: User;

    @Column({ length: 124 })
    name!: string;

    @Column()
    description!: string;

    @Column({ type: 'bigint', default:0 })
    block_number!: number;

    @Column({ length: 128, default: "" })
    eth_transaction_id!: string;

    @Column({ type: 'bigint', default: 0 })
    goal_amount!: number;

    @Column({ type: 'bigint', default: 0 })
    goal_achieved!: number;

    @OneToMany(() => Fund, (fund) => fund.event)
    received_funds!: Fund[];

    @Column({type:"datetime", nullable: false, default: Date.now()})
    created_at!: Date;
}