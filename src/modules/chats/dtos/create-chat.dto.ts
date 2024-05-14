import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateChatDto {
    @IsString()
    @Length(4, 50)
    @ApiProperty({
        description: 'The name of the chat.',
        example: 'My Chat',
        minLength: 4,
        maxLength: 50,
    })
    name: string;

    @IsString()
    @Length(4, 20)
    @ApiProperty({
        description: 'The slug of the chat.',
        example: 'my-chat',
        minLength: 4,
        maxLength: 20,
    })
    slug: string;

    @IsOptional()
    @Length(4, 100)
    @ApiPropertyOptional({
        description: 'The description of the chat.',
        example: 'A chat for my friends.',
        minLength: 4,
        maxLength: 100,
    })
    description?: string;

    @IsOptional()
    @ApiPropertyOptional({
        description: 'The URL of the avatar image of the chat.',
        example: 'http://example.com/avatar.jpg',
    })
    avatar?: string;
}
