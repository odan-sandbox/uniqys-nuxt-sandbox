# uniqys-nuxt-sandbox
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


## Start on local
```bash
$ yarn
$ yarn build
$ yarn start
```

## Development
```bash
$ yarn workspace backend uniqys start ../uniqys.dev.json
```

## Deploy on aws

### Prepare
```bash
$ export AWS_DEFAULT_REGION=ap-northeast-1
$ yarn workspace aws cdk:compile
```

### Setup Codebuild
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
$ ./bin/deploy.sh
```
