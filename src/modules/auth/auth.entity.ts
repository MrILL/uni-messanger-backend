import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class AuthEntity {
    @ApiProperty({
        description: 'The email address of the user for authentication.',
        example: 'user@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'The password for the user account, which should be handled securely.',
        example: 'password123!',
    })
    @Exclude({ toPlainOnly: true })
    password: string;

    @ApiProperty({
        description: 'A unique identifier for the user, typically used internally.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    user_id: string;

    @ApiProperty({
        description:
            'A token used to refresh the authentication session without requiring the user to re-enter credentials.',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjNlNDU2Ny1lODliLTEyZDMtYTQ1Ni00MjY2MTQxNzQwMDAiLCJpYXQiOjE2MjAwNTc3NjYsImV4cCI6MTYyMDE0NDE2Nn0.ZS_fHy8oIaZkH5b2sJLCjKpjNdfstUg8q3IDZqN6tw8',
    })
    refresh_token?: string;
}
