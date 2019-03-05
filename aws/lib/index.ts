import * as cdk from'@aws-cdk/cdk';

import { ContainerEnvStack } from "./ecs"
import { ContainerRegistryStack } from "./ecr"
import { DeployStack } from "./codebuild"


const app = new cdk.App()

const containerRegistryStack = new ContainerRegistryStack(app, "ContainerRegistryStack")

new ContainerEnvStack(app, "ContainerEnvStack", containerRegistryStack.repositoryProps)

new DeployStack(app, "DeployStack")

app.run();