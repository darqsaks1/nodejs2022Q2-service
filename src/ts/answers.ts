export const PASSWORD_LENGTH = 4;
export const FIRST_VERSION = 1;
export const UUID_VERSION = 4;
export const HASH_LEVEL = 3;
export const FIRST_ITEM = 0;

export const ANSWERS = {
  BAD_REQUEST: {
    BAD_UUID: 'ID is invalid (not uuid)',
    NOT_FOUND: 'with this ID does not exist',
  },
  FORBIDDEN: {
    BAD_PASSWORD: 'old password is wrong',
  },
  UNPROCESSABLE_ENTITY: {
    NOT_FOUND: 'can not record because it does not exist',
    UNIQUE: 'must be a unique value',
  },
  AUTHORIZATION: {
    NOT_TOKEN: 'No Token provided!',
    INVALID: 'Token is invalid!',
  },
  INTERNAL_SERVER_ERROR: {
    ERROR: 'Critical internal server error occurred!',
  },
  LOG_FILE: {
    ERROR: 'File not found',
  },
};
