// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AssetModule } from './asset/asset.module';
import { Asset } from './asset/asset.entity';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env globally
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', 'Da1wi2d$'),
        database: config.get<string>('DB_NAME', 'MININFRA'),
        entities: [Asset], // Add specific entities
        autoLoadEntities: true, // Automatically load all entities
        synchronize: false, // Set true only in development
      }),
    }),
    UserModule,
    AssetModule,
    InventoryModule,
    ReportsModule,
    AuthModule,
  ],
})
export class AppModule {}