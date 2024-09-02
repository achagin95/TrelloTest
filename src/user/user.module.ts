import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';
import { GetSessionInfoDto } from 'src/auth/dto';
import { ColomnModule } from 'src/colomn/colomn.module';

@Module({
  imports: [PrismaModule, forwardRef(() => ColomnModule)],
  providers: [UserService, GetSessionInfoDto],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
