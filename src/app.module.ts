import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { PostLikesModule } from './post-likes/post-likes.module';
import * as dotenv from 'dotenv';

dotenv.config();
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        // retryAttempts: 10, ==> 소헌님 질문
        type: 'mysql',
        host: process.env.TYPEORM_HOST,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        port: Number(process.env.TYPEORM_PORT),
        entities: [path.join(__dirname, '/entities/**/*.entity.{js, ts}')],
        migrations: [path.join(__dirname, '/migrations/**/*.js')],
        synchronize: true,
        logging: true,
        timezone: 'local',
        softDelete: true,
      }),
    }),
    PostsModule,
    CommentsModule,
    PostLikesModule,
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule {}