import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(): Promise<void> {
    throw new HttpException(
      {
        statusCode: 429,
        message:
          'Вы превысили лимит запросов. Попробуйте снова через 30 секунд.',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
