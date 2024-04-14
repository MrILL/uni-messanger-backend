import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScyllaDbModule } from './modules/db/scylla-db.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
