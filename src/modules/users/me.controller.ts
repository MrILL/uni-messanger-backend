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
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtPayload } from 'src/modules/auth/types/jwt-payload';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos';
import { UserEntity } from './user.entity';
import { ChatUsersService } from '../chat-users/chat-users.service';
import { ChatUserEntity } from '../chat-users/chat-user.entity';

@Controller({
    path: 'me',
    version: '1',
})
@ApiTags('me')
@ApiBearerAuth()
export class MeController {
    constructor(
        private readonly usersService: UsersService,
        private readonly chatUsersService: ChatUsersService,
    ) {}

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Current user found', type: UserEntity })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getMe(@CurrentUser() user: JwtPayload): Promise<UserEntity> {
        return this.usersService.findOne(user.sub);
    }

    @Patch()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'Current user updated', type: UserEntity })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async updateMe(@CurrentUser() user: JwtPayload, @Body() updateDto: UpdateUserDto): Promise<UserEntity> {
        return this.usersService.update(user.sub, updateDto);
    }

    // TODO add cascade deleting of everything that relates to user
    // @Delete()
    // @HttpCode(HttpStatus.NO_CONTENT)
    // @UseGuards(AuthGuard)
    // @ApiResponse({ status: 204, description: 'Current user deleted' })
    // @ApiResponse({ status: 401, description: 'Unauthorized' })
    // async deleteMe(@CurrentUser() user: JwtPayload): Promise<void> {
    //     await this.usersService.delete(user.sub);
    // }

    @Get('chats')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'List of user chats', type: ChatUserEntity, isArray: true })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getMyChats(@CurrentUser() user: JwtPayload): Promise<ChatUserEntity[]> {
        return this.chatUsersService.findUserChats(user.sub);
    }

    @Delete('chats/:chatId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard)
    @ApiResponse({ status: 204, description: 'User removed from chat' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Chat not found' })
    async leaveChat(@CurrentUser() user: JwtPayload, @Param('chatId', ParseUUIDPipe) chatId: string): Promise<void> {
        await this.chatUsersService.removeUserFromChat(user.sub, chatId);
    }
}
