import { DataSource } from 'typeorm';
import { User } from './user';

export const AppDataSource = new DataSource({
    type: "sqlite",
    entities: [User],
    synchronize: true,
    database: "db.sqlite",

})

export async function connectDB() {
    try {
        await AppDataSource.initialize()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}