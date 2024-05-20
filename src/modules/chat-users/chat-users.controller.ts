import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
// import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
// import { JwtPayload } from 'src/modules/auth/types/jwt-payload';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/modules/auth/types/jwt-payload';
import { UserExistsGuard } from 'src/modules/users/guards/user-exists.guard';
import { IsUserOwnerGuard } from 'src/modules/chats/guards/is-user-owner.guard';

import { ChatUsersService } from './chat-users.service';
import { AddUserToChatDto as UpdateUserInChatDto } from './dtos';
import { ChatUserEntity } from './chat-user.entity';

@Controller({
    path: 'chats/:chatId/users',
    version: '1',
})
@ApiTags('chat-users')
export class ChatUsersController {
    constructor(private readonly chatUserService: ChatUsersService) {}

    @Post()
    @UseGuards(AuthGuard, IsUserOwnerGuard, UserExistsGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: UpdateUserInChatDto })
    @ApiResponse({ status: 201, description: 'User added to chat' })
    @ApiResponse({ status: 404, description: 'Chat not found' })
    @ApiResponse({ status: 409, description: 'User already in chat' })
    async addUserToChat(
        @Param('chatId', ParseUUIDPipe) chatId: string,
        @Body() dto: UpdateUserInChatDto,
    ): Promise<ChatUserEntity> {
        return this.chatUserService.addUserToChat(chatId, dto);
    }

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'List of chat users', type: ChatUserEntity, isArray: true })
    @ApiResponse({ status: 404, description: 'No users found in chat' })
    async findChatUsers(@Param('chatId', ParseUUIDPipe) chatId: string): Promise<ChatUserEntity[]> {
        return this.chatUserService.findChatUsers(chatId);
    }

    @Get(':userId')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'User found in chat', type: ChatUserEntity })
    @ApiResponse({ status: 404, description: 'User not found in chat' })
    async findUserInChat(
        @Param('chatId', ParseUUIDPipe) chatId: string,
        @Param('userId', ParseUUIDPipe) userId: string,
    ): Promise<ChatUserEntity> {
        return this.chatUserService.findUserInChat(chatId, userId);
    }

    @Patch(':userId')
    @UseGuards(AuthGuard, IsUserOwnerGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UpdateUserInChatDto })
    @ApiResponse({ status: 200, description: 'User updated in chat', type: ChatUserEntity })
    @ApiResponse({ status: 404, description: 'User not found in chat' })
    async updateUserInChat(
        @CurrentUser() user: JwtPayload,
        @Param('chatId', ParseUUIDPipe) chatId: string,
        @Param('userId', ParseUUIDPipe) userId: string,
        @Body() dto: UpdateUserInChatDto,
    ): Promise<ChatUserEntity> {
        if (user.sub === userId) {
            throw new Error('You cannot update permissions or block yourself as owner from chat');
        }

        return this.chatUserService.updateUserInChat(chatId, userId, dto);
    }

    @Delete(':userId')
    @UseGuards(AuthGuard, IsUserOwnerGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: 204, description: 'User removed from chat' })
    @ApiResponse({ status: 404, description: 'User not found in chat' })
    async deleteUserFromChat(
        @CurrentUser() user: JwtPayload,
        @Param('chatId', ParseUUIDPipe) chatId: string,
        @Param('userId', ParseUUIDPipe) userId: string,
    ): Promise<void> {
        if (user.sub === userId) {
            throw new Error('You cannot remove yourself as owner from chat');
        }

        await this.chatUserService.removeUserFromChat(chatId, userId);
    }
}
