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

### 
```bash
$ yarn workspace aws cdk deploy DeployStack
$ git archive `git stash create` --output=source.zip
$ aws s3 cp source.zip s3://uniqys-nuxt-sandbox-code-bucket/
```

### Push to ECR
```bash
$ yarn workspace aws cdk deploy ContainerRegistryStack
$ ./bin/build_and_push_dapp.sh
```


### Deploy to ECS
```bash
$ yarn workspace aws cdk deploy ContainerEnvStack
$ export SERVICE=`aws ecs list-services --cluster uniqys-nuxt-sandbox-cluster --query "serviceArns[0]" --output text`
$ aws ecs update-service --cluster uniqys-nuxt-sandbox-cluster --service $SERVICE --force-new-deployment
```