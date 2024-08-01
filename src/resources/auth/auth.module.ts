import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'live-18-07',
      signOptions: { expiresIn: '600s' }
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [AuthRepository, AuthService],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}
