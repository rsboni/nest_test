import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto, AuthRegisterDto } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    if (
      authRegisterDto.password.length < 8 ||
      !/[a-z]/.test(authRegisterDto.password) ||
      !/[A-Z]/.test(authRegisterDto.password) ||
      !/[0-9]/.test(authRegisterDto.password)
    ) {
      throw new BadRequestException('Password requirements not met.');
    }
    try {
      return await this.authService.register(authRegisterDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  @Post('authenticate')
  async authenticate(@Body() authenticateRequest: AuthCredentialsDto) {
    try {
      return await this.authService.authenticateUser(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
