FROM node:14.8.0-alpine as builder

ENV NODE_ENV=production

WORKDIR /app
COPY . /app

RUN set -x && \
    apk add \
    --no-cache --update \
    libtool automake autoconf nasm vips-dev fftw-dev gcc g++ make libpng-dev libc6-compat

RUN yarn install --frozen-lockfile

WORKDIR /app/packages/web

RUN yarn run build && \
    yarn cache clean

FROM node:14.8.0-alpine

WORKDIR /app/packages/web
COPY --from=builder /app /app

RUN set -x && \
    apk add \
    --no-cache --update \
    vips fftw libpng

ENV PORT 8080
EXPOSE 8080

CMD ["yarn", "run", "start", "-p", "8080"]
