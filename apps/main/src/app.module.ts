import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { environment } from './environment';
import { UserModule } from './user';

@Module({
    imports: [MongooseModule.forRoot(environment.mongoUrl), UserModule],
    controllers: [AppController]
})
export class AppModule {}
