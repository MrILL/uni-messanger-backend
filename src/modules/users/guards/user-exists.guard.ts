import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class UserExistsGuard implements CanActivate {
    constructor(@Inject(UsersService) private readonly usersService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = request.params.userId || request.body.userId;

        if (!userId) {
            throw new BadRequestException('User id not provided');
        }

        try {
            const user = await this.usersService.findOne(userId);
            if (!user) {
                throw new BadRequestException('User id not provided');
            }
        } catch (e) {
            throw new BadRequestException('User id not provided');
        }

        return true;
    }
}
