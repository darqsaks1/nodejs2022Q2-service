import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { join } from 'path';
import { FullyLogger } from '../dataBasses/service/loggerService.service';
import { waitingExp, addLogger } from '../helpers';


async function init() {
  const app = await NestFactory.create(AppModule, {
    logger: new FullyLogger(addLogger()),
  });
  const PORT: string | number = process.env.PORT || 4000;
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  waitingExp();
  const DOC_API = await readFile(join(process.cwd(), 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT);
}

init().then(() => console.log('http://localhost:4000/doc#/Users/get_user'));
