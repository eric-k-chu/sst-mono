const router = new sst.aws.Router('Router')

const api1 = new sst.aws.ApiGatewayV2('ApiGateway1')

router.route('/', api1.url)

const authorizerFn = new sst.aws.Function('ApiGatewayAuthorizer', {
  handler: 'src/authorizer.main',
})

const authorizer = api1.addAuthorizer({
  name: `${$app.stage}-authorizer`,
  lambda: {
    function: authorizerFn.arn,
    response: 'simple',
    ttl: '10 minutes',
  },
})

export const POST = (url: `/${string}`, lambda: sst.aws.Function): void => {
  api1.route(`POST ${url}`, lambda.arn, {
    auth: { lambda: authorizer.id },
  })
}
