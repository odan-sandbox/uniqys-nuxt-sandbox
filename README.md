# uniqys-nuxt-sandbox

## Start on local
```bash
$ yarn
$ yarn build
$ yarn uniqys start
```

## Deploy on aws

### Prepare
```bash
$ export AWS_DEFAULT_REGION=ap-northeast-1
$ yarn workspace aws cdk:compile
```

### Push to ECR
```bash
$ yarn workspace aws cdk deploy ContainerRegistryStack
$ export REPOSITORY_URI=`aws ecr describe-repositories --repository-names uniqys-nuxt-sandbox --query "repositories[0].repositoryUri" --output text`
$ docker build . -t $REPOSITORY_URI
$ `aws ecr get-login --no-include-email`
$ docker push $REPOSITORY_URI
```


### Deploy to ECS
```bash
$ yarn workspace aws cdk deploy ContainerEnvStack
$ export SERVICE=`aws ecs list-services --cluster uniqys-nuxt-sandbox-cluster --query "serviceArns[0]" --output text`
$ aws ecs update-service --cluster uniqys-nuxt-sandbox-cluster --service $SERVICE --force-new-deployment
```