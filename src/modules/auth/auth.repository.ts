import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'cassandra-driver';

import { tmpStringifyDbResult } from 'src/common/utils/tmp-stringify-db-result';
import { SCYLLA_DB_CLIENT } from 'src/modules/db/scylla-db.constants';

// import { JwtRefreshEntity } from './jwt-refresh.entity';
import { AuthEntity } from './auth.entity';

@Injectable()
export class AuthRepository {
    constructor(@Inject(SCYLLA_DB_CLIENT) private readonly dbClient: Client) {}

    async create(email: string, password: string, userId: string): Promise<AuthEntity> {
        const resultSet = await this.dbClient.execute('INSERT INTO auth (email, password, user_id) VALUES (?, ?, ?)', [
            email,
            password,
            userId,
        ]);

        return tmpStringifyDbResult(resultSet.first()) as any as AuthEntity;
    }

    async findAuthByLoginCred(email: string): Promise<AuthEntity> {
        const resultSet = await this.dbClient.execute('SELECT * FROM auth WHERE email = ?', [email]);

        return tmpStringifyDbResult(resultSet.first()) as any as AuthEntity;
    }

    async findAll(): Promise<AuthEntity[]> {
        const resultSet = await this.dbClient.execute('SELECT * FROM auth');

        return tmpStringifyDbResult(resultSet.rows) as any as AuthEntity[];
    }

    // async findJwtRefreshByUserId(userId: string): Promise<JwtRefreshEntity> {
    //     return this.dbClient.execute('SELECT * FROM jwt_refresh WHERE user_id = ?', [userId]) as any;
    // }
}
