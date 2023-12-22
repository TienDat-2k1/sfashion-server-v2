import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get<string>('DB_URL'),
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
          connectionFactory: (connection) => {
            Logger.debug(
              `App connected to mongodb on ${config.get<string>('DB_URL')}`,
              'MONGODB',
            );

            return connection;
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
