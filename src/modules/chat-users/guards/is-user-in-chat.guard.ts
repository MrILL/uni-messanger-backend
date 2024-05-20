import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ChatUsersService } from '../chat-users.service';

@Injectable()
export class IsUserInChatGuard implements CanActivate {
    constructor(@Inject(ChatUsersService) private readonly chatUsersService: ChatUsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const chatId = request.params.chatId;
        const userId = request.user.sub;

        try {
            const userInChat = await this.chatUsersService.findUserInChat(chatId, userId);
            if (!userInChat) {
                throw new ForbiddenException('User is not in chat');
            }
        } catch (e) {
            throw new ForbiddenException('User is not in chat');
        }

        return true;
    }
}
