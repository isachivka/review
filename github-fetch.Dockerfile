# Build image

FROM node:lts-alpine as buildImage
WORKDIR /home/review

COPY yarn.lock package.json ./
COPY github-fetch/package.json ./github-fetch/

RUN yarn --frozen-lockfile

COPY . .
RUN cd github-fetch && yarn build

# Run image

FROM node:lts-alpine

WORKDIR /home/review

COPY yarn.lock package.json ./
COPY github-fetch/package.json ./github-fetch/

RUN yarn --production --frozen-lockfile

COPY --from=buildImage /home/review/github-fetch/build ./github-fetch/build
COPY --from=buildImage /home/review/github-fetch/config ./github-fetch/config


CMD cd github-fetch && yarn start
