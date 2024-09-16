export interface IUser {
    id: number
    name: string
    email: string
    password: string
    password_tries: number
    email_verify_token: string
    email_verified: string
    password_reset_token: string
    account_suspended: boolean
    wallet_address: string
}

export interface IUserCreate {
    name: string
    email: string
    password: string
    confirm_password: string
}
