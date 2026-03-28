import jwt from "jsonwebtoken";
import type { SessionClaims } from "../shared/types.js";

export interface ITokenService {
  sign(claims: SessionClaims): string;
  verify(token: string): SessionClaims | null;
}

export class JwtTokenService implements ITokenService {
  constructor(private readonly secret: string) {}

  sign(claims: SessionClaims): string {
    return jwt.sign(claims, this.secret, { expiresIn: "7d" });
  }

  verify(token: string): SessionClaims | null {
    try {
      const payload = jwt.verify(token, this.secret) as SessionClaims;
      return { sub: payload.sub, email: payload.email };
    } catch {
      return null;
    }
  }
}
