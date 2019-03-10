FROM docker

WORKDIR /app

RUN apk add --update make bash git g++ python py-pip nodejs npm yarn
RUN pip install awscli docker-compose

COPY package.json yarn.lock /app/
COPY ./frontend/package.json /app/frontend/
COPY ./backend/package.json /app/backend/
COPY ./aws/package.json /app/aws/

RUN yarn install

COPY ./aws/ /app/aws/

RUN yarn workspace aws cdk:compile

ENV AWS_DEFAULT_REGION ap-northeast-1

ENTRYPOINT [ "bash", "-c" ]
CMD [ "bash" ]