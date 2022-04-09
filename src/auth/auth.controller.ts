import { Body, Controller, HttpCode, HttpStatus, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Tokens } from "./types";
import { AuthDto } from "./dto";
import { AtGuard, RtGuard } from "./guard";
import { GetUser, Public } from "./decorator";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('signup')
    signup(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signup(dto);
    }

    @Public()
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signin(dto);
    }

    @Post('signout')
    @HttpCode(HttpStatus.OK)
    signout(@GetUser('id', ParseIntPipe) userId: number) {
        return this.authService.signout(userId);
    }

    @UseGuards(RtGuard)
    @Post('refresh')
    refresh(@GetUser('id') userId: number, @GetUser('refreshToken') refreshToken: string) {
        return this.authService.refresh(userId, refreshToken);
    }
}