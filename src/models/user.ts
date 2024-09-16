
import { sign as JWTSign, verify as JWTVerify } from "jsonwebtoken"
import { getHash, getRandomBytes, scryptHash } from '../utils';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event";



@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar', length: 255, nullable: false
    })
    name!: string;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    email!: string;

    @Column({
        type: 'varchar', length: 255, nullable: false,
        select: false
    }) // Don't expose password in queries
    password!: string;

    @Column({ type: 'int', nullable: false, default: 0 })
    passwordTries!: number;

    @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
    emailVerifyToken!: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    emailVerified!: boolean;

    @Column({ type: 'boolean', nullable: false, default: false })
    isBlocked!: boolean;

    @Column({ type: 'boolean', nullable: false, default: false })
    suspended!: boolean;

    @Column({ type: 'varchar', length: 255, nullable: false, default: '' })
    passwordResetToken!: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    accountSuspended!: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    walletAddress!: string | null;

    @OneToMany(() => Event, (event) => event.user) // Define the relationship
    events!: Event[];


    async getHash(value: string) {
        return await getHash(value);
    };

    async getJWTToken(value: string) {
        return await getHash(value);
    };

    verifyJWTToken(token: string) {
        return JWTVerify(token, `${process.env.JWT_SECRET}`);
    };

    getJwtToken() {
        return JWTSign(
            {
                email: this.email,
            },
            `${process.env.JWT_SECRET}`,
            {
                expiresIn: process.env.JWT_EXPIRY ? process.env.JWT_EXPIRY : '1d',
            },
        );
    };

    async comparePassword(
        passwordFromLogin: string,
    ): Promise<boolean> {
        const [salt, password] = this.password.split('.');
        return (
            (await scryptHash(passwordFromLogin, salt)).toString('hex') === password
        );
    };
}


