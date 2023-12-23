import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log('HttpExceptionFilter');
    console.log(exception);

    let message;
    if (status === 500) {
      message = 'Internal server error';
    } else {
      message = 'An error occurred';
    }

    response.status(status).json({
      statusCode: status,
      type: exception.name,
      message: exception.message || message,
    });
  }
}
