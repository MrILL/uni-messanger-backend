import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(4, 20)
    @ApiProperty({
        description: 'The username of the user.',
        example: 'john_doe',
        minLength: 4,
        maxLength: 20,
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @ApiProperty({
        description: 'The first name of the user. Only alphabetic characters are allowed.',
        example: 'John',
    })
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @IsAlpha()
    @ApiProperty({
        description: 'The last name of the user. Only alphabetic characters are allowed.',
        example: 'Doe',
    })
    last_name: string;

    @IsOptional()
    @IsUrl()
    @ApiPropertyOptional({
        description: 'The URL of the avatar image of the user.',
        example: 'http://example.com/avatar.jpg',
    })
    avatar?: string;
}
