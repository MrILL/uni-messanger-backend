import { Global, Module } from '@nestjs/common';

import { ChatUsersModule } from 'src/modules/chat-users/chat-users.module';

import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';
import { ChatsController } from './chats.controller';

@Global()
@Module({
    imports: [ChatUsersModule],
    controllers: [ChatsController],
    providers: [ChatsService, ChatsRepository],
    exports: [ChatsService],
})
export class ChatsModule {}
