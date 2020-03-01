# Build image

FROM node:lts-alpine as buildImage
WORKDIR /home/review

COPY yarn.lock package.json ./
COPY events/package.json ./events/
COPY github-fetch/package.json ./github-fetch/

RUN yarn --frozen-lockfile

COPY . .
RUN cd events && yarn build

# Run image

FROM node:lts-alpine

WORKDIR /home/review

COPY yarn.lock package.json ./
COPY events/package.json ./events/

RUN yarn --production --frozen-lockfile

COPY --from=buildImage /home/review/events/build ./events/build

CMD cd events && yarn start
