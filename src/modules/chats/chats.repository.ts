import { Inject, Injectable } from '@nestjs/common';
import { Client, types } from 'cassandra-driver';

import { tmpStringifyDbResult } from 'src/common/utils/tmp-stringify-db-result';
import { SCYLLA_DB_CLIENT } from 'src/modules/db/scylla-db.constants';

import { CreateChatDto } from './dtos/create-chat.dto';
import { ChatEntity } from './chat.entity';

@Injectable()
export class ChatsRepository {
    constructor(@Inject(SCYLLA_DB_CLIENT) private readonly dbClient: Client) {}

    /**
     * @returns id of the newly created chat
     */
    async create(ownerId: string, chat: CreateChatDto): Promise<string> {
        const newChatId = types.Uuid.random().toString();

        await this.dbClient.execute(
            `INSERT INTO chats (chat_id, name, slug, description, avatar, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [newChatId, chat.name, chat.slug, chat.description, chat.avatar ?? null, ownerId, new Date(), new Date()],
        );

        return newChatId;
    }

    // TODO pagination
    async findAll(): Promise<ChatEntity[]> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM chats LIMIT 100`);

        return tmpStringifyDbResult(resultSet.rows) as any as ChatEntity[];
    }

    async findOneById(id: string): Promise<ChatEntity> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM chats WHERE chat_id = ?`, [id]);

        return tmpStringifyDbResult(resultSet.first()) as any as ChatEntity;
    }

    async findOneBySlug(slug: string): Promise<ChatEntity> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM chats WHERE slug = ?`, [slug]);

        return tmpStringifyDbResult(resultSet.first()) as any as ChatEntity;
    }

    async update(chat: ChatEntity): Promise<void> {
        await this.dbClient.execute(
            `UPDATE chats SET name = ?, slug = ?, description = ?, avatar = ?, updated_at = ? WHERE chat_id = ?`,
            [chat.name, chat.slug, chat.description, chat.avatar, new Date(), chat.chat_id],
        );
    }

    async delete(id: string): Promise<void> {
        await this.dbClient.execute(`DELETE FROM chats WHERE chat_id = ?`, [id]);
    }
}
