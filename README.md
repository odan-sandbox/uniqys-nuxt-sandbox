# uniqys-nuxt-sandbox

## start
```bash
$ yarn
$ yarn build
$ yarn uniqys start
```

## deploy on aws
```bash
$ yarn workspace aws cdk:compile
$ export AWS_DEFAULT_REGION=ap-northeast-1
$ yarn workspace aws cdk deploy ContainerRegistryStack
$ export REPOSITORY_URI=`aws ecr describe-repositories --repository-names uniqys-nuxt-sandbox | jq -r '.repositories[0].repositoryUri'`
$ docker build . -t $REPOSITORY_URI
$ `aws ecr get-login --no-include-email`
$ docker push $REPOSITORY_URI
$ export SERVICE=`aws ecs list-services --cluster uniqys-nuxt-sandbox-cluster --query "serviceArns[0]" --output text`
$ aws ecs update-service --cluster uniqys-nuxt-sandbox-cluster --service $SERVICE --force-new-deployment
```