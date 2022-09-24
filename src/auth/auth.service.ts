import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import { hash } from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) { }

  async signin(dto: AuthDto) {
    const passwordHash = await hash(dto.password)
    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        passwordHash
      }
    })

    delete user.passwordHash

    return user
  }

  signup() {
    return { data: "i'm signed up" }
  }
}
