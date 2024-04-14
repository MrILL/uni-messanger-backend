import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

const logger = new Logger('App');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    await app.listen(configService.get('APP_PORT') || 3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
