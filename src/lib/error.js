const logger = require('@oclif/core/lib/cli-ux/index').logger

module.exports = (error) => {
  const oclifHandler = require('@oclif/errors/handle')
  // do any extra work with error
  logger.error(error)
  return oclifHandler(error)
}
