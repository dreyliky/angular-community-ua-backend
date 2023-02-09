import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONFIG } from './constants';

@Module({
    imports: [
        MongooseModule.forRootAsync(MONGO_CONFIG)
    ]
})
export class MongoModule {}
