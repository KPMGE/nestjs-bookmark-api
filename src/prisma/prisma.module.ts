import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// everything that is in the exports array will be available throughout the 
// whole application without needing for import
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }
