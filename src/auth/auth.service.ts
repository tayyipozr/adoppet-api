import { ForbiddenException, Injectable } from "@nestjs/common";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { Tokens } from "./types";


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService) { }

  async signup(dto: AuthDto): Promise<Tokens> {
    try {
      const hash = await argon.hash(dto.password);

      const user = await this.prisma.user.create({ data: { email: dto.email, hash } });

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);
      return tokens;

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw error;
    }

  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user)
      throw new ForbiddenException('User not found');


    const valid = await argon.verify(user.hash, dto.password);

    if (!valid)
      throw new ForbiddenException('Invalid password');


    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async signout(userId: number) {
    await this.prisma.user.updateMany({
      where: { id: userId, hashedRt: { not: null } },
      data: { hashedRt: null },
    });
  }

  async refresh(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      throw new ForbiddenException('User not found');

    const valid = await argon.verify(rt, user.hashedRt);

    if (!valid)
      throw new ForbiddenException('Invalid password');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };
    const secretAt = this.config.get('JWT_AT_SECRET');
    const secretRt = this.config.get('JWT_RT_SECRET');

    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: '50m', algorithm: 'HS256', secret: secretAt }),
      this.jwt.signAsync(payload, { expiresIn: '1w', algorithm: 'HS256', secret: secretRt }),
    ]);


    return { access_token: at, refresh_token: rt };
  }

  async updateRtHash(userId: number, rt: string) {
    const hashedRt = await argon.hash(rt);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRt },
    });
  }
}