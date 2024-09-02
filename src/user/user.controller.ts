import { BadRequestException, Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { userAccessDto, userInfoDto } from './dto';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {

    constructor(private userServise: UserService) { }
    //constructor(private use)

    @Get(':id')
    @ApiOkResponse({
        type: userInfoDto
    })
    @ApiTags('User')
    async getUserInfoById(
        @Param('id', ParseIntPipe) id: number
    ) {
        try {
            const user = await this.userServise.findById(id)
            return {
                Username: user.username,
                email: user.email,
                fullname: user.full_name,
                //role: user.role
            }
        } catch {
            throw new NotFoundException({
                message: 'User Id not found'
            })
        }
    }

    @Post("/card-access")
    @ApiCreatedResponse({
        type: userAccessDto
    })
    @ApiTags('User')
    async getAccessToCard(
        @Body() body: userAccessDto,
        @SessionInfo() sessionInfo: GetSessionInfoDto
    ) {
        return this.userServise.getAccessToCard(Number(body.cardsId), Number(body.userId), sessionInfo.id)
    }

}
// @SessionInfo() session: GetSessionInfoDto,
// @Body() body: AddCommentDto)