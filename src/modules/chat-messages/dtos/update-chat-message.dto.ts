import { PickType } from '@nestjs/swagger';
import { CreateChatMessageDto } from './create-chat-message.dto';

export class UpdateChatMessageDto extends PickType(CreateChatMessageDto, ['content']) {}
