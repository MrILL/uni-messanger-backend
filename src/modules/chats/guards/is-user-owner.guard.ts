import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ChatsService } from '../chats.service';

@Injectable()
export class IsUserOwnerGuard implements CanActivate {
    constructor(@Inject(ChatsService) private readonly chatsService: ChatsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const chatId = request.params.chatId;
        const userId = request.user.sub;

        try {
            const chat = await this.chatsService.findOne(chatId);
            if (chat.owner_id !== userId) {
                return false;
            }
        } catch (e) {
            return false;
        }

        return true;
    }
}
