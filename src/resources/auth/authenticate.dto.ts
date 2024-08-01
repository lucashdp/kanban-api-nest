import { IsJWT } from 'class-validator';

export class AuthenticateDto {
  @IsJWT()
  token: string;
}
