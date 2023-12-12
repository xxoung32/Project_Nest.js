import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config(); 

console.log(path.join(__dirname, 'src/entities/**/*.entity{.ts,.js}'))
export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: Number(process.env.TYPEORM_PORT),
  entities: [
    path.join(__dirname, 'src/entities/**/*.entity{.ts,.js}'), 
    path.join(__dirname, 'dist/entities/**/*.entity{.ts,.js}'),
  ],
});