import { Controller, Get, Header, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  getHello(@Query('overridepartner') overridepartner: string): object {
    const partner = overridepartner ?? 'default';
    return {partner}
  }
}
