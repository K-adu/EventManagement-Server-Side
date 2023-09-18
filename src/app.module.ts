import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    SharedModule,

    MongooseModule.forRoot(
      'mongodb+srv://melinashakya20:melina20@cluster0.cqtd1k5.mongodb.net/events?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: 'hellothisissecret',
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
