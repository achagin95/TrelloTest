import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { CookieService } from './cookie.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtServise: JwtService) { }

  canActivate(
    context: ExecutionContext,
  ) {

    const req = context.switchToHttp().getRequest() as Request
    
    const token = req.cookies[CookieService.tokenKey]

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const sessionInfo = this.jwtServise.verifyAsync(token, { secret: process.env.JWT_SECRET })

      req['session'] = sessionInfo

    } catch {
      throw new UnauthorizedException()
    }

    return true;
  }
}
