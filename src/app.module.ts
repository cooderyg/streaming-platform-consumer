import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { User } from './entities/user.entity';
import { AlertsModule } from './apis/alerts/alerts.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailsModule } from './apis/mails/mails.module';

@Module({
  imports: [
    AlertsModule,
    MailsModule,
    ConfigModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: '127.0.0.1',
        port: 6380,
      },
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/entities/*.entity.*'],
      synchronize: false, // consumer 서버에서 절대 사용금지
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
      timezone: 'UTC',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PK,
        },
      },
      preview: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
