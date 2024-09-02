import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { CookieService } from 'src/auth/cookie.service';
import { GetSessionInfoDto } from 'src/auth/dto';
import { Request } from 'express'
import { AddCardsDto, AddColomnDto } from './dto';

@Injectable()
export class OwnerGuard implements CanActivate {

  constructor(private jwtServise: JwtService,
    sessionInfo: GetSessionInfoDto,
    addCardDto: AddCardsDto,
    addColomnDto: AddColomnDto) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest() as Request
    const token = req.cookies[CookieService.tokenKey]

    const sessionInfo = this.jwtServise.verifyAsync(token, { secret: process.env.JWT_SECRET })

    // console.log("Req.body: ", req.body)
    // console.log("Req.params: ", req.params)
    // console.log("Req.query: ", req.query)
    // console.log("Session info: ", sessionInfo)

    // console.log("context", context)

    return true;
  }
}
