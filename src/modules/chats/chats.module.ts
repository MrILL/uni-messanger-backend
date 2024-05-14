import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';
import { ChatsController } from './chats.controller';

@Module({
    imports: [],
    controllers: [ChatsController],
    providers: [ChatsService, ChatsRepository],
    exports: [ChatsService],
})
export class ChatsModule {}
