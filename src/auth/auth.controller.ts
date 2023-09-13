import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  siginController(@Body() body: CreateUserDTO) {
    console.log(body);
    return this.authService.signinService(body);
  }

  @Post('/login')
  async loginController(@Body() body: LoginUserDto, @Res() res) {
    const access_token = await this.authService.loginService(body);
    res
      .cookie('access_token', access_token, {
        //httpOnly: true,
        //secure: false,
      })
      .send({ status: 'ok' });
  }
  //@UseGuards(AuthGuard)
  // @Post('/logout')
  // async logOut(@Res({ passthrough: true }) res) {
  //   console.log('logout');
  //   console.log(res);
  //   try {
  //     res

  //       .cookie('access_token', '', {
  //         // httpOnly: false,
  //         secure: false,
  //         expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'), // Set expiration to the past
  //       })
  //       .send({ status: 'ok' });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  @Get('/logout')
  async logOut(@Res({ passthrough: true }) res) {
    console.log('logout');
    try {
      res.clearCookie('access_token', { httpOnly: false, secure: false }); // Clear the 'access_token' cookie
      res.send({ status: 'ok' });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: 'Internal Server Error' }); // Handle errors gracefully
    }
  }
}
