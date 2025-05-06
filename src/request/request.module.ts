import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { RequestController } from "./request.controller";
import { RequestService } from "./request.service";

@Module({
  controllers: [RequestController],
  providers: [RequestService, PrismaService],
})
export class RequestModule {}
