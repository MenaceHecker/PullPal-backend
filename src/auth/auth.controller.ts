import {
  Controller,
  Get,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // This route will redirect to GitHub (handled by the strategy)
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(userData: any) {
    try {
      const { user, accessToken } = userData;
      const result = await this.authService.validateGithubUser(user, accessToken);
      return {
        access_token: result.access_token,
        refresh_token: result.refresh_token,
        user: result.user,
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(user: any) {
    return {
      user,
      message: 'Access granted to protected route',
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async logout(user: any) {
    await this.authService.logout(user.sub);
    return { message: 'Logged out successfully' };
  }
}
