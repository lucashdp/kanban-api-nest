import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './signin.dto';
import { AuthenticateDto } from './authenticate.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService
  ) {}

  async signIn(signinDto: SigninDto): Promise<string> {
    const user = await this.authRepository.findOneBy({
      email: signinDto.email
    });
    if (user?.password !== signinDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { _id: user._id, name: user.name };

    return await this.jwtService.signAsync(payload);
  }

  async authenticate(authenticateDto: AuthenticateDto): Promise<any> {
    const payload = this.jwtService.decode(authenticateDto.token);
    console.log(payload);
    const isValid = await this.jwtService.verifyAsync(authenticateDto.token);
    return isValid;
  }
}
