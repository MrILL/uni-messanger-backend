import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
    @ApiProperty({
        description: 'The unique identifier for the user.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    user_id: string;

    @ApiProperty({
        description: 'The username of the user.',
        example: 'john_doe',
    })
    username: string;

    @ApiProperty({
        description: 'The first name of the user.',
        example: 'John',
    })
    first_name: string;

    @ApiProperty({
        description: 'The last name of the user.',
        example: 'Doe',
    })
    last_name: string;

    @ApiProperty({
        description: 'The URL of the user’s avatar image.',
        example: 'http://example.com/avatar.jpg',
    })
    avatar: string;

    @ApiProperty({
        description: 'The date and time when the user account was created.',
        format: 'date-time',
        example: '2024-01-01T12:00:00Z',
    })
    created_at: Date;

    @ApiProperty({
        description: 'The date and time when the user account was last updated.',
        format: 'date-time',
        example: '2024-01-02T12:00:00Z',
    })
    updated_at: Date;
}
