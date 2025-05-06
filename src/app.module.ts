import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { MediaModule } from "./media/media.module";
import { SettingsModule } from "./settings/settings.module";
import { StatisticsModule } from "./statistics/statistics.module";
import { UserModule } from "./user/user.module";
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    MediaModule,
    SettingsModule,
    StatisticsModule,
    RequestModule,
  ],
})
export class AppModule {}
