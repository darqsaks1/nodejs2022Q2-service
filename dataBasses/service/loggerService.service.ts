import { LoggerService } from '@nestjs/common';

export class FullyLogger implements LoggerService {
  private _arg;
  constructor(arg: string[]) {
    this._arg = arg;}
    log(message: string, ...optionalParams: any[]) {
    if (this._arg.includes('log')) { console.log('\x1b[32m', message, optionalParams); }}
     error(message: string, ...optionalParams: any[]): any { if (this._arg.includes('error')) { console.log('\x1b[31m', message, optionalParams);} }
 warn(message: string, ...optionalParams: any[]): any {
    if (this._arg.includes('warn')) {
      console.log('\x1b[33m', message, optionalParams);
    }
  } 
  debug(message: string, ...optionalParams: any[]) {
    if (this._arg.includes('debug')) {
      console.log('\x1b[36m', message, optionalParams);
    }
  }
   verbose(message: string, ...optionalParams: any[]) {
    if (this._arg.includes('verbose')) {
      console.log('\x1b[35m', message, optionalParams);
    }
  }
}
