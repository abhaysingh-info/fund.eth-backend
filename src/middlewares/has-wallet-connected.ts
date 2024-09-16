import { Request, Response } from "express";

export function HasWalletConnected(req: Request, res: Response, next: () => void) {
    let wallet = req?.user?.wallet_address
    if (!wallet?.length) {
        res.status(403).json({ message: "please connect your wallet" })
        return
    }
    next();
}