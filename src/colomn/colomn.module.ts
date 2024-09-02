import { Module, forwardRef } from '@nestjs/common';
import { ColomnService } from './colomn.service';
import { ColomnController } from './colomn.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AddCardsDto, AddColomnDto } from './dto';

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule) ],
  providers: [ColomnService, GetSessionInfoDto, AddCardsDto, AddColomnDto],
  exports: [ColomnService],
  controllers: [ColomnController]

})
export class ColomnModule {}
