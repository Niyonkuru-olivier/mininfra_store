import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Ensure ConfigModule is imported
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ConfigModule for environment variables
    TypeOrmModule.forRoot({
      type: 'mysql', // Database type
      host: process.env.DB_HOST || '127.0.0.1', // Use environment variable or default
      port: parseInt(process.env.DB_PORT || '3306'), // Parse port from environment variable
      username: process.env.DB_USERNAME || 'root', // Use environment variable or default
      password: process.env.DB_PASSWORD || 'password', // Use environment variable or default
      database: process.env.DB_NAME || 'MININFRA', // Use environment variable or default
      entities: [User], // Entities to be loaded
      synchronize: false, // Set to false in production
    }),
    AuthModule, // Import AuthModule
    UsersModule, // Import UsersModule
  ],
})
export class AppModule {}