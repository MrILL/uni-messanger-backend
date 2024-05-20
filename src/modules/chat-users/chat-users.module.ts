import { Global, Module } from '@nestjs/common';

import { ChatUsersController } from './chat-users.controller';
import { ChatUsersService } from './chat-users.service';
import { ChatUsersRepository } from './chat-users.repository';

@Global()
@Module({
    imports: [],
    controllers: [ChatUsersController],
    providers: [ChatUsersService, ChatUsersRepository],
    exports: [ChatUsersService],
})
export class ChatUsersModule {}
