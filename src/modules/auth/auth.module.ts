import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository],
    exports: [AuthService],
})
export class AuthModule {}
