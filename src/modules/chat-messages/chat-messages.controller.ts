import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotImplementedException,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/modules/auth/types/jwt-payload';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { IsUserInChatGuard } from 'src/modules/chat-users/guards/is-user-in-chat.guard';

import { ChatMessagesService } from './chat-messages.service';
import { CreateChatMessageDto } from './dtos';
import { ChatMessageEntity } from './chat-message.entity';

@Controller({
    path: 'chats/:chatId/messages',
    version: '1',
})
@ApiTags('chat-messages')
export class ChatMessagesController {
    constructor(private readonly chatMessagesService: ChatMessagesService) {}

    @Post()
    @UseGuards(AuthGuard, IsUserInChatGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: CreateChatMessageDto })
    @ApiResponse({ status: 201, description: 'Message created', type: ChatMessageEntity })
    async create(
        @CurrentUser() user: JwtPayload,
        @Param('chatId') chatId: string,
        @Body() dto: CreateChatMessageDto,
    ): Promise<ChatMessageEntity> {
        return this.chatMessagesService.create(chatId, user.sub, dto);
    }

    @Get()
    @UseGuards(AuthGuard, IsUserInChatGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'List of chat messages', type: ChatMessageEntity, isArray: true })
    @ApiResponse({ status: 404, description: 'No messages found in chat' })
    async findAll(@Param('chatId') chatId: string): Promise<ChatMessageEntity[]> {
        return this.chatMessagesService.findAllChatMessagesForDate(chatId);
    }

    @Get(':messageId')
    @UseGuards(AuthGuard, IsUserInChatGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Message found', type: ChatMessageEntity })
    @ApiResponse({ status: 404, description: 'Message not found' })
    async findOne(@Param('messageId') messageId: string): Promise<ChatMessageEntity> {
        return this.chatMessagesService.findChatMessageById(messageId);
    }

    @Patch(':messageId')
    @UseGuards(AuthGuard, IsUserInChatGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: CreateChatMessageDto })
    @ApiResponse({ status: 200, description: 'Message updated', type: ChatMessageEntity })
    @ApiResponse({ status: 404, description: 'Message not found' })
    async update(@Param('messageId') messageId: string, @Body() dto: CreateChatMessageDto): Promise<ChatMessageEntity> {
        throw new NotImplementedException(
            'Need to redesign table as currently it doesnt support updating/deleting messages',
        );
        return this.chatMessagesService.updateChatMessage(messageId, dto);
    }

    @Delete(':messageId')
    @UseGuards(AuthGuard, IsUserInChatGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: 204, description: 'Message deleted' })
    @ApiResponse({ status: 404, description: 'Message not found' })
    async delete(@Param('messageId') messageId: string): Promise<void> {
        throw new NotImplementedException(
            'Need to redesign table as currently it doesnt support updating/deleting messages',
        );
        await this.chatMessagesService.deleteChatMessage(messageId);
    }
}
