import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';

// class HelloWorldDto {
//   @ApiProperty()
//   message: string
// }


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService) {}

  // @Get()
  // @ApiOkResponse()
  // getHello(): HelloWorldDto {
  //   return {message: this.appService.getHello()};
  // }

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }


}
