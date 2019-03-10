import * as cdk from "@aws-cdk/cdk";
import * as codebuild from "@aws-cdk/aws-codebuild";
import * as s3 from "@aws-cdk/aws-s3";

export class DeployStack extends cdk.Stack {
  constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
    super(parent, id, props);

    const bucket = new s3.Bucket(this, "uniqys-nuxt-sandbox-source-bucket", {
      bucketName: "uniqys-nuxt-sandbox-source-bucket"
    });
    new codebuild.Project(this, "uniqys-nuxt-sandbox-builder", {
      projectName: "uniqys-nuxt-sandbox-builder",
      source: new codebuild.S3BucketSource({
        bucket: bucket,
        path: "source.zip"
      }),
      environment: {
        buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_DOCKER_17_09_0,
        privileged: true
      },
      // XXX: can't use LOCAL_DOCKER_LAYER_CACHE ;)
    });
  }
}
