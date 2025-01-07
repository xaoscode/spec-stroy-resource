import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import UserRepository from './repository/user.repository';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}
}
