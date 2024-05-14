import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dtos';

export class RegisterDto extends CreateUserDto {
    @IsEmail()
    @ApiProperty({
        description: 'The email address of the user for authentication.',
        example: 'example@example.com',
    })
    email: string;

    @IsString()
    @Length(4, 20)
    @ApiProperty({
        description: 'The username of the user.',
        example: 'john_doe',
        minLength: 4,
        maxLength: 20,
    })
    password: string;
}
