const userTable = new sst.aws.Dynamo('UserTable', {
  fields: {
    userId: 'string',
  },
  primaryIndex: { hashKey: 'userId' },
})

export const userAddFn = new sst.aws.Function('UserAdd', {
  handler: 'src/user/add.main',
  link: [userTable],
})
