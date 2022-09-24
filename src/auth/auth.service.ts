import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) { }

  signin(dto: AuthDto) {
    return { data: "i'm signed in" }
  }

  signup() {
    return { data: "i'm signed up" }
  }
}
