import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, AuthTokenDto } from "./dto";
import { hash } from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { verify } from 'argon2'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwt: JwtService, private config: ConfigService) { }

  async signin(dto: AuthDto): Promise<AuthTokenDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if (!user) throw new ForbiddenException('wrong credentials')

    const passwordsMatch = await verify(user.passwordHash, dto.password)
    if (!passwordsMatch) throw new ForbiddenException('wrong credentials')

    const token = await this.signToken(user.id, user.email)

    return {
      access_token: token
    }
  }

  async signup(dto: AuthDto) {
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

  signToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email }

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET')
    })
  }
}
