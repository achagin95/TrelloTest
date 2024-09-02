import { ApiProperty } from "@nestjs/swagger"

export class userInfoDto {

    @ApiProperty()
    username: string

    @ApiProperty()
    email: string

    @ApiProperty()
    full_name: string

    @ApiProperty()
    role: string

}

export class userAccessDto {

    @ApiProperty({
        example: 1
    })
    cardsId: number

    @ApiProperty(
        { example: 1 }
    )
    userId: number
    
}