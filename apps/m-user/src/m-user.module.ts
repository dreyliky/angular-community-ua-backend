import { LoggerModule } from '@acua/shared/logger';
import { MongoModule } from '@acua/shared/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MUserController } from './m-user.controller';
import { MUserService } from './m-user.service';
import { User, UserSchema } from './schemas';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongoModule,
        LoggerModule
    ],
    controllers: [MUserController],
    providers: [MUserService]
})
export class MUserModule {}
