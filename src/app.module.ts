import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CatController } from './cat/cat.controller';
import { UserModule } from './user/user.module';
import { CatModule } from './cat/cat.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    CatModule,
  ],
  controllers: [AppController, CatController],
  providers: [AppService],
})
export class AppModule {}
