import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddCardsDto, AddColomnDto, AddCommentDto, CardsDto, ColomnDto, CommentsDto, UpdateCardDto } from './dto';
import { ColomnService } from './colomn.service';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { OwnerGuard } from './owner.guard';
//import { OwnerGuard } from './colomn.guard';

@Controller('colomn')
@UseGuards(AuthGuard)
export class ColomnController {

    constructor(private colomnServise: ColomnService) { }


    //Колонки
    @Get()
    @ApiOkResponse({
        type: [ColomnDto]
    })
    @ApiTags('Colomns')
    getColomn(@SessionInfo() session: GetSessionInfoDto) {
        return this.colomnServise.getColomnUserById(session.id)
    }

    @Post('colomn-create')
    @ApiCreatedResponse({
        type: ColomnDto
    })
    @ApiTags('Colomns')
    createColomn(
        @Body() body: AddColomnDto,
        @SessionInfo() session: GetSessionInfoDto
    ) {

        return this.colomnServise.createColomn(body.title, body.body, session.id)
    }

    @Delete('/:id')
    @ApiOkResponse({
        //type: ColomnDto
    })
    @ApiTags('Colomns')
    deleteColomn(
        @SessionInfo() session: GetSessionInfoDto,
        @Param('id', ParseIntPipe) id: number) {
        return this.colomnServise.deleteColomnById(id, session.id)
    }


    //Карточки
    @Get(":id")
    @ApiOkResponse({
        type: [CardsDto]
    })
    @ApiTags('Cards')
    @UseGuards(OwnerGuard)
    getCardsByColomnId(
        @SessionInfo() session: GetSessionInfoDto,
        @Param('id', ParseIntPipe) id: number) {
        return this.colomnServise.getCardsByColomnId(id, session.id)
    }

    @Get("/cards/:id")
    @ApiOkResponse({
        type: CardsDto
    })
    @ApiTags('Cards')
    @UseGuards(OwnerGuard)
    getCardbyId(
        @SessionInfo() session: GetSessionInfoDto,
        @Param('id', ParseIntPipe) id: number) {
        return this.colomnServise.getCardByIdCheck(id, session.id)
    }

    @Post('card-create')
    @ApiCreatedResponse({
        type: CardsDto
    })
    @ApiTags('Cards')
    @UseGuards(OwnerGuard)
    //сделал гвард, работает.
    //Осталось прописать логику на овнера и везде ее заюзать
    createCard(
        @Body() body: AddCardsDto,
        @SessionInfo() session: GetSessionInfoDto
    ) {

        return this.colomnServise.createCard(body.title, body.body, Number(body.colomnsId), session.id)
    }

    @Post('card-update')
    @ApiCreatedResponse({
        type: CardsDto
    })
    @ApiTags('Cards')
    @UseGuards(OwnerGuard)
    updateCard(
        @Body() body: UpdateCardDto,
        @SessionInfo() session: GetSessionInfoDto
    ) {

        return this.colomnServise.updateCard(body.id, body.body, session.id)
    }

    @Delete('/card/:colomnId/:id')
    @ApiOkResponse()
    @ApiTags('Cards')
    deleteCard(
        @Param('colomnId', ParseIntPipe) colomnId: number,
        @Param('id', ParseIntPipe) id: number,
        @SessionInfo() session: GetSessionInfoDto
    ) {
        return this.colomnServise.deleteCard(colomnId, id, session.id)
    }


    //Комментарии
    @Get("/cards/comments/:id")
    @ApiOkResponse({
        type: [CommentsDto]
    })
    @ApiTags('Comments')
    @UseGuards(OwnerGuard)
    getCommentsByCardId(
        @SessionInfo() session: GetSessionInfoDto,
        @Param('id', ParseIntPipe) id: number) {
        return this.colomnServise.getCommetsByCardId(id, session.id)
    }

    @Post("/cards/comments")
    @ApiCreatedResponse({
        type: [CommentsDto]
    })
    @ApiTags('Comments')
    @UseGuards(OwnerGuard)
    createCommentsByCardId(
        @SessionInfo() session: GetSessionInfoDto,
        @Body() body: AddCommentDto) {
        return this.colomnServise.createCommetsByCardId(Number(body.cardsId), body.title, body.body, session.id)
    }

    @Delete('/card/comments/:cardId/:id')
    @ApiOkResponse()
    @ApiTags('Comments')
    deleteComment(
        @Param('cardId', ParseIntPipe) cardId: number,
        @Param('id', ParseIntPipe) id: number,
        @SessionInfo() session: GetSessionInfoDto
    ) {
        return this.colomnServise.deleteComment(cardId, id, session.id)
    }


}

