export interface ITransaction{
    transactionHash: string
    transactionIndex: number
    blockNumber: number
    blockHash: string
    from: string
    to: string
    cumulativeGasUsed: number
    gasUsed: number
    logs: any[]
    logsBloom: string
    status: number
    effectiveGasPrice: number
    type: number
}
