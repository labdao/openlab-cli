import {expect, test} from '@oclif/test'

describe('file list', () => {
  test
  .stdout()
  .command(['file list'])
  .it('runs', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })
})
