import { Injectable } from "@nestjs/common";
import { isHasMorePagination } from "src/base/pagination/is-has-more";
import { PaginationArgsWithSearchTerm } from "src/base/pagination/pagination.args";
import { PrismaService } from "src/prisma.service";
import { CreateRequestDto } from "./dto/create-request.dto";

@Injectable()
export class RequestService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(args?: PaginationArgsWithSearchTerm) {
    const requests = await this.prismaService.request.findMany({
      skip: +args?.skip,
      take: +args?.take,
    });

    const totalCount = await this.prismaService.user.count();

    const isHasMore = isHasMorePagination(totalCount, +args?.skip, +args.take);

    return { items: requests, isHasMore };
  }

  async create(createRequestDto: CreateRequestDto, userId: number) {
    return this.prismaService.request.create({
      data: {
        cve: createRequestDto.cve,
        description: createRequestDto.description,
        screenshot: createRequestDto.screenshot,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
