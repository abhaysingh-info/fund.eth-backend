import {ITransaction} from "./types/web3";
import {config} from "dotenv"

config()

const {Web3} = require('web3');

const {abi, bytecode} = require('../build/contracts/FundRaiser.json');


const web3 = new Web3(process.env.ETH_NODE || "http://localhost:7545");


const contractAddress = process.env.CONTRACT_ADDRESS;
const FundRaiserContract = new web3.eth.Contract(abi, contractAddress);

export async function Web3EventCreate(id: number, name: string, goal: number): Promise<ITransaction> {
    const accounts = await web3.eth.getAccounts();
    const result = await FundRaiserContract.methods.createEvent(id, name, goal).send({from: accounts[0]});
    return result;
}

export async function Web3EventUpdate(id: number, name: string, goal: number): Promise<ITransaction> {
    const accounts = await web3.eth.getAccounts();
    const result = await FundRaiserContract.methods.updateEvent(id, name, goal).send({from: accounts[0]});
    return result;
}

export async function Web3EventFund(id: number, amount: number): Promise<ITransaction> {
    const accounts = await web3.eth.getAccounts();
    const result = await FundRaiserContract.methods.fund(id, amount).send({from: accounts[0]});
    return result;
}

