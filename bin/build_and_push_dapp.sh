#/bin/bash

set -eu

docker-compose build dapp

REPOSITORY_URI=`aws ecr describe-repositories --repository-names uniqys-nuxt-sandbox --query "repositories[0].repositoryUri" --output text`

docker tag uniqys-nuxt-sandbox:dapp $REPOSITORY_URI

`aws ecr get-login --no-include-email`

docker push $REPOSITORY_URI