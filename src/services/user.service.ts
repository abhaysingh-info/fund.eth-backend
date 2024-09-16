import Joi from "joi";
import { UserCreateDto } from "../dto/user"
import { User } from "../models/user";
import { IUserCreate } from "../types";

export class UserService {
    User = User

    async create(createUserDto: IUserCreate) {
        let u = new this.User()

        // check if email exists

        // validate users using joi
        let result = UserCreateDto.validate(createUserDto)

        if (result.error) {
            throw result.error
        }

        u.email = createUserDto.email
        u.name = createUserDto.name
        u.password = createUserDto.password



        // check if email exists
        let usersCount: number
        try {
            let _: any
            [_, usersCount] = await User.findAndCountBy({
                email: createUserDto.email
            })
        } catch (error) {
            // log the errors for prod
            throw error
        }

        if (usersCount) {
            throw new Error("User already exists")
        }


        // encrypting the password
        u.password = await u.getHash(u.password);

        // creating a email verification token
        u.emailVerifyToken = (
            await u.getHash(u.email + Date.now())
        ).split('.')[1];

        try {
            await u.save()
        } catch (error) {
            // log the errors for prod
            throw error
        }

        // send email using smtp as user is being created successfully!!!

        return u
    }


    async findOneByEmail(
        email: string,
        includePassword: boolean = false,
    ): Promise<User | null> {
        return await this.User.findOneBy({
            email,
        })
    }

    async verifyEmail(token: string) {
        const user = await this.User.findOneBy({
            emailVerifyToken: token,
        });
        if (!user) {
            throw new Error('User not found!');
        }

        if (user.emailVerified) {
            return user;
        }

        user.emailVerified = true;

        try {
            await user.save()
        } catch (error) {
            // log the errors for prod
            throw error
        }


        return user;
    }
}