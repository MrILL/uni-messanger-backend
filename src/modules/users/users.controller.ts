import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Test } from 'src/common/test/test.decorator';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserEntity } from './user.entity';
import { ParseUserIdPipe } from './pipes/user-id.pipe';

@Controller({
    path: 'users',
    version: '1',
})
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Test()
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'User created', type: UserEntity })
    @ApiResponse({ status: 409, description: 'User with the same username already exists' })
    async create(@Body() user: CreateUserDto): Promise<UserEntity> {
        return this.usersService.create(user);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Test()
    @ApiResponse({ status: 200, description: 'List of users', type: UserEntity, isArray: true })
    @ApiResponse({ status: 404, description: 'No users found' })
    async findAll(): Promise<UserEntity[]> {
        return this.usersService.findAll();
    }

    @Get(':userId')
    @HttpCode(HttpStatus.OK)
    @Test()
    @ApiResponse({ status: 200, description: 'User found', type: UserEntity })
    @ApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('userId', ParseUserIdPipe) userId: string): Promise<UserEntity> {
        return this.usersService.findOne(userId);
    }

    @Patch(':userId')
    @HttpCode(HttpStatus.OK)
    @Test()
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ status: 200, description: 'User updated', type: UserEntity })
    @ApiResponse({ status: 404, description: 'User not found' })
    async update(
        @Param('userId', ParseUserIdPipe) userId: string,
        @Body() updateDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return this.usersService.update(userId, updateDto);
    }

    @Delete(':userId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Test()
    @ApiResponse({ status: 204, description: 'User deleted' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async delete(@Param('userId', ParseUserIdPipe) userId: string): Promise<void> {
        await this.usersService.delete(userId);
    }
}
