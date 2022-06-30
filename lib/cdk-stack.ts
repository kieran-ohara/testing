import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda'

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const lambdaFn = new lambda.DockerImageFunction(this, 'AssetFunction', {
      code: lambda.DockerImageCode.fromImageAsset('.'),
      architecture: lambda.Architecture.ARM_64,
    });
    lambdaFn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });
  }
}
