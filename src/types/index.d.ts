export interface IUser {
    id: number
    name: string
    email: string
    password: string
    passwordTries: number
    emailVerifyToken: string
    emailVerified: string
    passwordResetToken: string
    accountSuspended: boolean
    walletAddress: string
}

export interface IUserCreate {
    name: string
    email: string
    password: string
    confirmPassword: string
}