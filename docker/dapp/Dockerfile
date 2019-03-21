FROM node:10

WORKDIR /app

COPY package.json yarn.lock /app/
COPY frontend/package.json /app/frontend/
COPY backend/package.json /app/backend/
COPY aws/package.json /app/aws/

RUN yarn install

COPY ./ /app/

RUN yarn build

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN mkdir .data
ENV DEBUG chain-core*,easy*,p2p*

EXPOSE 8080

CMD ["yarn", "start"]