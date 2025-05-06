import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { PaginationArgsWithSearchTerm } from "src/base/pagination/pagination.args";
import { CreateRequestDto } from "./dto/create-request.dto";
import { RequestService } from "./request.service";

@Controller("request")
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Auth("ADMIN")
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(@Query() params: PaginationArgsWithSearchTerm) {
    return this.requestService.getAll(params);
  }

  @Auth("ADMIN")
  @Post()
  @HttpCode(HttpStatus.OK)
  create(
    @Body() createRequestDto: CreateRequestDto,
    @CurrentUser("id") id: string
  ) {
    return this.requestService.create(createRequestDto, +id);
  }
}
