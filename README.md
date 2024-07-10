# rms-api-privacidade
Microsserviço de Privacidade do Sistema de Gestão de Restaurantes (RMS) desenvolvido pelo grupo *"BOPE"* G03 da turma 4SOAT para o Tech Challenge da [Pós Tech em Software Architecture da FIAP](https://postech.fiap.com.br/curso/software-architecture/).

[![SAM Validate and Build](https://github.com/Grupo-G03-4SOAT-FIAP/rms-api-privacidade/actions/workflows/sam-validate.yml/badge.svg)](https://github.com/Grupo-G03-4SOAT-FIAP/rms-api-privacidade/actions/workflows/sam-validate.yml)
[![SAM Deploy](https://github.com/Grupo-G03-4SOAT-FIAP/rms-api-privacidade/actions/workflows/sam-deploy.yml/badge.svg)](https://github.com/Grupo-G03-4SOAT-FIAP/rms-api-privacidade/actions/workflows/sam-deploy.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)

![AWS LAMBDA](https://img.shields.io/badge/AWS%20Lambda-FF9900.svg?style=for-the-badge&logo=AWS-Lambda&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![infra-privacidade](https://github.com/Grupo-G03-4SOAT-FIAP/rms-api-privacidade/assets/63567959/c003d1fe-fe0c-4365-838a-7e1e23f5a6d4)

## Relatório de Impacto à Proteção de Dados Pessoais (RIPD)🔒

O Relatório de Impacto à Proteção de Dados Pessoais (RIPD) está disponível na pasta `/docs/RIPD`\
[Clique aqui para acessar](https://github.com/Grupo-G03-4SOAT-FIAP/rms-api-privacidade/tree/main/docs/RPID)↗️

## Pré-requisitos

Você deve ter instalado a [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html), o [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html#install-sam-cli-instructions) e possuir uma conta na AWS.

## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

* SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Install Node.js 20](https://nodejs.org/en/), including the NPM package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
rms-api-privacidade$ sam build
```

The SAM CLI installs dependencies defined in `hello-world/package.json`, compiles TypeScript with esbuild, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
rms-api-privacidade$ sam local invoke HelloWorldFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
rms-api-privacidade$ sam local start-api
rms-api-privacidade$ curl http://localhost:3000/
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

## Add a resource to your application
The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
rms-api-privacidade$ sam logs -n HelloWorldFunction --stack-name rms-api-privacidade --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `hello-world/tests` folder in this project. Use NPM to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
rms-api-privacidade$ cd hello-world
hello-world$ npm install
hello-world$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name rms-api-privacidade
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)

## Métricas de código

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Grupo-G03-4SOAT-FIAP_rms-api-privacidade&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)

## Projetos relacionados

API de Pedidos\
https://github.com/Grupo-G03-4SOAT-FIAP/rms-api-pedidos

## Requisitos

*aws-cli/2.15.10, AWS SAM CLI version 1.110.0 e Node.js 20.x*

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=Grupo-G03-4SOAT-FIAP_rms-api-privacidade)
