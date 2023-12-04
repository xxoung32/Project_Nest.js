import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [AppService]
})
export class AppModule {}
