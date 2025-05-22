import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password, loginDto.role);
  }

  @Post('forgot-password')
  async forgot(@Body('email') email: string) {
    return await this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async reset(@Body() body: { email: string; token: string; newPassword: string }) {
    return await this.authService.resetPassword(body.email, body.token, body.newPassword);
  }
}
