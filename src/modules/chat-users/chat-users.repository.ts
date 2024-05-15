import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';

import { tmpStringifyDbResult } from 'src/common/utils/tmp-stringify-db-result';
import { SCYLLA_DB_CLIENT } from 'src/modules/db/scylla-db.constants';

import { ChatUserEntity } from './chat-user.entity';
import { AddUserToChatDto } from './dtos';

@Injectable()
export class ChatUsersRepository {
    constructor(@Inject(SCYLLA_DB_CLIENT) private readonly dbClient: Client) {}

    async addUserToChat(chatId: string, addUserDto: AddUserToChatDto): Promise<void> {
        const userId = addUserDto.userId;
        const permissionId = addUserDto.permissionId ?? null;
        const isBlocked = addUserDto.isBlocked ?? false;

        await this.dbClient.execute(
            `INSERT INTO users_by_chat (chat_id, user_id, permission_id, is_blocked) VALUES (?, ?, ?, ?)`,
            [chatId, userId, permissionId, isBlocked],
        );
    }

    async findUserInChat(chatId: string, userId: string): Promise<ChatUserEntity> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM users_by_chat WHERE chat_id = ? AND user_id = ?`, [
            chatId,
            userId,
        ]);

        return tmpStringifyDbResult(resultSet.first()) as any as ChatUserEntity;
    }

    async findChatUsers(chatId: string): Promise<ChatUserEntity[]> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM users_by_chat WHERE chat_id = ?`, [chatId]);

        return tmpStringifyDbResult(resultSet.rows) as any as ChatUserEntity[];
    }

    async findUserChats(userId: string): Promise<ChatUserEntity[]> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM users_by_chat WHERE user_id = ?`, [userId]);

        return tmpStringifyDbResult(resultSet.rows) as any as ChatUserEntity[];
    }

    async updateUserInChat(chatUser: ChatUserEntity): Promise<void> {
        const { permission_id, is_blocked, chat_id, user_id } = chatUser;

        await this.dbClient.execute(
            `UPDATE users_by_chat SET permission_id = ?, is_blocked = ? WHERE chat_id = ? AND user_id = ?`,
            [permission_id, is_blocked, chat_id, user_id],
        );
    }

    async removeUserFromChat(chatId: string, userId: string): Promise<void> {
        await this.dbClient.execute(`DELETE FROM users_by_chat WHERE chat_id = ? AND user_id = ?`, [chatId, userId]);
    }
}
