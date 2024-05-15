import { ApiProperty } from '@nestjs/swagger';

export class ChatUserEntity {
    @ApiProperty({
        description: 'The UUID of chat.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    chat_id: string;

    @ApiProperty({
        description: 'The UUID of user.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    user_id: string;

    @ApiProperty({
        description: 'The UUID of permission.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    permission_id: string;

    @ApiProperty({
        description: 'Is user blocked.',
        example: false,
        default: false,
    })
    is_blocked: boolean;
}
