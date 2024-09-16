import { Request, Response } from "express"
import { UserService } from "../services/user.service";
import { UserLoginDto } from "../dto/user";
import { SetLoginToken } from "../utils";

const userService = new UserService()

export async function UserCreate(req: Request, res: Response) {

    // get body
    var userBody = req.body

    try {
        const user = await userService.create(userBody);
        return {
            success: true,
            message: 'Congratulations Created Successfully!',
        };
    } catch (e) {
        return {
            success: false,
            message: 'We are sorry, there was an error while creating your account',
        };
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
        throw res.status(403).json(
            { message: `User with email ${userBody.email} not found!`, }
        );
    }

    const doesProvidedPasswordMatchUserPassword: boolean =
        await user.comparePassword(userBody.password);

    if ((user.passwordTries as number) >= 5) {
        throw res.status(403).json(
            { message: 'Your account is Blocked please check your email for further instructions or request a password reset!', }
        );
    }

    if (!doesProvidedPasswordMatchUserPassword) {
        user.passwordTries = (user.passwordTries as number) + 1;
        if ((user.passwordTries as number) >= 5) {
            user.isBlocked = true;
        }
        await (user as any).save();

        throw res.status(403).json(
            { message: 'Email or password you entered is incorrect!', }
        );
    } else {
        user.passwordTries = 0;
        await (user as any).save();
    }

    if (user.isBlocked) {
        throw res.status(403).json(
            {
                message:
                    'Your account is Blocked please check your email for further instructions or request a password reset!',
            }
        );
    }

    if (user.suspended) {
        throw res.status(403).json(
            {
                message:
                    'Your account is suspended, if you think this was a mistake please contact our support',
            }
        );
    }

    return await SetLoginToken(res, user);
}

export async function UserLogout(req: Request, res: Response) {
    res.clearCookie('token');
    res.clearCookie('roles');
    return { success: true };
}