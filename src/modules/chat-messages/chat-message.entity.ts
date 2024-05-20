import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageEntity {
    @ApiProperty({
        description: 'Identifier of the chat message.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: 'Part of primary key. Identifier of the chat.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    chat_id: string;

    @ApiProperty({
        description: 'Part of primary key. Date when the message was sent.',
        example: '2024-01-01',
    })
    date: Date;

    @ApiProperty({
        description: 'Identifier of the user who sent the message.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    user_id: string;

    @ApiProperty({
        description: 'Message content.',
    })
    content: string;

    @ApiProperty({
        description: 'Date and time when the message was created.',
        example: '2024-01-01T12:00:00Z',
    })
    created_at: Date;

    @ApiProperty({
        description: 'Date and time when the message was last updated.',
        example: '2024-01-02T12:00:00Z',
    })
    updated_at: Date;

    @ApiProperty({
        description: 'Identifier of the message to which this message is a reply.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    reply_to: string;
}
