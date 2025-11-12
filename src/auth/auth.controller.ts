/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GetLang } from './decoretor';
import { I18nContext } from 'nestjs-i18n';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  @MessagePattern('login')
  async signin(@GetLang() i18n: I18nContext, @Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post(':id')
  @MessagePattern('update_auth')
  updateAuth(@Param('id') id: string, @Body() dto: AuthDto) {
    return this.authService.updateAuth(id, dto);
  }
}
