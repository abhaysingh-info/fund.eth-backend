import { DataSource } from 'typeorm';
import { User } from './user';
import { Event } from './event';
import { Fund } from './fund';

export const AppDataSource = new DataSource({
    type: "sqlite",
    entities: [User, Event, Fund],
    synchronize: true,
    database: "db.sqlite",

})

export async function connectDB() {
    try {
        await AppDataSource.initialize()
        console.log("Connected to db!")
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}