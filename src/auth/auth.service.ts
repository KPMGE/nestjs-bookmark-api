import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) { }

  signin() {
    return { data: "i'm signed in" }
  }

  signup() {
    return { data: "i'm signed up" }
  }
}
