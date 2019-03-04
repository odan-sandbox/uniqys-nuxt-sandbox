import * as cdk from'@aws-cdk/cdk';

import { ContainerEnvStack } from "./ecs"
import { ContainerRegistryStack } from "./ecr"


const app = new cdk.App()

const containerRegistryStack = new ContainerRegistryStack(app, "ContainerRegistryStack")

new ContainerEnvStack(app, "ContainerEnvStack", containerRegistryStack.repositoryProps)

app.run();