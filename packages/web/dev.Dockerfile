FROM node:14.8.0-alpine as builder

ENV NODE_ENV=production

WORKDIR /app
COPY . /app

RUN set -x && \
    apk add \
    --no-cache --update \
    libtool automake autoconf nasm vips-dev fftw-dev gcc g++ make libpng-dev libc6-compat

RUN yarn install --frozen-lockfile
