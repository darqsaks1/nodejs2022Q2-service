import * as bcrypt from 'bcrypt';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { ANSWERS, FIRST_ITEM, HASH_LEVEL, UUID_VERSION } from '../src/ts/answers';
import { HttpException } from '@nestjs/common';
import * as fs from 'fs';
import { HTTPRESP, Logs } from '../src/ts/sharedTypes';
import e from 'express';

export const getRes = (favorites) => {
  return {
    artists:
      favorites.length && favorites[FIRST_ITEM].artists
        ? favorites[FIRST_ITEM].artists
        : [],
    albums:
      favorites.length && favorites[FIRST_ITEM].albums
        ? favorites[FIRST_ITEM].albums
        : [],
    tracks:
      favorites.length && favorites[FIRST_ITEM].tracks
        ? favorites[FIRST_ITEM].tracks
        : [],
  };
};

export const comparePassword = async (
  password,
  oldPassword,
): Promise<boolean> => {
  return await bcrypt.compare(password, oldPassword);
};


export const getLogger = (
  errorResponse: HTTPRESP,
  request: e.Request,
  exception: unknown,
): string => {
  const { method, url }: { method: string; url: string } = request;

  return `Response Code: ${errorResponse.statusCode
    } - Method: ${method} - URL: ${url} - TimeStamp: ${errorResponse.timeStamp}\n
    ${exception instanceof HttpException ? exception.stack : errorResponse.error
    }\n`;
};

export const writeLog = (errorLog: string): void => {
  const fold: string = process.env.LOGS_FOLDER;
  const size = Number(process.env.LOG_FILE_SIZE);

  fs.readdir(fold, (err: NodeJS.ErrnoException, files: string[]) => {
    if (err) {
      const fullPath: string = createNewLogsPath(fold);
      createFolder(fold);
      writeLogInFile(fullPath, errorLog);
    }
    (files || []).forEach((file: string) => {
      const fileSize: number = logSize(`${fold}/${file}`);

      if (fileSize < size) {
        writeLogInFile(`${fold}/${file}`, errorLog);
      } else {
        const fullPath: string = createNewLogsPath(fold);
        writeLogInFile(fullPath, errorLog);
      }
    });
  });
};

export const createNewLogsPath = (fold: string): string => {
  const logFileName: number = new Date().valueOf();
  return `${fold}/${logFileName}.log`;
};

export const writeLogInFile = (logName: string, errorLog: string) => {
  fs.appendFile(logName, errorLog, 'utf8', (err: NodeJS.ErrnoException) => {
    if (err) throw err;
  });
};

export const valitadeId = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === UUID_VERSION;
};

export const getHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, HASH_LEVEL);
};

export const createFolder = (fold: string): void => {
  fs.mkdir(fold, { recursive: true }, (err: NodeJS.ErrnoException) => {
    if (err) throw err;
  });
};

export const logSize = (fileName: string): number => {
  try {
    const stats: fs.Stats = fs.statSync(fileName);
    return stats.size;
  } catch (e) {
    console.log(ANSWERS.LOG_FILE.ERROR);
  }
};

export const addLogger = (): string[] => {
  const logVariables = [];
  const logs = Array(Number(process.env.NEST_LOGER_LEVEL)).fill('_');

  logs.forEach((_, index: number): void => {
    logVariables.push(Logs[index]);
  });

  return logVariables;
};

export const waitingExp = (): void => {
  process
    .on('unhandledRejection', () => {
      process.stdout.write('Unhandled Rejection at Promise');
    })
    .on('uncaughtException', () => {
      process.stdout.write('Uncaught Exception thrown');
      process.exit(1);
    });
};
