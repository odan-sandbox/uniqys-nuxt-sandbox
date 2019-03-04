import * as cdk from "@aws-cdk/cdk"
import * as ecr from "@aws-cdk/aws-ecr"

export class ContainerRegistryStack extends cdk.Stack {
  public repositoryProps: ecr.RepositoryImportProps;
  constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
    super(parent, id, props);

    const repository = new ecr.Repository(this, "container-registry", {
      repositoryName: "uniqys-nuxt-sandbox"
    })

    this.repositoryProps = repository.export()
  }
}