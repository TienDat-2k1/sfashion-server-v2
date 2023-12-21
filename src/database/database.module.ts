import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          uri: 'mongodb://localhost:27017',
          dbName: '',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
