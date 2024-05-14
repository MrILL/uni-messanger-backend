import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

export class Hash {
    static make(plainText: string | Buffer): string {
        const salt = randomBytes(16).toString('hex');
        const hashed = scryptSync(plainText, salt, 64).toString('hex');
        return `${salt}:${hashed}`;
    }

    static compare(plainText: string | Buffer, hash: string): boolean {
        const [salt, key] = hash.split(':');
        const hashedBuffer = scryptSync(plainText, salt, 64);
        const keyBuffer = Buffer.from(key, 'hex');
        return timingSafeEqual(hashedBuffer, keyBuffer);
    }
}
