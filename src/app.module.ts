import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TestGlobalProvider } from './common/test/test.provider';
import { ScyllaDbModule } from './modules/db/scylla-db.module';
import { GlobalJwtModule } from './modules/global-jwt/global-jwt.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ChatsModule } from './modules/chats/chats.module';
import { ChatUsersModule } from './modules/chat-users/chat-users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ScyllaDbModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                contactPoints: configService.get('DB_CONTACT_POINTS').split(','),
                localDataCenter: configService.get('DB_LOCAL_DC'),
                keyspace: configService.get('DB_KEYSPACE'),
                credentials: {
                    username: configService.get('DB_USERNAME'),
                    password: configService.get('DB_PASSWORD'),
                },
            }),
        }),
        GlobalJwtModule,
        UsersModule,
        AuthModule,
        ChatsModule,
        ChatUsersModule,
    ],
    controllers: [AppController],
    providers: [AppService, TestGlobalProvider],
})
export class AppModule {}
