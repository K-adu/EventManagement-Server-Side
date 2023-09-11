import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from 'src/shared/guard/auth.guard';
import { emailDto } from './dto/emaildto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/email')
  async getEmail(@Body() body) {
    try {
      console.log(body);
      const email = await this.userService.checkUserExistService(body.email);
      console.log('thisisbackend', email);
      return { exists: !!email };
    } catch (error) {
      console.error('Error while checking email:', error);
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getUserProfile(@Request() req, @Response() res) {
    console.log('this is printing', req.user);
    const currentUser = req.user;
    return res.json(currentUser);
  }
}
