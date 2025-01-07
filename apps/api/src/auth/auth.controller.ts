import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import RequestWithUser from './interfaces/requestWithUser.interface';
import { LocalAuthGuard } from './localAuth.guard';
import JwtAuthenticationGuard from './jwt-auth.guard';
import JwtRefreshGuard from './jwt-refresh.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    console.log('login');
    const { user } = request;
    const { accessToken, accessExp } =
      await this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, refreshExp } =
      await this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
      },

      backendTokens: {
        accessToken,
        accessExp: accessExp,
        refreshToken,
        refreshExp: refreshExp,
      },
    };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    console.log('auth');
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Req() request: RequestWithUser) {
    console.log('refresh');
    const { user } = request;

    const { accessToken, accessExp } =
      await this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, refreshExp } =
      await this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    return {
      accessToken,
      accessExp: accessExp,
      refreshToken,
      refreshExp: refreshExp,
    };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    console.log('logout');
    await this.userService.removeRefreshToken(request.user.id);
    return true;
  }
}
