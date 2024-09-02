import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private passwordService: PasswordService,
        private jwtService: JwtService) { }

    async signUp(
        username: string,
        email: string,
        full_name: string,
        password: string,
        role: string) {

        const user = await this.userService.findByEmail(email)
        const user2 = await this.userService.findByUsername(username)

        if (user || user2) {
            throw new BadRequestException({ type: "User Exist" })
            //тайп вместо мессаджа просто чтоб потестить, так было в туториале
        }

        if (!role || role.length==0) {
            role = "USER"
        }

        const salt = this.passwordService.getSalt()
        const hash = this.passwordService.getHash(password, salt)

        const newUser = await this.userService.create(username, email, hash, salt, full_name, role)

        const accesToken = await this.jwtService.signAsync({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        })

        return {accesToken}
    }

    async signIn(email: string, password: string) {

        const user = await this.userService.findByEmail(email)

        if (!user) {
            throw new UnauthorizedException()
        }

        const hash = this.passwordService.getHash(password, user.salt)

        if (hash !== user.hash) {
            throw new UnauthorizedException()
        }

        const accesToken = await this.jwtService.signAsync({
            id: user.id,
            email: user.email,
            role: user.role
        })

        return {accesToken}
     }


}
