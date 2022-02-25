import {expect, test} from '@oclif/test'

describe('file pull', () => {
  test
  .stdout()
  .command(['file pull'])
  .it('requires CID', ctx => {
    expect(ctx.stdout).to.throw('required')
  })

  test
  .stdout()
  .command(['file pull example_cid'])
  .it('runs with CID', ctx => {
    expect(ctx.stdout).to.contain('cid = example_cid')
  })
})
