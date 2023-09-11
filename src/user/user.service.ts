import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUserService(data: CreateUserDTO) {
    const email = data.email;
    const emailExist = await this.userRepository.getUserByEmail(email);
    if (emailExist) {
      throw new NotAcceptableException(
        'Email already exist try again with different one',
      );
    }
    return this.userRepository.createUserRepo(data);
  }

  async updateUserService() {}

  async checkUserExistService(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }
}
