import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signinService(body: CreateUserDTO) {
    return this.userService.createUserService(body);
  }

  async loginService(body: LoginUserDto) {
    const user = await this.userService.checkUserExistService(body.email);
    if (!user) {
      throw new NotFoundException('The user with the email doesnot exist');
    }
    if (user.password === body.password) {
      const payload = {
        id: user._id,
        email: user.email,
      };

      return await this.jwtService.signAsync(payload);
    }
    return 'password mismatch';
  }
}
