import { Inject, Injectable } from '@nestjs/common';
import { Client, types } from 'cassandra-driver';

import { tmpStringifyDbResult } from 'src/common/utils/tmp-stringify-db-result';
import { SCYLLA_DB_CLIENT } from 'src/modules/db/scylla-db.constants';

import { CreateUserDto } from './dtos';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository {
    constructor(@Inject(SCYLLA_DB_CLIENT) private readonly dbClient: Client) {}

    /**
     * @returns id of the newly created user
     */
    async create(user: CreateUserDto): Promise<string> {
        const newUserId = types.Uuid.random().toString();

        await this.dbClient.execute(
            `INSERT INTO users (user_id, username, first_name, last_name, avatar, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [newUserId, user.username, user.first_name, user.last_name, user.avatar ?? null, new Date(), new Date()],
        );

        return newUserId;
    }

    // TODO pagination
    async findAll(): Promise<UserEntity[]> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM users LIMIT 10`);

        return tmpStringifyDbResult(resultSet.rows) as any as UserEntity[];
    }

    async findOneById(id: string): Promise<UserEntity> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM users WHERE user_id = ?`, [id]);

        return tmpStringifyDbResult(resultSet.first()) as any as UserEntity;
    }

    async findOneByUsername(username: string): Promise<UserEntity> {
        const resultSet = await this.dbClient.execute(`SELECT * FROM users WHERE username = ?`, [username]);

        return tmpStringifyDbResult(resultSet.first()) as any as UserEntity;
    }

    async update(user: UserEntity): Promise<void> {
        await this.dbClient.execute(
            `UPDATE users SET username = ?, first_name = ?, last_name = ?, avatar = ?, updated_at = ? WHERE user_id = ?`,
            [user.username, user.first_name, user.last_name, user.avatar, new Date(), user.user_id],
        );
    }

    async delete(id: string): Promise<void> {
        await this.dbClient.execute(`DELETE FROM users WHERE user_id = ?`, [id]);
    }
}
