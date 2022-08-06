import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ANSWERS } from '../../src/ts/answers';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { getLogger, writeLog } from '../../helpers';
import { HTTPRESP } from '../../src/ts/sharedTypes';

@Catch()
export class LoggerFiler implements ExceptionFilter {

  private errors = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ) => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });

  private logs = (
    errorResponse: HTTPRESP,
    request: Request,
    exception: unknown,
  ): string => {
    return getLogger(errorResponse, request, exception);
  };
  private readonly logger: Logger = new Logger(LoggerFiler.name);
  private writeErrorLogToFile = (errorLog: string): void => {
    writeLog(errorLog);
  };
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse: any = exception.getResponse();
      errorMessage = errorResponse.error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = ANSWERS.INTERNAL_SERVER_ERROR.ERROR;
    }

    const errorResponse = this.errors(status, errorMessage, request);
    const errorLog = this.logs(errorResponse, request, exception);
    this.logger.error(errorLog);
    this.writeErrorLogToFile(errorLog);
    response.status(status).json(errorResponse);
  }



}
