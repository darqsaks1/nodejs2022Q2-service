import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';



async function initProject() {
  dotenv.config({ path: resolve(cwd(), '.env') });
  const PORT_ENV = process.env.PORT || 4000;
  const doc = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

  SwaggerModule.setup('doc', app, parse(doc));
  await app.listen(PORT_ENV);
}
initProject();
