FROM docker

WORKDIR /app

RUN apk add --update make bash git g++ python py-pip nodejs npm yarn
RUN pip install awscli

COPY ./ /app/

RUN yarn install

RUN yarn workspace aws cdk:compile

ENV AWS_DEFAULT_REGION ap-northeast-1

ENTRYPOINT [ "bash", "-c" ]
CMD [ "bash" ]