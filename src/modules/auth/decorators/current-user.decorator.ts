import { InternalServerErrorException, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContextHost) => {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
        throw new InternalServerErrorException('User not found in request');
    }

    return request.user;
});
