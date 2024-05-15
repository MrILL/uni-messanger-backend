import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class AddUserToChatDto {
    @IsUUID()
    @ApiProperty({
        description: 'The UUID of user.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    userId: string;

    @IsOptional()
    @IsUUID()
    @ApiPropertyOptional({
        description: 'The UUID of chat.',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    permissionId?: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        description: 'Is user blocked.',
        example: false,
        default: false,
    })
    isBlocked?: boolean;
}
