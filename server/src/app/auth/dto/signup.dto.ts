import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ format: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  photoUrl: string;

  @ApiProperty()
  bio: string;
}
