const logger = require('./log')

module.exports = (error) => {
  const oclifHandler = require('@oclif/errors/handle')
  // do any extra work with error
  logger.error(error)
  return oclifHandler(error)
}
