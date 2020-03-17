FROM node:lts-alpine
WORKDIR /home/review

COPY . .

RUN yarn --frozen-lockfile
