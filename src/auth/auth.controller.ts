import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { GetSessionInfoDto, SignIpBodyEmailDto, SignUpBodyDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express'
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private cookieService: CookieService) { }

    @Post('sign-up')
    @ApiTags('auth')
    @ApiCreatedResponse()
    async signUp(
        @Body() body: SignUpBodyDto,
        @Res({ passthrough: true }) res: Response) {
        const { accesToken } = await this.authService.signUp(
            body.username,
            body.email,
            body.full_name,
            body.password,
            "") // надо было сделать без роли, так как роль по дефолту юзер, а админ назначается уже другим методом.
        //пришлось добавить пустую строчку, чтоб быстрее и не переписывать.
        this.cookieService.setToken(res, accesToken)

    }

    @Post('sign-in')
    @ApiOkResponse()
    @ApiTags('auth')
    @HttpCode(HttpStatus.OK)
    async signIn(
        @Body() body: SignIpBodyEmailDto,
        @Res({ passthrough: true }) res: Response) {

            const { accesToken } = await this.authService.signIn(
                body.email,
                body.password)
            this.cookieService.setToken(res, accesToken)
    }

    @Post('sign-out')
    @ApiOkResponse()
    @ApiTags('auth')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    signOut(@Res({ passthrough: true }) res: Response) {
        this.cookieService.removeToken(res)
    }

    @Get('session')
    @ApiOkResponse({
        type: GetSessionInfoDto
    })
    @ApiTags('auth')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
        return session
    }

}
