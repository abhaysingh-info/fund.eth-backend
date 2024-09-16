export interface IEventCreateDto {
    name: string;
    description: string;
    featured_image: string;
    block_number: number;
    eth_transaction_id: string;
    goal_amount: number;
}

export interface IEventUpdateDto {
    name: string;
    description: string;
    featured_image: string;
    goal_amount: number;
}

export interface IEventFilterDto {
    id?: number
    name?: string
    min_amount?: number
    max_amount?: number
    transaction_id?: string
    block_number?: number
}