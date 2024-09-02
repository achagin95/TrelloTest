import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, MaxLength } from "class-validator"

export class CommentsDto {

    @ApiProperty()
    id: number

    @ApiProperty()
    @MaxLength(30)
    title: string

    @ApiProperty()
    @MaxLength(1000)
    body: string

    @ApiProperty()
    @IsNotEmpty()
    cardsId: number

    @ApiProperty()
    @IsNotEmpty()
    userId: number

    @ApiProperty()
    @IsNotEmpty()
    userName: string

    @ApiProperty()
    createdAt: Date

}

export class AddCommentDto {

    @ApiProperty({
        example: "Title Comment"
    })
    @MaxLength(30)
    title: string

    @ApiProperty({
        example: "qweqweqweqweqweqweqweqwewqeqwe"
    })
    @MaxLength(1000)
    body: string

    @ApiProperty({
        example: 3
    })
    @IsNotEmpty()
    cardsId: number

}

export class CardsDto {

    @ApiProperty()
    id: number

    @ApiProperty()
    @MaxLength(30)
    title: string

    @ApiProperty()
    @MaxLength(1000)
    body: string

    @ApiProperty()
    colomnsId: number


    @ApiProperty({
        type: [CommentsDto]
    })
    comments: CommentsDto[]

    @ApiProperty()
    createdAt: Date

}

export class AddCardsDto {

    @ApiProperty({
        example: "Title test"
    })
    @MaxLength(30)
    title: string

    @ApiProperty({
        example: "BODY CARD test"
    })
    @MaxLength(1000)
    body: string

    @ApiProperty({
        example: "1"
    })
    @IsNotEmpty()
    colomnsId: number

}

export class UpdateCardDto {

    @ApiProperty({
        example: 1
    })
    id: number

    @ApiProperty({
        example: "BODY CARD test Update"
    })
    @MaxLength(1000)
    body: string


}

export class ColomnDto {

    @ApiProperty()
    id: number

    @ApiProperty()
    @MaxLength(30)
    title: string

    @ApiProperty()
    @MaxLength(100)
    body: string


    @ApiProperty()
    userId: number
    //owner

    @ApiProperty({
        type: [CardsDto]
    })
    cards: CardsDto[]

    @ApiProperty()
    createdAt: Date
}

export class AddColomnDto {

    @ApiProperty({
        example: "TestTitle"
    })
    @MaxLength(30)
    title: string

    @ApiProperty({
        example: "This big body eqweqweqweqweqweqwe"
    })
    @MaxLength(100)
    body: string


}

