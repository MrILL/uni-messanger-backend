import { ApiProperty } from '@nestjs/swagger';

export class ChatEntity {
    @ApiProperty({
        description: 'The unique identifier for the chat.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    chat_id: string;

    @ApiProperty({
        description: 'The name of the chat.',
        example: 'General Chat',
    })
    name: string;

    @ApiProperty({
        description: 'The slug of the chat.',
        example: 'general-chat',
    })
    slug: string;

    @ApiProperty({
        description: 'The description of the chat.',
        example: 'A chat for general discussions.',
    })
    description: string;

    @ApiProperty({
        description: 'The URL of the chat’s avatar image.',
        example: 'http://example.com/avatar.jpg',
    })
    avatar: string;

    @ApiProperty({
        description: 'The unique identifier for the chat owner.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    owner_id: string;

    @ApiProperty({
        description: 'The date and time when the chat was created.',
        format: 'date-time',
        example: '2024-01-01T12:00:00Z',
    })
    created_at: Date;

    @ApiProperty({
        description: 'The date and time when the chat was last updated.',
        format: 'date-time',
        example: '2024-01-02T12:00:00Z',
    })
    updated_at: Date;
}
