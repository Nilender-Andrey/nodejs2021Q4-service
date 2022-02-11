import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorizationDataDto {
  @ApiProperty({ example: 'UserLogin', description: 'unique login' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'Ayr@13UY', description: 'user password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
