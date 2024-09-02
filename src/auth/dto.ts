import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator"

export class SignUpBodyDto {

    @ApiProperty({
        example: "TestUser"
    })
    @IsNotEmpty()
    username: string

    @ApiProperty({
        example: "test@mail.ru"
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: "Test User Testovich"
    })
    full_name: string

    @ApiProperty({
        example: "123456"
    })
    @IsNotEmpty()
    password: string

    @ApiProperty({
        example: "USER"
    })
    role: string
}

export class SignIpBodyEmailDto {

    @ApiProperty({
        example: "test@mail.ru"
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: "123456"
    })
    @IsNotEmpty()
    password: string

}

export class GetSessionInfoDto {
    @ApiProperty()
    id: number

    @ApiProperty()
    email: string

    @ApiProperty()
    role: string //?

    @ApiProperty()
    iat: number //названия в кавычках и без вроде работают одинаково

    @ApiProperty()
    exp: number
}