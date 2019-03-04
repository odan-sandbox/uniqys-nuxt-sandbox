# uniqys-nuxt-sandbox

## start
```bash
$ yarn
$ yarn build
$ yarn uniqys start
```

## deploy on aws
```bash
$ yarn workspace aws cdk deploy ContainerRegistryStack
$ export REPOSITORY_URI=`aws ecr describe-repositories --repository-names uniqys-nuxt-sandbox | jq -r '.repositories[0].repositoryUri'`
$ docker build . -t $REPOSITORY_URI
$ `aws ecr get-login --no-include-email`
$ docker push $REPOSITORY_URI
```