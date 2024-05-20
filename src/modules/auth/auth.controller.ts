import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserEntity } from 'src/modules/users/user.entity';

import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, JwtDto } from './dtos';

@Controller({
    path: 'auth',
    version: '1',
})
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'User registered', type: UserEntity })
    @ApiResponse({ status: 409, description: 'User with the same email already exists', type: UserEntity })
    async register(@Body() dto: RegisterDto): Promise<UserEntity> {
        return this.authService.register(dto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'User logged in', type: JwtDto })
    async login(@Body() dto: LoginDto): Promise<JwtDto> {
        return this.authService.login(dto);
    }
}
