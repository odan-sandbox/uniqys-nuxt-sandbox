#!/bin/bash
set -eu

SERVICE=`aws ecs list-services --cluster uniqys-nuxt-sandbox-cluster --query "serviceArns[0]" --output text`

aws ecs update-service --cluster uniqys-nuxt-sandbox-cluster --service $SERVICE --force-new-deployment