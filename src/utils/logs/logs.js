let logger = {info: function () {}, error: function () {}}
if (process.server) {
  logger = require('@/utils/logs/logger').default
}

export default logger
