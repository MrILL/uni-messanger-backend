import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        {
            ...JwtModule.registerAsync({
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    secret: await configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: await configService.get('JWT_EXPIRE'),
                    },
                }),
            }),
            global: true,
        },
    ],
    exports: [JwtModule],
})
export class GlobalJwtModule {}
