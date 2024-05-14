import { APP_GUARD } from '@nestjs/core';
import { TestGuard } from './test.guard';

export const TestGlobalProvider = {
    provide: APP_GUARD,
    useClass: TestGuard,
};
