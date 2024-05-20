import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateChatMessageDto {
    @IsString()
    @MaxLength(1000)
    @ApiProperty({
        description: 'The content of the chat message.',
        example: 'Hello, world!',
        maxLength: 1000,
    })
    content: string;

    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'The identifier of the message to which this message is a reply.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    reply_to?: string;
}
