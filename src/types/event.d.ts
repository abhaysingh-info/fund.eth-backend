export interface IEventCreateDto {
    name: string;
    description: string;
    featuredImage: string;
    blockNumber: number;
    ethTransactionId: string;
    goalAmount: number;
}

export interface IEventUpdateDto {
    name: string;
    description: string;
    featuredImage: string;
    goalAmount: number;
}

export interface IEventFilterDto {
    name?: string
    minAmount?: number
    maxAmount?: number
    transactionId?: string
    blockNumber?: number
}