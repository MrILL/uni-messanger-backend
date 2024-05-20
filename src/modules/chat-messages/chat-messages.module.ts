import { Global, Module } from '@nestjs/common';

import { ChatMessagesController } from './chat-messages.controller';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesRepository } from './chat-messages.repository';

@Global()
@Module({
    imports: [],
    controllers: [ChatMessagesController],
    providers: [ChatMessagesService, ChatMessagesRepository],
    exports: [ChatMessagesService],
})
export class ChatMessagesModule {}
