import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { hash } from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) { }

  async signin(dto: AuthDto) {
    const passwordHash = await hash(dto.password)
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          passwordHash
        }
      })

      delete user.passwordHash

      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials already taken')
        }
      }
      throw error
    }
  }

  signup() {
    return { data: "i'm signed up" }
  }
}
