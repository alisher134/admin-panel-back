import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export const getJwtConfig = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => ({
  secret: configService.get("API_JWT_SECRET"),
});
