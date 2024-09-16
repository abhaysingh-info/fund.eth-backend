export function AuthenticateUser(req: any, res: any, next: () => void) {
    if (!req.user) {
        res.status(403).json({ message: "unauthorized to access this resource" })
        return
    }
    next();
}