import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule], //! docker compose
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SEED'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],

  providers: [JwtService, JwtStrategy, JwtGuard],
  exports: [JwtService],
})
export class JsonWebTokenModule {}
