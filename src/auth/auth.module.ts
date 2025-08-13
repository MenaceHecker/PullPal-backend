import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { GithubStrategy } from './github.strategy';
// import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
//   controllers: [AuthController],
//   providers: [AuthService, GithubStrategy, JwtStrategy],
//   exports: [AuthService, PassportModule],
})
export class AuthModule {}
