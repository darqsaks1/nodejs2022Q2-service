# Base image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

COPY . .

EXPOSE ${POSTGRES_PORT}

CMD [ "npm", "run", "start:prod" ]
