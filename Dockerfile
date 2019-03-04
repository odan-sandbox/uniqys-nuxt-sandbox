FROM node:10.13.0 AS builder

WORKDIR /app

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

COPY package.json yarn.lock /app/
COPY frontend/package.json /app/frontend/
COPY backend/package.json /app/backend/

RUN yarn install

RUN yarn build

COPY ./ /app/

RUN mkdir .data
ENV DEBUG chain-core*,easy*,p2p*

CMD ["yarn", "uniqys", "start"]