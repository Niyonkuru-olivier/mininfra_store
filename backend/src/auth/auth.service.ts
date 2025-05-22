import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Email not found');

    const token = Math.random().toString(36).substr(2, 8);
    user.resetToken = token;
    await this.userRepo.save(user);

    await this.sendResetEmail(email, token);
    return { message: 'Password reset link sent to your email.' };
  }

  async resetPassword(email: string, token: string, newPassword: string): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { email, resetToken: token } });
    if (!user) throw new UnauthorizedException('Invalid token or email');

    const passwordErrors = this.validatePasswordStrength(newPassword);
    if (passwordErrors.length > 0)
      throw new UnauthorizedException(`Password issue(s): ${passwordErrors.join(', ')}`);

    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) throw new UnauthorizedException('New password must be different from old password');

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = '';
    await this.userRepo.save(user);

    return { message: 'Password successfully reset' };
  }

  async validateUser(email: string, password: string, role: string): Promise<{ message: string }> {
    const user = await this.userRepo.findOne({ where: { email, role } });
    if (!user) throw new UnauthorizedException('User not found');

    if (user.status !== 'Activated') {
      throw new UnauthorizedException('You are Deactivated. Please contact Admin.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    return { message: `${role} login successful` };
  }

  private validatePasswordStrength(password: string): string[] {
    const errors: string[] = [];
    if (password.length < 8) errors.push('minimum 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('one lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('one number');
    if (!/[^A-Za-z0-9]/.test(password)) errors.push('one special character');
    return errors;
  }

  private async sendResetEmail(to: string, token: string): Promise<void> {
    const resetLink = `http://localhost:4200/reset-password?token=${token}&email=${to}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'oniyonkuru233@gmail.com',  // I replace with this  email when I get The Permission "info@mininfra.gov.rw
        pass: 'zrqj rbsf kpmk cuuw',
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: 'oniyonkuru233@gmail.com',
      to,
      subject: 'Password Reset Request',
      html: `
        <p>Hello,</p>
        <p>You requested a password reset. Click the link below:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>If you didn’t request this, ignore this email.</p>
      `,
    });
  }
}
