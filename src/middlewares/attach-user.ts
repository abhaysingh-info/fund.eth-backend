import { UserService } from "../services/user.service";
import { GetLoginToken, verifyJwtToken } from "../utils";

export async function AttachUser(req: any, res: any, next: () => void) {

    const userService = new UserService()

    const token = GetLoginToken(req);

    if (token) {
        const decoded = verifyJwtToken(token) as any;
        const user = await userService.findOneByEmail(decoded?.email);
        if (!user) {
            res.status(400).json({ message: 'User not found!' });
        }
        if (user?.is_blocked) {
            res.status(400).json({
                message:
                    'Your account is temprorary blocked, please check your e-mail associated with the account',
            });
        }
        if (user?.suspended) {
            res.status(400).json({
                message:
                    'Your account is permanentaly suspended please contact our support.',
            });
        }
        req.user = user;
    }
    next();
}