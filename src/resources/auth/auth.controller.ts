import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { SigninDto } from './signin.dto';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './authenticate.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() signinDto: SigninDto): Promise<string> {
    return await this.authService.signIn(signinDto);
  }

  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() authenticateDto: AuthenticateDto
  ): Promise<string> {
    return await this.authService.authenticate(authenticateDto);
  }
}
