import { BadRequestException, ConsoleLogger, Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ColomnService {

    constructor(
        private db: PrismaService,
        @Inject(forwardRef(()=> UserService))
        private userService: UserService) { }

    //Colomns
    async getColomnUserById(id: number) {
        try {
            return this.db.colomns.findMany({
                where: {
                    userId: id
                }
            })
        } catch {
            throw new BadRequestException(
                { message: 'Not Found' }
            )
        }
    }

    async getColomnById(id: number) {
        try {
            return this.db.colomns.findFirstOrThrow({
                where: {
                    id: id
                }
            })
        } catch {
            throw new BadRequestException(
                { message: 'Not Found Colomn' }
            )
        }
    }

    createColomn(title: string, body: string, userId: number) {
        try {
            return this.db.colomns.create({
                data: {
                    title, body, userId
                }
            })
        } catch {
            throw new BadRequestException(
                { message: 'Not created' }
            )
        }

    }

    async deleteColomnById(id: number, userId: number) {
        try {

            const colomn = await this.getColomnById(id)
            const cards = await this.db.cards.findMany({
                where: {
                    colomnsId: id
                }
            })

            if (!colomn || colomn.userId !== userId) {
                throw new BadRequestException()
            }

            if (cards && cards.length > 0) {
                cards.map((item) => {
                    this.deleteCard(id, item.id, userId);
                })
            }

            return this.db.colomns.delete({
                where: {
                    id: id
                }
            })
        } catch {
            throw new BadRequestException()
        }
    }


    //Cards
    async getCardById(id: number) {
        try {
            return this.db.cards.findFirstOrThrow({
                where: {
                    id: id
                }
            })
        } catch {
            throw new BadRequestException({
                message: 'Card not found'
            })
        }
    }

    async getCardByIdCheck(id: number, userId: number) {
        try {
            const card = await this.getCardById(id)
            const colomn = await this.getColomnById(card.colomnsId)

            if (colomn.userId !== userId) {
                const access = await this.db.accessCards.findFirstOrThrow({
                    where: {
                        cardsId: id,
                        userId: userId
                    }
                })
                if (access.userId !== userId) {
                    throw new BadRequestException({
                        message: "Access denied"
                    })
                }
            }

            return card

        } catch (e) {
            throw new BadRequestException (
                e.message
            ) 
        }
    }

    async getCardsByColomnId(colomnId: number, userId: number) {

        try {
            const colomn = await this.getColomnById(colomnId)
            
            if (colomn.userId !== userId) {
                throw new BadRequestException({
                    message: "Access denied"
                })
            }

            const cards = await this.db.cards.findMany({
                where: {
                    colomnsId: colomnId
                }
            })

            return cards
        } catch { throw new BadRequestException }
    }

    async createCard(title: string, body: string, colomnsId: number, userId: number) {
        try {

            const colomns = await this.getColomnUserById(userId)
            if (!colomns || colomns.length == 0) {
                throw new BadRequestException({
                    message: "Colomns not exist"
                })
            }
            const filter = colomns.filter((thisItem) => thisItem.id === colomnsId)
            if (!filter || filter.length == 0) {
                throw new BadRequestException({
                    message: "Access denied"
                })
            }

            return this.db.cards.create({
                data: { title, body, colomnsId }
            })

        } catch (e) {
            throw new BadRequestException(
                e.message
            )
        }
    }

    async updateCard(id: number, body: string, userId: number) {

        try {
            const card = await this.getCardById(id)
            const colomn = await this.getColomnById(card.colomnsId)

            // if (userId !== colomn.userId) {
            //     throw new BadRequestException({
            //         message: 'Access denied'
            //     })
            // }

            if (colomn.userId !== userId) {
                const access = await this.db.accessCards.findFirstOrThrow({
                    where: {
                        cardsId: id,
                        userId: userId
                    }
                })
                if (access.userId !== userId) {
                    throw new BadRequestException({
                        message: "Access denied"
                    })
                }
            }

            return this.db.cards.update({
                data: {
                    body: body
                },
                where: { id: id }
            })

        } catch (e) {
            throw new BadRequestException(
                e.message
            )
        }
    }

    async deleteCard(colomnId: number, id: number, userId: number) {
        try {
            const colomn = await this.getColomnById(colomnId)
            const card = await this.getCardById(id)

            if (card.colomnsId !== colomnId) {
                throw new BadRequestException({
                    message: 'не-не-не'
                })
            }
            if (colomn.userId !== userId) {
                throw new BadRequestException({
                    message: 'a-a-aaa'
                })
            }

            await this.db.comments.deleteMany({
                where: {cardsId: id}
            })
            return this.db.cards.delete({
                where: {
                    id: id
                }
            })

        } catch (e) {
            throw new BadRequestException(
                e.message
            )
        }
    }


    //Comments
    async getCommetsByCardId(cardId: number, userId: number) {
        try {

            const card = await this.getCardById(cardId)
            const colomn = await this.getColomnById(card.colomnsId)

            const comments = await this.db.comments.findMany({
                where: {
                    cardsId: cardId
                }
            })

            // if (userId !== colomn.userId) {
            //     throw new BadRequestException({
            //         message: 'Access denied'
            //     })
            // }
            if (colomn.userId !== userId) {
                const access = await this.db.accessCards.findFirstOrThrow({
                    where: {
                        cardsId: cardId,
                        userId: userId
                    }
                })
                if (access.userId !== userId) {
                    throw new BadRequestException({
                        message: "Access denied"
                    })
                }
            }
            
            return this.db.comments.findMany({
                where: {
                    cardsId: cardId
                }
            })

        } catch (e) {
            throw new BadRequestException(
                e.message
            )
        }
    }

    async createCommetsByCardId(cardsId: number,title: string, body: string, userId: number) {
        try {
            const card = await this.getCardById(cardsId)
            const user = await this.userService.findById(userId)
            const colomn = await this.getColomnById(card.colomnsId)

            if (colomn.userId !== userId) {
                const access = await this.db.accessCards.findFirstOrThrow({
                    where: {
                        cardsId: cardsId,
                        userId: userId
                    }
                })
                if (access.userId !== userId) {
                    throw new BadRequestException({
                        message: "Access denied"
                    })
                }
            }

            return this.db.comments.create({
                data: {
                    title: title,
                    body: body,
                    cardsId: cardsId,
                    userId: userId,
                    userName: user.full_name
                }
            })

        } catch (e) {
            throw new BadRequestException(
                e.message
            )
        }
    }

    async deleteComment(cardsId: number, id: number, userId: number) {
        
        const card = await this.getCardById(cardsId)
        const user = await this.userService.findById(userId)
        const colomn = await this.getColomnById(card.colomnsId)
        const comment = await this.db.comments.findFirstOrThrow({
            where: { id: id}
        })

        if (colomn.userId !== userId) {
            const access = await this.db.accessCards.findFirstOrThrow({
                where: {
                    cardsId: id,
                    userId: userId
                }
            })
            if (access.userId !== userId || comment.userId !== userId) {
                throw new BadRequestException({
                    message: "Access denied"
                })
            }
        }

        return this.db.comments.delete({
            where: {id: id}
        })
    }

}
