import {expect, test} from '@oclif/test'

describe('file/pull', () => {
  test
  .stdout()
  .command(['file/pull'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['file/pull', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
