import { HttpStatus } from '@nestjs/common';

export type HTTPRESP = {
  statusCode: HttpStatus;
  path: string;
  method: string;
  error: string;
  timeStamp: Date;
};

export enum Logs {
  log = 2,
  warn = 3,
  error = 4,
  debug = 0,
  verbose = 1,
  
}
