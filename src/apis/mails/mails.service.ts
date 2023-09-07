import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailsService {
  constructor(private readonly mailerService: MailerService) {}
  async sendEmail({ randomNumber, email }) {
    await this.mailerService.sendMail({
      to: email,
      from: process.env.MAIL_USER,
      subject: 'Freely B 이메일 인증번호입니다.',
      text: '인증번호를 입력해주세요.',
      html: `<b>인증번호: ${randomNumber}</b>`,
    });
  }
}
