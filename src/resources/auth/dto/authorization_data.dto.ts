import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorizationDataDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
