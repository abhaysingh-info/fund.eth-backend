import { Request, Response } from 'express';
import { User } from "../models/user"
import { randomBytes, scryptSync } from 'crypto'


export async function getHash(
    password: string,
    passwordAndSaltSeperator: string = '.',
) {
    const salt = getRandomBytes(15)
    const hash = await scryptHash(password, salt)
    return `${salt}${passwordAndSaltSeperator}${hash.toString('hex')}`
}

export async function scryptHash(
    str: string,
    salt: string,
    length: number = 152,
) {
    return scryptSync(str, salt, length)
}

export function getRandomBytes(length: number) {
    return randomBytes(length).toString('hex')
}

export function GetLoginToken(req: Request): string | null {
    const token: string | null =
        (req.cookies.token as string) || (req.body.token as string) || null;

    return token;
}

export async function SetLoginToken(res: Response, user: User) {
    const token: string = await user.getJwtToken();
    res.cookie('token', token);


    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            isBlocked: user.isBlocked,
            suspended: user.suspended,
        },
    };
}