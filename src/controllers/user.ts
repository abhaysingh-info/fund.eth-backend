import { Request, Response } from "express"
import { UserService } from "../services/user.service";
import { UserLoginDto } from "../dto/user";
import { SetLoginToken } from "../utils";

const userService = new UserService()

export async function UserCreate(req: Request, res: Response) {

    // get body
    var userBody = req.body

    try {
        await userService.create(userBody);
        res.status(201).json({
            success: true,
            message: 'Congratulations Created Successfully!',
        });
    } catch (e: Error | any) {
        res.status(400).json({
            success: false,
            message: e.message || 'We are sorry, there was an error while creating your account',
        });
    }
}

export async function UserLogin(req: Request, res: Response) {
    var userBody = req.body

    let result = UserLoginDto.validate(userBody)

    if (result.error) {
        return res.status(403).json({ error: result })
    }

    const user = await userService.findOneByEmail(
        userBody.email,
    );

    if (!user) {
        return res.status(403).json(
            { message: `User with email ${userBody.email} not found!`, }
        );
    }

    const doesProvidedPasswordMatchUserPassword: boolean =
        await user.comparePassword(userBody.password);


    if ((user.password_tries as number) >= 50) {
        return res.status(403).json(
            { message: 'Your account is Blocked please check your email for further instructions or request a password reset!', }
        );
    }

    if (!doesProvidedPasswordMatchUserPassword) {
        user.password_tries = (user.password_tries as number) + 1;
        if ((user.password_tries as number) >= 500) {
            user.is_blocked = true;
        }
        await (user as any).save();

        return res.status(403).json(
            { message: 'Email or password you entered is incorrect!', }
        );
    } else {
        user.password_tries = 0;
        await (user as any).save();
    }

    if (user.is_blocked) {
        return res.status(403).json(
            {
                message:
                    'Your account is Blocked please check your email for further instructions or request a password reset!',
            }
        );
    }

    if (user.suspended) {
        return res.status(403).json(
            {
                message:
                    'Your account is suspended, if you think this was a mistake please contact our support',
            }
        );
    }
    let output = {}

    try {
        output = await SetLoginToken(res, user);
    } catch (err: any) {
        return res.status(403).json(
            {
                message: err.message
            }
        );
    }

    res.status(200).json(output)
    return
}

export async function UserLogout(req: Request, res: Response) {
    res.clearCookie('token');
    res.clearCookie('roles');
    return res.status(200).json({ success: true });
}

export async function UserVerifySession(req: Request, res: Response) {
    return res.status(200).json({ success: true });
}