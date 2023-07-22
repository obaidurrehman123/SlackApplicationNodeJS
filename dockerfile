FROM node:18.16.0-alpine

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app
COPY package*.json .
RUN pnpm install
COPY . .
EXPOSE 6090
CMD [ "pnpm","run","dev" ]