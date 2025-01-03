import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import * as i18nextMiddleware from 'i18next-http-middleware';
import Backend from 'i18next-fs-backend';
import i18next from 'i18next';
import path, { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  const localesPath = join(__dirname, '../../../../', 'demo-backend', 'src', 'locales');

  // Initialize i18next
  await i18next

    .use(i18nextMiddleware.LanguageDetector)
    .use(Backend)
    .init({
      debug: false,
      preload: ['en', 'es', 'fr'],
      fallbackLng: 'en',
      ns: ['public', 'admin'],
      defaultNS: 'public',
      backend: {
        loadPath: `${localesPath}/{{lng}}/{{ns}}.json`,
        addPath: `${localesPath}/{{lng}}/{{ns}}.missing.json`,
      },
    });

  // Use i18next middleware
  const httpInstance = app.getHttpAdapter().getInstance();
  httpInstance.use(
    i18nextMiddleware.handle(i18next, {
      removeLngFromUrl: false,
    })
  );

  //allow the server to parse JSON bodies
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(3000);
}
bootstrap();
