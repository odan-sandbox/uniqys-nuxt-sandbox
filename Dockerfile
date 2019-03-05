FROM node:10 AS setup

WORKDIR /app

COPY package.json yarn.lock /app/
COPY frontend/package.json /app/frontend/
COPY backend/package.json /app/backend/

RUN yarn install

COPY ./ /app/

FROM node:10 AS deploy

WORKDIR /app
COPY --from=setup /app /app

RUN yarn workspace aws cdk:compile

FROM node:10 AS prod

WORKDIR /app
COPY --from=setup /app /app

RUN yarn build

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN mkdir .data
ENV DEBUG chain-core*,easy*,p2p*

CMD ["yarn", "uniqys", "start"]