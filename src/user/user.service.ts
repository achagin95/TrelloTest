import { Injectable, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { ColomnService } from 'src/colomn/colomn.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(
        private db: PrismaService,
        @Inject(forwardRef(() => ColomnService))
        private colomnServise: ColomnService
    ) {

    }

    findByEmail(email: string) {
        return this.db.users.findFirst({
            where: { email }
        })
    }

    findById(id: number) {
        return this.db.users.findFirstOrThrow({
            where: { id }
        })
    }

    findByUsername(userName: string) {
        return this.db.users.findFirst({
            where: { username: userName }
        })
    }

    create(
        username: string,
        email: string,
        hash: string,
        salt: string,
        full_name: string, //стоит не по порядку. Если сломается, исправить
        role: string) {
        return this.db.users.create({
            data: { username, email, hash, salt, full_name, role }
        })
    }

    async getAccessToCard(cardsId: number, userId: number, ownerId: number) {

        try {
            const card = await this.colomnServise.getCardById(cardsId)
            const colomn = await this.colomnServise.getColomnById(card.colomnsId)

            if (colomn.userId !== ownerId) {
                throw new BadRequestException({
                    message: "Access denied"
                })
            }
            return this.db.accessCards.create({
                data: {
                    cardsId: cardsId,
                    userId: userId,
                    ownerId: ownerId
                }
            })
        } catch (e) {
            throw new BadRequestException(
                e.message
            )
        }
    }
}
