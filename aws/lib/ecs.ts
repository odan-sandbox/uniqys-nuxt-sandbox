import * as cdk from'@aws-cdk/cdk';
import * as ec2 from'@aws-cdk/aws-ec2';
import * as ecs from'@aws-cdk/aws-ecs';
import * as ecr from'@aws-cdk/aws-ecr';

export class ContainerEnvStack extends cdk.Stack {
  constructor(parent: cdk.App, id: string, repositoryImportProps: ecr.RepositoryImportProps, props?: cdk.StackProps) {
    super(parent, id, props);

    const vpc = new ec2.VpcNetwork(this, 'Vpc', {
      maxAZs: 2
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
      clusterName: "uniqys-nuxt-sandbox-cluster",
      vpc: vpc
    });

    new ecs.LoadBalancedFargateService(this, 'DAppService', {
      containerPort: 8080,
      desiredCount: 1,
      cluster: cluster,  // Required
      image: ecs.ContainerImage.fromEcrRepository(ecr.Repository.import(this, "poyo", repositoryImportProps)),
      publicLoadBalancer: true  // Default is false
    });
  }
}