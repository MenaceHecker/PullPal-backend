import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class AuthResponseDto {
  access_token: string;
  refresh_token?: string;
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar: string;
  };
}