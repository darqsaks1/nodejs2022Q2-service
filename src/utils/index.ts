export const HTTP_ANSWERS = {
    BAD_RESPONSE: {
        USER: {
            FIND: {
                message: 'User not found',
                error: 'Not Found'
            },
            UPDATE: {
                message: 'There are wrong password',
                error: 'Forbidden'
            }
        },
        TRACK: {
            FIND: {
                message: `Track  not found`,
                error: 'Not Found'
            },
        },
        ARTIST: {
            FIND: {
                message: 'Artist not found',
                error: 'Not Found'
            },

        },
        ALBUM: {
            FIND: {
                message: 'ALBUM not found',
                error: 'Not Found'
            },

        },
    }
}

export const HTTP_CODES = {
    NOT_FOUND: 404,
    FORBIDDEN: 403
}

export const NOT_EXIST = 'ID does not exist'