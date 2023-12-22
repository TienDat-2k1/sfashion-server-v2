import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import { MongoErrorCodes } from '../constants/mongo-error-codes.constant';

@Catch(MongoError)
export class MongoDriverErrorFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log('MongoDriverErrorFilter');

    const status =
      exception.code && MongoErrorCodes[exception.code]
        ? MongoErrorCodes[exception.code]
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(HttpStatus.SERVICE_UNAVAILABLE).json({
      statusCode: status,
      message: HttpStatus[status],
      error: this.parseError(exception),
    });
  }

  parseError(error) {
    const status = MongoErrorCodes[error.code]
      ? MongoErrorCodes[error.code]
      : HttpStatus.SERVICE_UNAVAILABLE;

    return [
      {
        status: status,
        message: error.message,
        path: Object.keys(error.keyPattern).join(','),
        code: error.code,
      },
    ];
  }
}
