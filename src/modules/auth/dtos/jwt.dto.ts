import { IsJWT } from 'class-validator';

export class JwtDto {
    @IsJWT()
    jwt: string;
}
