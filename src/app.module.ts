import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import * as dotenv from 'dotenv'; 

dotenv.config(); 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        // retryAttempts: 10,
        type: 'mysql',
        host: process.env.TYPEORM_HOST,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        port: Number(process.env.TYPEORM_PORT),
        entities: [
          path.join(__dirname, '/entities/**/*.entity.{js, ts}'),
        ],
        synchronize: false,
        logging: true,
        timezone: 'local',
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}