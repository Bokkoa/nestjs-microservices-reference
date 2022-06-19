import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionFIlter } from './common/filters/http-exception.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionFIlter());
  app.useGlobalInterceptors(new TimeOutInterceptor());

  const options = new DocumentBuilder()
                      .setTitle('Superflight API')
                      .setDescription('Scheduled flights app')
                      .setVersion('2.0.0')
                      .addBearerAuth()
                      .build();

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api/docs',app, document,{
    swaggerOptions: {
      filter: true,
    }
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
