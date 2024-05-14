import { CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AuthGuard implements CanActivate {
    constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            request['user'] = await this.jwtService.verifyAsync(token);
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = (request.headers as any).authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
