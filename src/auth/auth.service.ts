import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface GithubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface JwtPayload {
  sub: string;
  username: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateGithubUser(githubUser: GithubUser, accessToken: string) {
    try {
      // TODO: Replace this with your user lookup/creation logic
      const user = {
        id: githubUser.id.toString(),
        username: githubUser.login,
        email: githubUser.email,
        name: githubUser.name,
        avatar: githubUser.avatar_url,
      };

      // Generate JWT tokens
      const payload: JwtPayload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token = this.jwtService.sign(payload);
      const refresh_token = this.jwtService.sign(payload, { expiresIn: '30d' });

      return {
        access_token,
        refresh_token,
        user,
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to authenticate with GitHub');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      // TODO: Replace with your user verification logic
      const user = {
        id: payload.sub,
        username: payload.username,
        email: payload.email,
        name: 'Name Placeholder',
        avatar: 'Avatar Placeholder',
      };

      const newPayload: JwtPayload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token = this.jwtService.sign(newPayload);

      return {
        access_token,
        user,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    // Stateless JWT logout logic (e.g., token blacklist if needed)
    return { success: true };
  }

  async validateUser(payload: JwtPayload) {
    // TODO: Replace with your user validation logic
    if (!payload.sub) {
      throw new UnauthorizedException('User not found');
    }
    return payload;
  }
}
