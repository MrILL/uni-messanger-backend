import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserInChatDto {
    @ApiPropertyOptional({
        description: 'The UUID of chat.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    permissionId: string;

    @ApiPropertyOptional({
        description: 'Is user blocked.',
        example: false,
        default: false,
    })
    isBlocked: boolean;
}
