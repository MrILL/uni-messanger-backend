import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TestGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const isTestOnly = this.reflector.get<boolean>('testonly', context.getHandler());
        if (isTestOnly && process.env.NODE_ENV === 'production') {
            return false;
        }

        return true;
    }
}
