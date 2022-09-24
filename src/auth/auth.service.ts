import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  signin() {
    return { data: "i'm signed in" }
  }

  signup() {
    return { data: "i'm signed up" }
  }
}
